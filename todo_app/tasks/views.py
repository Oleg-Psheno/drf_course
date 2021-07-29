from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectsSerializers, TodoSerializer
from .models import Project, Todo


class ProjectsViewSet(ModelViewSet):
    serializer_class = ProjectsSerializers
    queryset = Project.objects.all()

class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()