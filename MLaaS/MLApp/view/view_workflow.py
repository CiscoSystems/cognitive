from ..models import Experiment, Component, Workflow
from ..serializers import WorkflowSerializer
from ..views import send_response 
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from datetime import datetime
import threading
import json

class myThread (threading.Thread):
    def __init__(self, threadID, name, experiment):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.experiment = experiment

    def run(self):
        print "Run called for thread name", self.name
        graph_data = [[1,[]],[2,[1]],[3,[2]],[4,[2,3]],[5,[4]],[6,[4]]]  
        for data in graph_data:
            component_id = data[0]
            comp = Component.objects.get(pk= component_id)
            print "Component_id" , component_id, " " ,comp.operation_type 
        

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
        exp_id = int(data["experiment"])
        print "Experiment ", exp_id
        serializer = WorkflowSerializer(data=request.DATA)
        if serializer.is_valid():
           serializer.save()
        thread = myThread(1, "WorkFlow Thread", exp_id)
        thread.start() 
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
        
