from django.urls import path, include
from .views import All_tasks_in_menu, A_task_in_menu

urlpatterns = [
  path('', All_tasks_in_menu.as_view()),
  path('<int:task_id>/', A_task_in_menu.as_view()),
  path('<int:task_id>/subtasks/', include("subtaskmenu_app.urls"))
]