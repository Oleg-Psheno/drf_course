from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=128)
    link = models.CharField(max_length=256)
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return f'{self.name}'

class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.text}'
