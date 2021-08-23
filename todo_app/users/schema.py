import graphene
from graphene_django import DjangoObjectType
from users.models import CustomUser
from tasks.models import Todo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        field = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        field = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_todo = graphene.List(TodoType)
    all_project = graphene.List(ProjectType)
    todo_by_project = graphene.List(TodoType, id=graphene.Int(required=False))

    def resolve_todo_by_project(self, info, id=None):
        todo = Todo.objects.all()
        if id:
            todo = todo.filter(project=id)
        return todo

    def resolve_all_users(self, info):
        return CustomUser.objects.all()

    def resolve_all_todo(self, info):
        return Todo.objects.all()

    def resolve_all_project(self, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
