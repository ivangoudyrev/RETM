from rest_framework.serializers import ModelSerializer
from .models import Taskmenu

class ATaskSerializer(ModelSerializer):

  class Meta:
    model = Taskmenu
    fields = '__all__'
    # [
    #   'type',
    #   'title',
    #   'details',
    #   'essential',
    #   'subtasks'
    # ]