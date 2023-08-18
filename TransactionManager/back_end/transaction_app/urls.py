from django.urls import path, include
from .views import A_transaction, All_transactions

urlpatterns = [
    path('', All_transactions.as_view()),
    path('<int:id>/', A_transaction.as_view()),
    path('<int:id>/tasks/', include("task_app.urls")),
]