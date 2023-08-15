from rest_framework.serializers import ModelSerializer
from .models import Client

class AClientSerializer(ModelSerializer):
    
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'mid_init', 'last_name', 'phone', 'email']