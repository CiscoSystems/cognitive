from django.shortcuts import render, render_to_response
from django.template import RequestContext
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from .models import User
from .serializers import UserSerializer


def index(request):
    return render_to_response('index.haml',
        context_instance=RequestContext(request))

def whiteboard(request):
    return render_to_response('whiteboard.haml',
        context_instance=RequestContext(request))

@api_view(['GET', 'POST'])
def user_list(request):
    """
    List all users or create a new user.
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
