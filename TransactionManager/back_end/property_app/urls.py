from django.urls import path
from .views import A_property, All_properties

urlpatterns = [
    path('', All_properties.as_view()),
    path('<int:id>/', A_property.as_view()),
]