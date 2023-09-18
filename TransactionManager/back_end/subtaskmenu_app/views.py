from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from .serializers import ASubtaskSerializer
from .models import Subtaskmenu
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST
)

# Create your views here.
class All_subtasks_in_task(User_permissions):

  # get all tasks in a task menu for a specific user
  def get(self, request):
    all_subtasks_ordered = request.user.menusubtasks.order_by('id')
    all_subtasks = ASubtaskSerializer(all_subtasks_ordered, many=True)
    # a_task = get_object_or_404(request.user.menutasks, id=task_id)
    # subtasks = a_task.subtasks.order_by("id")
    # return Response(ASubtaskSerializer(subtasks, many=True).data)
    return Response(all_subtasks.data)
  
  # add menu subtask to a menu task
  def post(self, request):
    # print(request.data)
    request.data["user_id"] = request.user
    new_subtask = Subtaskmenu(**request.data)
    new_subtask.save()
    # if task_id is not None:
      # a_task = get_object_or_404(request.user.menutasks, id=task_id)
      # request.data["task_id"] = a_task
    # new_subtask = Subtaskmenu(**request.data)
    # new_subtask.save()
    task_id = request.task_id_id
    task = get_object_or_404(request.user.menutasks, id=task_id)
    subtasks = task.subtasks
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
  def delete(self, request, subtask_id):
    # a_task = get_object_or_404(request.user.menutasks, id=task_id)
    a_subtask = get_object_or_404(request.user.menusubtasks,id=subtask_id)
    a_subtask.delete()
    return Response(status=HTTP_204_NO_CONTENT)