from rest_framework.serializers import ModelSerializer
from .models import Agent

class AAgentSerializer(ModelSerializer):
    
    class Meta:
        model = Agent
        fields = '__all__'