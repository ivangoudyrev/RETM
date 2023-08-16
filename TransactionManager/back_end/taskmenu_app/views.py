from django.shortcuts import render
from user_app.views import User_permissions
from .serializers import ATaskSerializer
from .models import Taskmenu
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST
)

# Create your views here.
class All_tasks_in_menu(User_permissions):
  
  def get(self, request):
    all_tasks = get_object_or_404(request.user.menutasks).order_by("id")
    return Response(ATaskSerializer(all_tasks, many=True).data)

  def post(self, request):
    request.data["user_id"] = request.user
    new_task = Task(**request.data)
    new_task.save()
    return Response(ATaskSerializer(new_task).data, status=HTTP_201_CREATED)

class A_task_in_menu(User_permissions):
  
  def get(self, request, task_id):
    a_task = get_object_or_404(request.user.menutasks, id=task_id)
    return Response(ATaskSerializer(a_task).data)
  
  def put(self, request, task_id):
    try:
      a_task = get_object_or_404(request.user.menutasks, id=task_id)
      a_task.title = request.data.get("title", a_task.title)
      a_task.details = request.data.get("details", a_task.details)
      a_task.subtasks = request.data.get("subtasks", a_task.subtasks)
      a_task.save()
      return Response(status=HTTP_204_NO_CONTENT)
    except Exception as e:
      print(e)
      return Response("Something went wrong", HTTP_400_BAD_REQUEST)     
    pass
  
  def delete(self, request, task_id):
    a_task = get_object_or_404(request.user.menutasks, id=task_id)
    a_task.delete()
    return Response(status=HTTP_204_NO_CONTENT)
  