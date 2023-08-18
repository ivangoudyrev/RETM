from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Client
from .serializers import AClientSerializer

class A_client(User_permissions):
    # Get a client by-id
    def get(self, request, id):
        a_client = get_object_or_404(request.user.contacts.clients, id=id)
        return Response(AClientSerializer(a_client).data)

    # Update a client by-id
    def put(self, request, id):
        existing_client = get_object_or_404(request.user.contacts.clients, id=id)
        serializer = AClientSerializer(existing_client, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    # Delete a client by-id
    def delete(self, request, id):
        a_client = get_object_or_404(request.user.contacts.clients, id=id)
        a_client.delete()
        return Response(status=HTTP_204_NO_CONTENT)
