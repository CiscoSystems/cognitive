from django.shortcuts import render, render_to_response
from django.template import RequestContext

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer



def index(request):
    return render_to_response('index.haml',
        context_instance=RequestContext(request))

def whiteboard(request):
    return render_to_response('whiteboard.haml',
        context_instance=RequestContext(request))

def send_response(method, serializer):
    print "method",method
    if method == 'GET':
        return Response(serializer.data)
    elif method == 'POST':
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif method == 'PUT':
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif method == 'DELETE':
        return Response(status=status.HTTP_204_NO_CONTENT)
        
        
       
