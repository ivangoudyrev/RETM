from django.shortcuts import render
from rest_framework.views import APIView
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from django.contrib.auth import authenticate

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Create your views here.
class Register(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        print("Sending response for ", user.email)
        return Response({
            "user": {"email": user.email}, 
            "token": token.key
        }, status=HTTP_201_CREATED)

class Log_in(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = authenticate(**request.data)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            print("Sending response for ", user.email)
            return Response({
                "user": {"email": user.email}, 
                "token": token.key})
        else:
            return Response(
                "Something went wrong", 
                status=HTTP_400_BAD_REQUEST
            )

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "first_name": request.user.first_name, 
            "last_name": request.user.last_name, 
            "email": request.user.email
        })

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(
            "Logout Successful", 
            status=HTTP_204_NO_CONTENT
        )