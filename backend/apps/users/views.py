from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response

from  apps.users.mixins import CustomLoginRequiredMixin
from .models import User
from .serializers import UserSerializer, UserSignInSerializer, UserSignUpSerializer, UserUpdateBudgetSerializer, UserUpdateSerializer

class UserSignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer


class UserSignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignInSerializer

class UserProfile(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = UserSerializer
    pagination_class = None

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer([request.login_user], many=True)
        return Response(serializer.data[0])

class UpdateProfile(CustomLoginRequiredMixin, generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):

        serializer = UserUpdateSerializer()
        serializer.validate(request.data)

        return self.update(request, *args, **kwargs)

class UpdateBudget(CustomLoginRequiredMixin, generics.UpdateAPIView):
    serializer_class = UserUpdateBudgetSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):

        serializer = UserUpdateBudgetSerializer()
        serializer.validate(request.data)

        return self.update(request, *args, **kwargs)