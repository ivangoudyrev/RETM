from rest_framework.serializers import ModelSerializer
from .models import Agent

class AAgentSerializer(ModelSerializer):
    
    class Meta:
        model = Agent
        fields = ['id', 'first_name', 'mid_init', 'last_name', 'phone', 'email', 'company']