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
        properties_ordered = request.user.properties.order_by('-id')
        properties = APropertySerializer(properties_ordered, many=True)
        return Response(properties.data)

    # Creates a Property instance for the logged-in user
    def post(self, request):
        request.data["user_id"] = request.user
        new_property = Property(**request.data)
        new_property.save()
        # properties = APropertySerializer(request.user.properties, many=True)
        return Response(status=HTTP_201_CREATED)

class A_property(User_permissions):
    # Gets a property by-id
    def get(self, request, id):
        a_property = get_object_or_404(request.user.properties, id=id)
        return Response(APropertySerializer(a_property).data)
    
    # Update a property by-id
    def put(self, request, id):
        a_property = get_object_or_404(request.user.properties, id=id)
        a_property.street = request.data.get("street", a_property.street)
        a_property.city = request.data.get("city", a_property.city)
        a_property.state = request.data.get("state", a_property.state)
        a_property.zip = request.data.get("zip", a_property.zip)
        a_property.hoa = request.data.get("hoa", a_property.hoa)
        a_property.well = request.data.get("well", a_property.well)
        a_property.septic = request.data.get("septic", a_property.septic)
        print(request.data)
        a_property.save()
        return Response(status=HTTP_204_NO_CONTENT)
    
    # Delete a property by-id
    def delete(self, request, id):
        a_property = get_object_or_404(request.user.properties, id=id)
        a_property.delete()
        properties = APropertySerializer(request.user.properties, many=True)
        return Response(properties.data, status=HTTP_204_NO_CONTENT)

