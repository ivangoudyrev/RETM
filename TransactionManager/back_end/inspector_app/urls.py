from django.urls import path
from .views import A_inspector

urlpatterns = [
    path('', A_inspector.as_view()),
]