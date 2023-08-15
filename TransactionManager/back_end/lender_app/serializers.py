from rest_framework.serializers import ModelSerializer
from .models import Lender

class ALenderSerializer(ModelSerializer):
    
    class Meta:
        model = Lender
        fields = ['id', 'first_name', 'mid_init', 'last_name', 'phone', 'email', 'company']