from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from .serializers import ATaskSerializer, AbbrvTaskSerializer
from .models import Task

from rest_framework.response import Response
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST
)

# Create your views here.

# This view is for all tasks, for all tasklists/transactions
class All_tasks(User_permissions):
  def get(self, request):
    all_tasks = get_object_or_404(request.user.tasks, complete=False).order_by("due_date")
    return Response(AbbrvTaskSerializer(all_tasks, many=True).data)

class All_tasks_in_transaction(User_permissions):
  # get all tasks for a specific transaction
  def get(self, request, id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    tasks = a_transaction.tasks.get(id=task_id).order_by("due_date")
    return Response(ATaskSerializer(tasks, many=True).data)

  # add a task to transaction
  def post(self, request, id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    # a_task = a_transaction.get(id=task_id)
    request.data["transaction_id"] = a_transaction
    new_task = Task(**request.data)
    new_task.save()
    return Response(ATaskSerializer(new_task).data, status=HTTP_201_CREATED)

class A_task_in_transaction(User_permissions):
  def get(self, request, id, task_id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    a_task = a_transaction.get(id=task_id)
    return Response(ATaskSerializer(a_task).data)

  # edit a specific task
  def put(self, request, id, task_id):
    try:
      a_transaction = get_object_or_404(request.user.transaction, id=id)
      a_task = a_transaction.get(id=task_id)
      a_task.title = request.data.get("title", a_task.title)
      a_task.details = request.data.get("details", a_task.details)
      a_task.due_date = request.data.get("due_date", a_task.due_date)
      a_task.complete = request.data.get("complete", a_task.complete)
      a_task.notes = request.data.get("notes", a_task.notes)
      a_task.subtasks = request.data.get("subtasks", a_task.subtasks)
      a_task.save()
      return Response(status=HTTP_204_NO_CONTENT)
    except Exception as e:
      print(e)
      return Response("Something went wrong", HTTP_400_BAD_REQUEST)      

  # delete a specific task
  def delete(self, request, id, task_id, subtask_id):
    a_transaction = get_object_or_404(request.user.transaction, id=id)
    a_subtask = a_transaction.get(id=task_id).subtasks.get(id=subtask_id)
    a_subtask.delete()
    return Response(status=HTTP_204_NO_CONTENT)