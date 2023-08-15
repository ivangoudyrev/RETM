from rest_framework.serializers import ModelSerializer
from .models import Title

class ATitleSerializer(ModelSerializer):
    
    class Meta:
        model = Title
        fields = ['id', 'first_name', 'mid_init', 'last_name', 'phone', 'email', 'company']