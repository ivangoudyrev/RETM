from rest_framework import serializers
from .models import Task

class AbbrvTaskSerializer(serializers.ModelSerializer):

  class Meta:
    model = Task
    fields = [
      'title',
      'due_date',
      'complete',
      'subtasks'  
    ]

class ATaskSerializer(serializers.ModelSerializer):
  
  due_date = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=None, default_timezone=None)

  class Meta:
    model = Task
    fields = [
      'id',
      'type',
      'complete',
      'due_date',
      'title',
      'details',
      'essential',
      'notes',
      'subtasks',
      'transaction_id'
    ]