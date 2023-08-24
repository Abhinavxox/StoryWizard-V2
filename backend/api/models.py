from django.db import models

class Story(models.Model):
    title = models.CharField(max_length=100)
    story = models.TextField()
    image = models.URLField()
    audio = models.FileField(upload_to='stories/audio/', null=True, blank=True) 

    def __str__(self):
        return self.title
