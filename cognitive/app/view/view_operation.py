# Copyright 2015 Cisco Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

from ..models import Experiment, Component, Data_operation_type
from ..serializers import ComponentSerializer
from ..views import send_response
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from pandas import read_csv, datetime
import json
import urllib2

MAX_COMPONENTS_PER_EXP = 100

#####
# Operation      function_type function_arg function_subtype function_arg_id function_subtype_arg
# mathformula       Update      {comp_type}  {op_type}        {comp_id}       {op_constant}
# metadata          Update      Table        Metadata         -               {column_type}
# normalization     Update      {comp_type}  Normalize        {comp_id}       {op_type}
# projection        Filter      Table        Project          {comp_id}       -
# remove_duplicates Filter      Table        RemoveDup        {comp_id}       -
# remove_missing    Filter      Table        RemoveMissing    {comp_id}       {op_action}
# row               Create      Row          Row              -               {row_values}
# input             Create      Table        Input            -               {filename}
# machine learning  Create      Model        {model_type}     {Train-test}    {ML arguments}


class OperationViewSet(viewsets.ViewSet):

    def set_operation(self, operation, data):
        if operation == 'math_formula':
            print data["op_type"], data["op_constant"], data["component_type"], data["component_id"]
            op = Data_operation_type(
                function_type='Update',
                function_arg=data["component_type"],
                function_subtype=data["op_type"],
                function_arg_id=data["component_id"],
                function_subtype_arg=data["op_constant"])
            op.save()

        elif operation == 'normalization':
            print data["component_type"], data["op_type"], data["component_id"]
            op = Data_operation_type(
                function_type='Update',
                function_arg=data["component_type"],
                function_arg_id=data["component_id"],
                function_subtype='Normalize',
                function_subtype_arg=data["op_type"])
            op.save()

        elif operation == 'projection':
            print data["component_id"]
            op = Data_operation_type(
                function_type='Filter',
                function_arg='Table',
                function_arg_id=data["component_id"],
                function_subtype='Project')
            op.save()

        elif operation == 'remove_duplicates':
            print data["component_id"]
            op = Data_operation_type(
                function_type='Filter',
                function_arg='Table',
                function_arg_id=data["component_id"],
                function_subtype='RemoveDup')
            op.save()

        elif operation == 'remove_missing':
            print data["op_action"]
            op = Data_operation_type(
                function_type='Filter',
                function_arg='Table',
                function_subtype='RemoveMissing',
                function_subtype_arg=data["op_action"])
            op.save()

        elif operation == 'metadata':
            print data["column_type"]
            op = Data_operation_type(
                function_type='Update',
                function_arg='Table',
                function_subtype='Metadata',
                function_subtype_arg=data["column_type"])
            op.save()

        elif operation == 'row':
            print data["row_values"]
            op = Data_operation_type(
                function_type='Create',
                function_arg='Row',
                function_subtype='Row',
                function_subtype_arg=data["row_values"])
            op.save()

        elif operation == 'input':
            print data
            if data["input_file_type"] == "csv":
                print data["data_values"], data["input_file"], data["input_file_type"]
                filename = "/tmp/" + str(data["experiment"]) + "_" + data["input_file"]
                print "Filename ", filename
                f = open(filename, 'w')
                f.write(data["data_values"])
                f.close()
                op = Data_operation_type(
                    function_type='Create', function_arg='Table',
                    function_subtype='Input', function_subtype_arg=filename)
                op.save()

            elif data["input_file_type"] == "http":
                filename = "/tmp/" + str(data["experiment"]) + "_" + data["input_file"].split('/')[-1]
                print "Filename ", filename
                response = urllib2.urlopen(data["input_file"])
                csv_data = read_csv(response)
                csv_data.to_csv(filename, index=False)
                op = Data_operation_type(
                    function_type='Create', function_arg='Table',
                    function_subtype='Input', function_subtype_arg=filename)
                op.save()

        elif operation == "machine_learning":
            print data["model_type"], data["train_data_percentage"], data["target_column"]
            arg = {
                'train_data_percentage': data["train_data_percentage"],
                'target_column': data["target_column"]}
            op = Data_operation_type(
                function_type='Create',
                function_arg='Model',
                function_arg_id=data["model_type"],
                function_subtype='Train-Test',
                function_subtype_arg=json.dumps(arg))
            op.save()
        return op

    def list(self, request, operation):
        comp = Component.objects.all()
        serializer = ComponentSerializer(comp, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, operation, pk=None):
        comp = Component.objects.get(pk=int(pk))
        serializer = ComponentSerializer(comp)
        return send_response(request.method, serializer)

    def create(self, request, operation):
        data = json.loads(JSONRenderer().render(request.DATA))

        op = None  # TODO: [refactor] This value is probably not needed

        exp_id = int(data["experiment"])

        # TODO: [required] this statement should be surrounded by try-catch
        exp = Experiment.objects.get(pk=exp_id)

        print "Experiment ", exp_id, " Operation ", operation, "data ", data
        op = self.set_operation(operation, data)

        component = Component(
            experiment=exp, created_time=datetime.now(),
            modified_time=datetime.now(), operation_type=op)
        component.save()
        serializer = ComponentSerializer(component)
        return send_response("GET", serializer)

    def update(self, request, operation, pk=None):
        data = json.loads(JSONRenderer().render(request.DATA))

        op = None  # TODO: [refactor] This value is probably not needed

        exp_id = int(data["experiment"])
        print "Experiment ", exp_id, " Operation ", operation
        op = self.set_operation(operation, data)

        comp = Component.objects.get(pk=pk)
        serializer = ComponentSerializer(comp, data=request.DATA)
        if serializer.is_valid():
            serializer.object.operation_type = op
            serializer.save()
        return send_response(request.method, serializer)

    def destroy(self, request, operation, pk=None):
        user = Component.objects.get(pk=pk)
        serializer = None
        user.delete()
        return send_response(request.method, serializer)
