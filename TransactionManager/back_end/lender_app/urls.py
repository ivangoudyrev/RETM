from django.urls import path
from .views import A_lender

urlpatterns = [
    path('', A_lender.as_view()),
]