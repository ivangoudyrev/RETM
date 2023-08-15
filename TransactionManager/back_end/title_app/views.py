from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Title
from .serializers import ATitleSerializer

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class A_title(User_permissions):
    # Get a title company by-id
    def get(self, request, id):
        a_title = get_object_or_404(request.user.contacts.titles, id=id)
        return Response(ATitleSerializer(a_title).data)

    # Update a title company by-id
    def put(self, request, id):
        existing_title = get_object_or_404(request.user.contacts.titles, id=id)
        serializer = ATitleSerializer(existing_title, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    # Delete a title company by-id
    def delete(self, request, id):
        a_title = get_object_or_404(request.user.contacts.titles, id=id)
        a_title.delete()
        return Response(status=HTTP_204_NO_CONTENT)
