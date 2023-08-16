from rest_framework.serializers import ModelSerializer
from .models import Property

class APropertySerializer(ModelSerializer):
    
    class Meta:
        model = Property
        fields = '__all__'