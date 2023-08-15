from django.urls import path
from .views import A_title

urlpatterns = [
    path('', A_title.as_view()),
]