from django.urls import path
from . import views

urlpatterns = [
    path('matches-per-year/', views.matches_per_year),
    path('matches-won/', views.matches_won_per_team),
    
    path('extra-runs/', views.extra_runs_by_team),
    path('extra-runs/<int:year>/', views.extra_runs_by_team), 
    
    path('economical-bowlers/', views.economical_bowlers),  
    path('economical-bowlers/<int:year>/', views.economical_bowlers),
    
    path('matches-vs-won/', views.matches_played_vs_won),
    path('matches-vs-won/<int:year>/', views.matches_played_vs_won),
]
