from django.urls import path
from .views import All_subtasks_in_task, A_subtask_in_task

urlpatterns = [
  path('', All_subtasks_in_task.as_view()),
  path('<int:subtask_id>', A_subtask_in_task.as_view()),
]