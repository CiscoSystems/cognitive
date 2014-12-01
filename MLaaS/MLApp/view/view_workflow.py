from ..models import Workflow
from ..serializers import WorkflowSerializer
from ..views import send_response 
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from datetime import datetime
from numpy import genfromtxt
import numpy as np
from pandas import *
import threading
import json


class WorkFlowViewSet(viewsets.ViewSet):
    
    def list(self, request):
        exp = Workflow.objects.all()
        serializer = WorkflowSerializer(exp, many=True)
        return send_response(request.method,serializer)

    def retrieve(self, request, pk=None):
        workflow = Workflow.objects.get(pk=pk)
        serializer = WorkflowSerializer(workflow)
        return send_response(request.method,serializer)

    def create(self,request):
        data = json.loads(JSONRenderer().render(request.DATA))
        serializer = WorkflowSerializer(data=request.DATA)
        if serializer.is_valid():
           serializer.save()
        return send_response(request.method,serializer)
    
    def update(self,request, pk=None):
        exp = Workflow.objects.get(pk=pk)
        serializer = WorkflowSerializer(exp,data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method,serializer)

    def destroy(self, request, pk=None):
        exp = Workflow.objects.get(pk=pk)
        serializer = None
        exp.delete()
        return send_response(request.method,serializer)
        
