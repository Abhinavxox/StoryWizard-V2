import openai
import os
from rest_framework.parsers import JSONParser 
from dotenv import load_dotenv
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
leapai_api_key = os.getenv('LEAPAI_API_KEY')

def generate_story(topic):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"Generate a 4 paragraph children's story with title about {topic} that contains a moral."}
        ]
    )
    content = completion.choices[0].message.content
    content = content.encode().decode('unicode_escape')
    title = content.split('\n')[0]
    title = title.replace('Title: ', '')
    res = content[content.find('\n'):]
    res = res.lstrip()
    output = {'title': title, 'story': res}
    prompt = generate_promt_for_stablediffusion(res)
    generate_image(prompt)
    return output

def generate_promt_for_stablediffusion(story):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"Create one text to image prompts that will be suitable as the title image of the below given story. Do not include the character names, instead include only the characters physical description.\n\n{story}"}
        ]
    )
    content = completion.choices[0].message.content
    content = content.encode().decode('unicode_escape')
    if ':' in content:
        content = content[content.find(':')+1:]
    content = content.strip()
    return content

def generate_image(prompt):
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    image_url = response['data'][0]['url']
    print(image_url)

