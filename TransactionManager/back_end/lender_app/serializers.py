from rest_framework.serializers import ModelSerializer
from .models import Lender

class ALenderSerializer(ModelSerializer):
    
    class Meta:
        model = Lender
        fields = '__all__'