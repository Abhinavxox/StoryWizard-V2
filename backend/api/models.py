from django.db import models

class Story(models.Model):
    title = models.CharField(max_length=100)
    story = models.TextField()

    def __str__(self):
        return self.title
