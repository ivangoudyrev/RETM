from django.urls import path, include
from .views import (
    A_contacts_list,
    All_clients,
    All_inspectors,
    All_lenders,
    All_agents,
    All_titles,
)

urlpatterns = [
    path('', A_contacts_list.as_view()), #only accepts post requests for new list
    path('clients/', All_clients.as_view()),
    path('inspectors/', All_inspectors.as_view()),
    path('lenders/', All_lenders.as_view()),
    path('agents/', All_agents.as_view()),
    path('titlecos/', All_titles.as_view()),
    path('clients/<int:id>/', include("client_app.urls")),
    path('inspectors/<int:id>/', include("inspector_app.urls")),
    path('lenders/<int:id>/', include("lender_app.urls")),
    path('agents/<int:id>/', include("agent_app.urls")),
    path('titlecos/<int:id>/', include("title_app.urls")),    
    # path('tasklist/', include("tasklist_app.urls")),
]
