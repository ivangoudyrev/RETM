from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions

from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Property
from .serializers import APropertySerializer

class All_properties(User_permissions):
    # Gets a list of all properties
    def get(self, request):
        properties = APropertySerializer(request.user.properties, many=True)
        return Response(properties.data)

    # Creates a Property instance for the logged-in user
    def post(self, request):
        request.data["user_id"] = request.user
        new_property = Property(**request.data)
        new_property.save()
        return Response(APropertySerializer(new_property).data, status=HTTP_201_CREATED)

class A_property(User_permissions):
    # Gets a property by-id
    def get(self, request, id):
        a_property = get_object_or_404(request.user.properties, id=id)
        return Response(APropertySerializer(a_property).data)
    
    # Update a property by-id
    def put(self, request, id):
        existing_property = get_object_or_404(request.user.properties, id=id)
        serializer = APropertySerializer(existing_property, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    # Delete a property by-id
    def delete(self, request, id):
        a_property = get_object_or_404(request.user.properties, id=id)
        a_property.delete()
        return Response(status=HTTP_204_NO_CONTENT)

