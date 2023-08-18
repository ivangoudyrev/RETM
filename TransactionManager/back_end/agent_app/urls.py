from django.urls import path
from .views import A_agent

urlpatterns = [
    path('', A_agent.as_view()),
]