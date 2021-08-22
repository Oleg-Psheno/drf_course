from django.test import TestCase
from .models import CustomUser
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, APISimpleTestCase
from .views import UserViewSet
from rest_framework import status
from django.contrib.auth.models import User
from mixer.backend.django import mixer

class TestUserViewSet(APITestCase):
    url = '/api/users'

    def setUp(self) -> None:
        factory = APIRequestFactory()
        self.request = factory.get(self.url)

    def test_get_list(self):
        view = UserViewSet.as_view({'get': 'list'})
        response = view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        admin = CustomUser.objects.create_superuser('oleg','test@text.ru','qwerty')
        self.client.force_authenticate(admin)
        response = self.client.post(f'{self.url}/',data = {'username':'oleg1','email':'sfdv@dsf.ru'})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    # def test_post_user(self):
    #     factory = APIRequestFactory()
    #     admin = CustomUser.objects.create_superuser('test','pds@ff.ru','123')
    #     request = factory.post('/api/users/', {'username':'oleg1','email':'sfdv@dsf.ru'})
    #     force_authenticate(request,admin)
    #     view = UserViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        # user = CustomUser.objects.create(username='oleg1',email='sfdv@dsf.ru')
        user = mixer.blend(CustomUser)
        client = APIClient()
        response = client.get(f'{self.url}/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), user.username)

    def test_get_detail_auth(self):
        user = CustomUser.objects.create(username='oleg1',email='sfdv@dsf.ru')
        client = APIClient()
        client.force_authenticate(user)
        response = client.get(f'{self.url}/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), user.username)


class SimpleTest(APISimpleTestCase):
    def test_simple(self):
        self.assertEqual(1+2,3)