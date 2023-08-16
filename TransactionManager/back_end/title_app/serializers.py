from rest_framework.serializers import ModelSerializer
from .models import Title

class ATitleSerializer(ModelSerializer):
    
    class Meta:
        model = Title
        fields = '__all__'