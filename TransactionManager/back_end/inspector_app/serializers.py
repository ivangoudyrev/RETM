from rest_framework.serializers import ModelSerializer
from .models import Inspector

class AInspectorSerializer(ModelSerializer):
    
    class Meta:
        model = Inspector
        fields = ['id', 'first_name', 'mid_init', 'last_name', 'phone', 'email', 'company']