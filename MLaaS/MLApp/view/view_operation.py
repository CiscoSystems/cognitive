from ..models import Experiment, Component, Data_operation_type
from ..serializers import ComponentSerializer
from ..views import send_response 
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from datetime import datetime
import json

MAX_COMPONENTS_PER_EXP = 100
class OperationViewSet(viewsets.ViewSet):
    
    def list(self, request, operation):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return send_response(request.method,serializer)

    def retrieve(self, request, operation, pk=None):
        comp = Component.objects.get(component_id = int(pk))
        serializer = ComponentSerializer(comp)
        return send_response(request.method, serializer)

    def create(self,request, operation):
        data = json.loads(JSONRenderer().render(request.DATA))
        if operation == 'MathFormula':
            print data["op_type"], data["op_constant"], data["component_type"], data["component_id"] ,data["experiment"]
            op = Data_operation_type(function_type = 'Update', function_arg = data["component_type"],
                            function_subtype = data["op_type"], function_arg_id = data["component_id"] ,
                            function_subtype_arg = data["op_constant"])
            op.save()
            exp_id = int(data["experiment"])
            exp = Experiment.objects.get(pk = exp_id)
            component = Component(experiment= exp, created_time=datetime.now(),
                                modified_time=datetime.now(), operation_type = op)
            component.save()
            comp_id= MAX_COMPONENTS_PER_EXP * exp_id + component.pk
            component.component_id= comp_id
            component.save()
            serializer = ComponentSerializer(component)
            return send_response("GET",serializer)
    
    def update(self,request, operation, pk=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user,data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method,serializer)

    def destroy(self, request, operation, pk=None):
        user = User.objects.get(pk=pk)
        serializer = None
        user.delete()
        return send_response(request.method,serializer)
        
