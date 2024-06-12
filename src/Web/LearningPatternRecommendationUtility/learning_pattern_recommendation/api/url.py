from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("predict", views.recommendations_learning_pattern, name='recommendations_learning_pattern'),
]