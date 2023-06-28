from django.urls import path 
from api import views 

urlpatterns = [
    path('stories/', views.story_list),
    path('stories/<int:pk>/', views.story_detail),
    path('stories/published/', views.story_list_published)
]