from ..models import Component
from ..serializers import ComponentSerializer
from ..views import send_response 
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from datetime import datetime


@api_view(['GET', 'POST'])
def operation_list(request,operation):
    print request, operation
    serializer = ComponentSerializer(data=request.DATA)
    return send_response(request.method,serializer)
    

@api_view(['GET', 'PUT', 'DELETE'])
def operation_detail(request, operation,pk):
    print operation,pk
    return send_response(request.method,None)
