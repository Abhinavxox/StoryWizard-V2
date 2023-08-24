from django.urls import path 
from api import views 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('stories/', views.story_list),
    path('stories/<int:pk>/', views.story_detail),
    path('stories/<int:pk>/audio', views.story_audio),
    path('stories/published/', views.story_list_published)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)