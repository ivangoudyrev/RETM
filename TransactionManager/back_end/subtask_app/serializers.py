from rest_framework.serializers import ModelSerializer
from .models import Subtask

class ASubtaskSerializer(ModelSerializer):

  class Meta:
    model = Subtask
    fields = [
      'title',
      'details',
      'due_date',
      'complete',
      'essential',
      'notes',
      # 'task_id',
      'connected_task_id'
    ]