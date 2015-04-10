from ..models import Workflow, Experiment
from ..serializers import WorkflowSerializer
from ..views import send_response
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
import json


class WorkFlowViewSet(viewsets.ViewSet):

    def list(self, request):
        exp = Workflow.objects.all()
        serializer = WorkflowSerializer(exp, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, pk=None):
        workflow = Workflow.objects.get(pk=pk)
        serializer = WorkflowSerializer(workflow)
        return send_response(request.method, serializer)

    def create(self, request):
        data = json.loads(JSONRenderer().render(request.DATA))
        exp_id = int(data["experiment"])
        exp = Experiment.objects.get(pk=exp_id)
        print "Experiment ", exp_id, "graph_data ", data["graph_data"]
        try:  # Temporarily for accepting changes through POST requests from UI
            workflow = exp.workflow
        except Workflow.DoesNotExist:
            print "Workflow is not yet created. Creating one"
            serializer = WorkflowSerializer(data=request.DATA)
            if serializer.is_valid():
                serializer.save()
            return send_response(request.method, serializer)
        else:
            print "Workflow already exists. Modifying one"
            serializer = WorkflowSerializer(workflow, data=request.DATA)
            if serializer.is_valid():
                serializer.save()
            return send_response(request.method, serializer)

    def update(self, request, pk=None):
        exp = Workflow.objects.get(pk=pk)
        serializer = WorkflowSerializer(exp, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def destroy(self, request, pk=None):
        exp = Workflow.objects.get(pk=pk)
        serializer = None
        exp.delete()
        return send_response(request.method, serializer)
