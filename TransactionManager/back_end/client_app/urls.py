from django.urls import path
from .views import A_client

urlpatterns = [
    path('', A_client.as_view()),
]