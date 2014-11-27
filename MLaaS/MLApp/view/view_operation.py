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
        comp = Component.objects.get(pk = int(pk))
        serializer = ComponentSerializer(comp)
        return send_response(request.method, serializer)

    def create(self,request, operation):
        data = json.loads(JSONRenderer().render(request.DATA))
        op = None
        exp_id = int(data["experiment"])
        print "Experiment ", exp_id, " Operation ", operation
        exp = Experiment.objects.get(pk = exp_id)
        if operation == 'math_formula':
            print data["op_type"], data["op_constant"], data["component_type"], data["component_id"]
            op = Data_operation_type(function_type = 'Update', function_arg = data["component_type"],
                            function_subtype = data["op_type"], function_arg_id = data["component_id"] ,
                            function_subtype_arg = data["op_constant"])
            op.save()
                
        elif operation == 'normalization':
            print data["component_type"], data["op_type"], data["component_id"]
            op = Data_operation_type(function_type = 'Update', function_arg = data["component_type"],
                            function_arg_id = data["component_id"] , function_subtype = 'Normalize',
                            function_subtype_arg = data["op_type"])
            op.save()

        elif operation == 'projection':
            print data["component_id"]
            op = Data_operation_type(function_type = 'Filter', function_arg = 'table', 
                            function_arg_id = data["component_id"], function_subtype = 'Project')
            op.save()
        
        elif operation == 'remove_duplicates':
            print data["component_id"]
            op = Data_operation_type(function_type = 'Filter', function_arg = 'table', 
                            function_arg_id = data["component_id"], function_subtype = 'RemoveDup')
            op.save()

        elif operation == 'remove_missing':
            print data["op_action"], data["experiment"] 
            op = Data_operation_type(function_type = 'Filter', function_arg = 'table', 
                            function_subtype = 'RemoveMissing', function_subtype_arg = data["op_action"])
            op.save()
        
        elif operation == 'metadata':
            print data["column_type"]
            op = Data_operation_type(function_type = 'Update',  function_arg = 'table', 
                            function_subtype = 'Metadata', function_subtype_arg = data["column_type"]) 
            op.save()
         
        elif operation == 'row':
            print data["row_values"]
            op = Data_operation_type(function_type = 'Create',  function_arg = 'row', 
                            function_subtype = 'Row', function_subtype_arg = data["row_values"]) 
            op.save()
        
        elif operation == 'input':
            print data
            print data["data_values"], data["input_file"] , data["input_file_type"]
            filename = "/tmp/"+str(data["experiment"])+ "_" + data["input_file"]
            print "Filename ", filename
            f = open(filename, 'w')
            f.write(data["data_values"])
            f.close()
            op = Data_operation_type(function_type = 'Create',  function_arg = 'table', 
                            function_subtype = 'input', function_subtype_arg = filename) 
            op.save()

        elif operation == "training":
            print data["model_id"], data["train_data_percentage"]
             
        component = Component(experiment= exp, created_time=datetime.now(),
                                modified_time=datetime.now(), operation_type = op)
        component.save()
        #comp_id= MAX_COMPONENTS_PER_EXP * exp_id + component.pk
        #component.component_id= comp_id
        #component.save()
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
        
