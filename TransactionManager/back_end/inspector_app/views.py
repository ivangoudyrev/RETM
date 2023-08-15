from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Inspector
from .serializers import AInspectorSerializer

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class A_inspector(User_permissions):
    # Get an inspector by-id
    def get(self, request, id):
        a_inspector = get_object_or_404(request.user.contacts.inspectors, id=id)
        return Response(AInspectorSerializer(a_inspector).data)

    # Update an inspector by-id
    def put(self, request, id):
        existing_inspector = get_object_or_404(request.user.contacts.inspectors, id=id)
        serializer = AInspectorSerializer(existing_inspector, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    # Delete a inspector by-id
    def delete(self, request, id):
        a_inspector = get_object_or_404(request.user.contacts.inspectors, id=id)
        a_inspector.delete()
        return Response(status=HTTP_204_NO_CONTENT)