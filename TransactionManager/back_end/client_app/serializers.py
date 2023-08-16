from rest_framework.serializers import ModelSerializer
from .models import Client

class AClientSerializer(ModelSerializer):
    
    class Meta:
        model = Client
        fields = '__all__'