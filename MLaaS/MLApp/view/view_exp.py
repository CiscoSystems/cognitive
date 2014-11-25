from ..models import Experiment
from ..serializers import ExperimentSerializer
from ..views import send_response 
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from datetime import datetime

class ExperimentViewSet(viewsets.ViewSet):
    
    def list(self, request):
        exp = Experiment.objects.all()
        serializer = ExperimentSerializer(exp, many=True)
        return send_response(request.method,serializer)

    def retrieve(self, request, pk=None):
        exp = User.objects.get(pk=pk)
        serializer = ExperimentSerializer(exp)
        return send_response(request.method,serializer)

    def create(self,request):
        serializer = ExperimentSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.object.created_time=datetime.now()
            serializer.object.modified_time=datetime.now()
            serializer.save()
        return send_response(request.method,serializer)
    
    def update(self,request, pk=None):
        exp = Experiment.objects.get(pk=pk)
        serializer = ExperimentSerializer(exp,data=request.DATA)
        if serializer.is_valid():
            serializer.object.modified_time=datetime.now()
            serializer.save()
        return send_response(request.method,serializer)

    def destroy(self, request, pk=None):
        exp = Experiment.objects.get(pk=pk)
        serializer = None
        exp.delete()
        return send_response(request.method,serializer)
        
