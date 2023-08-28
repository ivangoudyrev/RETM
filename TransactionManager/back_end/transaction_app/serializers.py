from rest_framework import serializers
from .models import Transaction

class ATransactionSerializer(serializers.ModelSerializer):
    closing_date = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=None, default_timezone=None)
    ratify_date = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=None, default_timezone=None)
    emd_deadline = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=None, default_timezone=None)
    inspection_deadline = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=None, default_timezone=None)

    class Meta:
        model = Transaction
        fields = '__all__'

class AbbrvTransactionSerializer(serializers.ModelSerializer):
    closing_date = serializers.DateTimeField(format='%m-%d-%Y', input_formats=None, default_timezone=None)
    ratify_date = serializers.DateTimeField(format='%m-%d-%Y', input_formats=None, default_timezone=None)

    class Meta:
        model = Transaction
        fields = [
            'id',
            'type',
            'property_id',
            'client_id',
            'closing_date',
            'ratify_date'
        ]