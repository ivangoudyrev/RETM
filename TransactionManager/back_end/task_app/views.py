from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from .serializers import ATaskSerializer, AbbrvTaskSerializer
from .models import Task

from rest_framework.response import Response
from rest_framework.status import (
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST
)

# Create your views here.

# This view is for all tasks, for all tasklists/transactions
class All_tasks(User_permissions):
  def get(self, request):
    all_tasks_ordered = request.user.tasks.order_by('due_date')
    all_tasks = ATaskSerializer(all_tasks_ordered, many=True)
    return Response(all_tasks.data)

class All_tasks_in_transaction(User_permissions):
  # get all tasks for a specific transaction
  def get(self, request, id):
    a_transaction = get_object_or_404(request.user.transactions, id=id)
    tasks = a_transaction.tasks.order_by("due_date")
    return Response(ATaskSerializer(tasks, many=True).data)

  # add a task to transaction
  def post(self, request, id):
    a_transaction = get_object_or_404(request.user.transactions, id=id)
    # a_task = a_transaction.get(id=task_id)
    request.data["transaction_id"] = a_transaction
    request.data["user_id"] = request.user
    new_task = Task(**request.data)
    new_task.save()
    tasks = a_transaction.tasks.order_by("due_date")
    # return Response(ATaskSerializer(new_task).data, status=HTTP_201_CREATED)
    return Response(ATaskSerializer(tasks, many=True).data, HTTP_201_CREATED)

class A_task_in_transaction(User_permissions):
  def get(self, request, id, task_id):
    a_transaction = get_object_or_404(request.user.transactions, id=id)
    a_task = a_transaction.get(id=task_id)
    return Response(ATaskSerializer(a_task).data)

  # edit a specific task
  def put(self, request, id, task_id):
    try:
      a_task = get_object_or_404(request.user.tasks, id=task_id)
      # a_task = a_transaction.get(id=task_id)
      a_task.title = request.data.get("title", a_task.title)
      a_task.details = request.data.get("details", a_task.details)
      a_task.due_date = request.data.get("due_date", a_task.due_date)
      a_task.complete = request.data.get("complete", a_task.complete)
      a_task.notes = request.data.get("notes", a_task.notes)
      # a_task.subtasks = request.data.get("subtasks", a_task.subtasks)
      a_task.save()
      a_transaction = get_object_or_404(request.user.transactions, id=id)
      tasks = a_transaction.tasks.order_by("due_date")
      return Response(ATaskSerializer(tasks, many=True).data, status=HTTP_200_OK)
    except Exception as e:
      print(e)
      return Response("Something went wrong", HTTP_400_BAD_REQUEST)      

  # delete a specific task
  def delete(self, request, id, task_id):
    a_task = get_object_or_404(request.user.tasks, id=task_id)
    # a_subtask = a_transaction.get(id=task_id).subtasks.get(id=subtask_id)
    a_task.delete()
    a_transaction = get_object_or_404(request.user.transactions, id=id)
    tasks = a_transaction.tasks.order_by("due_date")
    return Response(ATaskSerializer(tasks, many=True).data, HTTP_200_OK)