from django.shortcuts import render
import os

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from api.models import Story
from api.serializers import storySerializer
from rest_framework.decorators import api_view

from api.functions import generate_story, answer_question

from gtts import gTTS
from django.core.files.base import ContentFile

from django.http import FileResponse
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Story


@api_view(['GET', 'POST', 'DELETE'])    
def story_list(request):
    if request.method == 'GET':
        stories = Story.objects.all()
        
        title = request.query_params.get('title', None)
        if title is not None:
            stories = stories.filter(title__icontains=title)
        
        stories_serializer = storySerializer(stories, many=True)
        return JsonResponse(stories_serializer.data, safe=False)
 
    elif request.method == 'POST':
        response_from_openai = generate_story(request.data['topic'])
        story_serializer = storySerializer(data=response_from_openai)
        if story_serializer.is_valid():
            story_serializer.save()

            story = Story.objects.get(pk=story_serializer.data['id'])

            tts = gTTS(text=story.story, lang='en')

            audio_file_path = f'media/stories/audio/story_{story.id}.mp3'
            
            os.makedirs(os.path.dirname(audio_file_path), exist_ok=True)

            tts.save(audio_file_path)

            story.audio.name = audio_file_path
            story.save()
            return JsonResponse(story_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(story_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Story.objects.all().delete()
        return JsonResponse({'message': 'Stories were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
@api_view(['GET', 'PUT', 'DELETE'])
def story_detail(request, pk):
    try: 
        story = Story.objects.get(pk=pk) 
    except Story.DoesNotExist: 
        return JsonResponse({'message': 'The story does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        story_serializer = storySerializer(story) 
        return JsonResponse(story_serializer.data) 
 
    elif request.method == 'PUT': 
        story_data = JSONParser().parse(request) 
        story_serializer = storySerializer(story, data=story_data) 
        if story_serializer.is_valid(): 
            story_serializer.save() 
            return JsonResponse(story_serializer.data) 
        return JsonResponse(story_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        story.delete() 
        return JsonResponse({'message': 'Story was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def story_list_published(request):
    stories = Story.objects.filter(published=True)
        
    if request.method == 'GET': 
        stories_serializer = storySerializer(stories, many=True)
        return JsonResponse(stories_serializer.data, safe=False)
    
@api_view(['GET'])
def story_audio(request, pk):
    story = get_object_or_404(Story, pk=pk)

    if request.method == 'GET':
        audio_file_path = os.path.join(settings.MEDIA_ROOT, f'stories/audio/story_{story.pk}.mp3')

        if os.path.exists(audio_file_path):
            response = FileResponse(open(audio_file_path, 'rb'), content_type='audio/mp3')
            return response
        else:
            return JsonResponse({'message': 'Audio file not found'}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['GET'])
def follow_up_question(request):
    if request.method == 'GET':
        question = request.data['question']
        context = request.data['context']
        response_from_openai = answer_question(question, context)
        return JsonResponse(response_from_openai, safe=False)
