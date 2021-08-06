from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from .models import CustomUser
from .serializers import UserSerializer


class UserViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
