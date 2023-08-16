from rest_framework.serializers import ModelSerializer
from .models import Inspector

class AInspectorSerializer(ModelSerializer):
    
    class Meta:
        model = Inspector
        fields = '__all__'