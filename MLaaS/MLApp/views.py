from django.shortcuts import render, render_to_response
from django.template import RequestContext

from rest_framework import status
from rest_framework import viewsets
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

def send_response(method,serializer):
    print "method",method
    if method == 'GET':
        return Response(serializer.data)
    elif method == 'POST':
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet that for listing or retrieving users.
    
    user_list = UserViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })

    user_detail = UserViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })
    """
    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return send_response(request.method,serializer)

    def retrieve(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return send_response(request.method,serializer)

    def create(self,request):
        serializer = UserSerializer(data=request.DATA)
        return send_response(request.method,serializer)
        
