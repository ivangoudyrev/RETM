from django.urls import path, include
from .views import All_tasks_in_transaction, A_task_in_transaction

urlpatterns = [
    path('', All_tasks_in_transaction.as_view()),
    path('<int:task_id>/', A_task_in_transaction.as_view()),
    path('<int:task_id>/subtasks/', include("subtask_app.urls")),
]