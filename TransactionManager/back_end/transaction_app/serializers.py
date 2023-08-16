from rest_framework.serializers import ModelSerializer
from .models import Transaction

class ATransactionSerializer(ModelSerializer):
    
    class Meta:
        model = Transaction
        fields = '__all__'

class AbbrvTransactionSerializer(ModelSerializer):

    class Meta:
        model: Transaction
        fields: [
            'type',
            'property_id',
            'client_id',
            'closing_date',
        ]