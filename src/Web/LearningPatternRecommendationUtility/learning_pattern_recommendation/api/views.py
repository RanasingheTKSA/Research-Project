from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
import pickle

def index(request):
    return HttpResponse("Hello world!")

def recommendations_learning_pattern(request) :
    return HttpResponse ("Video")