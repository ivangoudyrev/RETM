from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from .serializers import ASubtaskSerializer
from .models import Subtaskmenu
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST
)

# Create your views here.
class All_subtasks_in_task(User_permissions):

  # get all subtasks for a specific template task
  def get(self, request, task_id):
    a_task = get_object_or_404(request.user.menutasks, id=task_id)
    subtasks = a_task.subtasks.order_by("id")
    return Response(ASubtaskSerializer(subtasks, many=True).data)
  
  # add menu subtask to a menu task
  def post(self, request, task_id):
    request.data["user_id"] = request.user
    new_subtask = Subtaskmenu(**request.data)
    new_subtask.save()
    a_task = get_object_or_404(request.user.menutasks, id=task_id)
    subtasks = a_task.subtasks.order_by("id")
    return Response(ASubtaskSerializer(subtasks, many=True).data, status=HTTP_201_CREATED)

class A_subtask_in_task(User_permissions):

  # get a specific subtask
  def get(self, request, task_id, subtask_id):
    a_task = get_object_or_404(request.user.menutasks, id=task_id)
    a_subtask = a_task.subtasks.get(id=subtask_id)
    return Response(ASubtaskSerializer(a_subtask).data)
    
  # edit a specific subtask
  def put(self, request, subtask_id):
    try:
      # a_task = get_object_or_404(request.user.menutasks, id=task_id)
      a_subtask = get_object_or_404(request.user.menusubtasks, id=subtask_id)
      a_subtask.title = request.data.get("title", a_subtask.title)
      a_subtask.details = request.data.get("details", a_subtask.details)
      a_subtask.essential = request.data.get("essential", a_subtask.essential)
      # a_subtask.connected_task_id = request.data.get("connected_task_id", a_subtask.connected_task_id)
      a_subtask.save()
      return Response(status=HTTP_204_NO_CONTENT)
    except Exception as e:
      print(e)
      return Response("Something went wrong", HTTP_400_BAD_REQUEST)

  # delete a specific subtask
  def delete(self, request, task_id, subtask_id):
    # a_task = get_object_or_404(request.user.menutasks, id=task_id)
    a_subtask = get_object_or_404(request.user.menusubtasks,id=subtask_id)
    a_subtask.delete()
    a_task = get_object_or_404(request.user.menutasks, id=task_id)
    if len(request.user.menutasks) > 1:
      subtasks = a_task.subtasks.order_by("id")
      return Response(ASubtaskSerializer(subtasks, many=True).data, status=HTTP_200_OK)
    elif len(request.user.menutasks) == 1:
      subtask = get_object_or_404(request.user.menutasks)
      return Response(subtask)
    else:
      return Response(HTTP_204_NO_CONTENT)
