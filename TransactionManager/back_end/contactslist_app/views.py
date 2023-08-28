from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Contactslist
from client_app.models import Client
from lender_app.models import Lender
from title_app.models import Title
from agent_app.models import Agent
from inspector_app.models import Inspector

from client_app.serializers import AClientSerializer
from lender_app.serializers import ALenderSerializer
from title_app.serializers import ATitleSerializer
from agent_app.serializers import AAgentSerializer
from inspector_app.serializers import AInspectorSerializer

class A_contacts_list(User_permissions):
    # Creates a new Contact List for a User
    def post(self, request):
        request.data["user_id"] = request.user
        if not Contactslist.objects.filter(user_id=request.user).exists():
            try:
                new_list = Contactslist(**request.data)
                new_list.save()
                return Response(status=HTTP_201_CREATED)
            except:
                return Response("Contact List already exists for this user", status=HTTP_400_BAD_REQUEST)
        return Response("Contacts List already exists for this user.", status=HTTP_200_OK)

class All_clients(User_permissions):
    # Gets a list of all clients for the logged-in user
    def get(self, request):
        clients = AClientSerializer(request.user.contacts.clients, many=True)
        return Response(clients.data)
    
    # Creates a Client instance for the logged-in user
    def post(self, request):
        contacts_list = request.user.contacts
        request.data["contactslist_id"] = contacts_list
        new_client = Client(**request.data)
        new_client.save()
        return Response(AClientSerializer(new_client).data, status=HTTP_201_CREATED)

class All_lenders(User_permissions):
    # Gets a list of all lenders for the logged-in user
    def get(self, request):
        lenders = ALenderSerializer(request.user.contacts.lenders, many=True)
        return Response(lenders.data)
    
    # Creates a Lender instance for the logged-in user
    def post(self, request):
        contacts_list = request.user.contacts
        request.data["contactslist_id"] = contacts_list
        new_lender = Lender(**request.data)
        new_lender.save()
        return Response(ALenderSerializer(new_lender).data, status=HTTP_201_CREATED)

class All_titles(User_permissions):
    # Gets a list of all title companies for the logged-in user
    def get(self, request):
        titles = ATitleSerializer(request.user.contacts.titles, many=True)
        return Response(titles.data)
    
    # Creates a Title instance for the logged-in user
    def post(self, request):
        contacts_list = request.user.contacts
        request.data["contactslist_id"] = contacts_list
        new_title = Title(**request.data)
        new_title.save()
        return Response(ATitleSerializer(new_title).data, status=HTTP_201_CREATED)

class All_agents(User_permissions):
    # Gets a list of all agents for the logged-in user
    def get(self, request):
        agents = AAgentSerializer(request.user.contacts.agents, many=True)
        return Response(agents.data)
    
    # Creates a Agent instance for the logged-in user
    def post(self, request):
        contacts_list = request.user.contacts
        request.data["contactslist_id"] = contacts_list
        new_agent = Agent(**request.data)
        new_agent.save()
        return Response(AAgentSerializer(new_agent).data, status=HTTP_201_CREATED)

class All_inspectors(User_permissions):
    # Gets a list of all inspectors for the logged-in user
    def get(self, request):
        inspectors = AInspectorSerializer(request.user.contacts.inspectors, many=True)
        return Response(inspectors.data)
    
    # Creates an inspector instance for the logged-in user
    def post(self, request):
        contacts_list = request.user.contacts
        request.data["contactslist_id"] = contacts_list
        new_inspector = Inspector(**request.data)
        new_inspector.save()
        return Response(AInspectorSerializer(new_inspector).data, status=HTTP_201_CREATED)