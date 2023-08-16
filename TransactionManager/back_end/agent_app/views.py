from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Agent
from .serializers import AAgentSerializer

class A_agent(User_permissions):
    # Get an agent by-id
    def get(self, request, id):
        a_agent = get_object_or_404(request.user.contacts.agents, id=id)
        return Response(AAgentSerializer(a_agent).data)

    # Update an agent by-id
    def put(self, request, id):
        existing_agent = get_object_or_404(request.user.contacts.agents, id=id)
        serializer = AAgentSerializer(existing_agent, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    # Delete a agent by-id
    def delete(self, request, id):
        a_agent = get_object_or_404(request.user.contacts.agents, id=id)
        a_agent.delete()
        return Response(status=HTTP_204_NO_CONTENT)