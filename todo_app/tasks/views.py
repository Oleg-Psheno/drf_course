from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectsSerializers, TodoSerializer
from .models import Project, Todo
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class TodoPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectsViewSet(ModelViewSet):
    serializer_class = ProjectsSerializers
    queryset = Project.objects.all()
    pagination_class = ProjectPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all().filter(active=True)
    filterset_fields = ['project']
    pagination_class = TodoPagination

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        return Response(data='uspeh')
