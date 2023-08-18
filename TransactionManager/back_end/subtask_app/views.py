from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from .serializers import  ASubtaskSerializer
from .models import Subtask
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST
)

# Create your views here.
class All_subtasks_in_task(User_permissions):
  
  # get all subtasks for a task
  def get(self, request, id, task_id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    subtasks = a_transaction.tasks.get(id=task_id).subtasks.order_by("due_date")
    return Response(ASubtaskSerializer(subtasks, many=True).data)

  # add subtask to a task
  def post(self, request, id, task_id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    a_task = a_transaction.get(id=task_id)
    request.data["task_id"] = a_task
    new_subtask = Subtask(**request.data)
    new_subtask.save()
    if a_task.complete:
      a_task.complete = not a_task.complete
      task.save()
    return Response(ASubtaskSerializer(new_subtask).data, status=HTTP_201_CREATED)

class A_subtask_in_task(User_permissions):

  # get a specific subtask
  def get(self, request, id, task_id, subtask_id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    a_subtask = a_transaction.get(id=task_id).subtasks.get(id=subtask_id)
    return Response(ASubtaskSerializer(a_subtask).data)
    
  # edit a specific subtask
  def put(self, request, id, task_id, subtask_id):
    try:
      a_transaction = get_object_or_404(request.user.transaction, id=id)
      a_subtask = a_transaction.get(id=task_id).subtasks.get(id=subtask_id)
      a_subtask.title = request.data.get("title", a_subtask.title)
      a_subtask.details = request.data.get("details", a_subtask.details)
      a_subtask.due_date = request.data.get("due_date", a_subtask.due_date)
      a_subtask.complete = request.data.get("complete", a_subtask.complete)
      a_subtask.notes = request.data.get("notes", a_subtask.notes)
      a_subtask.connected_task_id = request.data.get("connected_task_id", a_subtask.connected_task_id)
      a_subtask.save()
      return Response(status=HTTP_204_NO_CONTENT)
    except Exception as e:
      print(e)
      return Response("Something went wrong", HTTP_400_BAD_REQUEST)

  # delete a specific subtask
  def delete(self, request, id, task_id, subtask_id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    a_subtask = a_transaction.get(id=task_id).subtasks.get(id=subtask_id)
    a_subtask.delete()
    return Response(status=HTTP_204_NO_CONTENT)

