from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Lender
from .serializers import ALenderSerializer

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class A_lender(User_permissions):
    # Get a lender by-id
    def get(self, request, id):
        a_lender = get_object_or_404(request.user.contacts.lenders, id=id)
        return Response(ALenderSerializer(a_lender).data)

    # Update a lender by-id
    def put(self, request, id):
        existing_lender = get_object_or_404(request.user.contacts.lenders, id=id)
        serializer = ALenderSerializer(existing_lender, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    # Delete a lender by-id
    def delete(self, request, id):
        a_lender = get_object_or_404(request.user.contacts.lenders, id=id)
        a_lender.delete()
        return Response(status=HTTP_204_NO_CONTENT)