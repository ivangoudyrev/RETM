from rest_framework.serializers import ModelSerializer
from .models import Task

class AbbrvTaskSerializer(ModelSerializer):

  class Meta:
    model = Task
    fields = [
      'title',
      'due_date',
      'complete',
      'subtasks'  
    ]

class ATaskSerializer(ModelSerializer):

  class Meta:
    model = Task
    fields = [
      'title',
      'details',
      'due_date',
      'complete',
      'essential',
      'notes',
      'subtasks'  
    ]