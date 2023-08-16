from rest_framework.serializers import ModelSerializer
from .models import Subtaskmenu

class ASubtaskSerializer(ModelSerializer):

  class Meta:
    model = Subtaskmenu
    fields = [
      'title',
      'details',
      'essential',
      'connected_task_id'
    ]