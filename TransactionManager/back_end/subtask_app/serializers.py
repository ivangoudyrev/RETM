from rest_framework import serializers
from .models import Subtask

class ASubtaskSerializer(serializers.ModelSerializer):
  due_date = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=None, default_timezone=None)

  class Meta:
    model = Subtask
    fields = [
      'id',
      'title',
      'details',
      'due_date',
      'complete',
      'essential',
      'notes',
      'task_id',
      'connected_task_id'
    ]