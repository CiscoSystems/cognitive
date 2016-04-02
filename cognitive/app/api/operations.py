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

from ..models import Component
from ..models import DataOperationType
from ..models import Experiment
from ..serializers import ComponentSerializer
from ..views import send_response
import os
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from pandas import read_csv
from datetime import datetime
import json
import urllib2

PROJECT_PATH = os.path.abspath(os.path.dirname(__name__))
FILE_UPLOAD_DIR = os.path.join(PROJECT_PATH, 'cognitive/app/uploads/')

MAX_COMPONENTS_PER_EXP = 100

#####
# Operation      function_type function_arg function_subtype function_arg_id function_subtype_arg
# mathformula         Update      {comp_type}  {op_type}        {comp_id}       {op_constant}
# metadata            Update      Table        Metadata         -               {column_type}
# normalization       Update      {comp_type}  Normalize        {comp_id}       {op_type}
# projection          Filter      Table        Project          {comp_id}       -
# duplication_removal Filter      Table        RemoveDup        {comp_id}       -
# remove_missing      Filter      Table        RemoveMissing    {comp_id}       {op_action}
# row                 Create      Row          Row              -               {row_values}
# input               Create      Table        Input            -               {filename}
# machine learning    Create      Model        {model_type}     {Train-test}    {ML arguments}


class OperationViewSet(viewsets.ViewSet):

    def set_operation(self, operation, data):
        if operation == 'math_formula':
            try:
                print data["op_type"], data["op_constant"], data["component_type"], data["component_id"]
                op = DataOperationType(
                    function_type='Update',
                    function_arg=data["component_type"],
                    function_subtype=data["op_type"],
                    function_arg_id=data["component_id"],
                    function_subtype_arg=data["op_constant"])
                op.save()
            except KeyError:
                op = DataOperationType(function_type='Update')
                op.save()

        elif operation == 'normalization':
            try:
                print data["component_type"], data["op_type"], data["component_id"]
                op = DataOperationType(
                    function_type='Update',
                    function_arg=data["component_type"],
                    function_arg_id=data["component_id"],
                    function_subtype='Normalize',
                    function_subtype_arg=data["op_type"])
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Update',
                    function_subtype='Normalize')
                op.save()

        elif operation == 'projection':
            try:
                print data["component_id"]
                op = DataOperationType(
                    function_type='Filter',
                    function_arg='Table',
                    function_arg_id=data["component_id"],
                    function_subtype='Project')
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Filter',
                    function_arg='Table')
                op.save()

        elif operation == 'duplication_removal':
            try:
                print data["component_id"]
                op = DataOperationType(
                    function_type='Filter',
                    function_arg='Table',
                    function_arg_id=data["component_id"],
                    function_subtype='RemoveDup')
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Filter',
                    function_arg='Table',
                    function_subtype='RemoveDup')
                op.save()

        elif operation == 'remove_missing':
            try:
                print data["op_action"]
                op = DataOperationType(
                    function_type='Filter',
                    function_arg='Table',
                    function_subtype='RemoveMissing',
                    function_subtype_arg=data["op_action"])
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Filter',
                    function_arg='Table',
                    function_subtype='RemoveMissing')
                op.save()

        elif operation == 'metadata':
            try:
                print data["column_type"]
                op = DataOperationType(
                    function_type='Update',
                    function_arg='Table',
                    function_subtype='Metadata',
                    function_subtype_arg=data["column_type"])
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Update',
                    function_arg='Table',
                    function_subtype='Metadata')
                op.save()

        elif operation == 'row':
            try:
                print data["row_values"]
                op = DataOperationType(
                    function_type='Create',
                    function_arg='Row',
                    function_subtype='Row',
                    function_subtype_arg=data["row_values"])
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Create',
                    function_arg='Row',
                    function_subtype='Row')
                op.save()

        elif operation == 'input':
            try:
                if data["input_file_type"] == "csv":
                    print data["input_file"], data["input_file_type"]
                    filename = "/tmp/" + str(data["experiment"]) + "_" + data["input_file"]
                    print "Filename ", filename
                    f = open(filename, 'w')
                    f.write(data["data_values"])
                    f.close()
                    op = DataOperationType(
                        function_type='Create', function_arg='Table',
                        function_subtype='Input', function_subtype_arg=filename)
                    op.save()

                elif data["input_file_type"] == "http":
                    filename = "/tmp/" + str(data["experiment"]) + "_" + data["input_file"].split('/')[-1]
                    print "Filename ", filename
                    response = urllib2.urlopen(data["input_file"])
                    csv_data = read_csv(response)
                    csv_data.to_csv(filename, index=False)
                    op = DataOperationType(
                        function_type='Create', function_arg='Table',
                        function_subtype='Input', function_subtype_arg=filename)
                    op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Create',
                    function_arg='Table',
                    function_subtype='Input')
                op.save()

        elif operation == "machine_learning":
            try:
                print data["model_type"], data["train_data_percentage"], data["target_column"]
                arg = {
                    'train_data_percentage': data["train_data_percentage"],
                    'target_column': data["target_column"]}
                op = DataOperationType(
                    function_type='Create',
                    function_arg='Model',
                    function_arg_id=data["model_type"],
                    function_subtype='Train-Test',
                    function_subtype_arg=json.dumps(arg))
                op.save()
            except KeyError:
                op = DataOperationType(
                    function_type='Create',
                    function_arg='Model',
                    function_subtype='Train-Test')
                op.save()
        return op

    def list(self, request, operation):
        """
        List all components for a particular experiment
        ---
        """
        comp = Component.objects.all()
        serializer = ComponentSerializer(comp, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, operation, pk=None):
        """
        Retrieve a component for a particular experiment
        ---
        """
        comp = Component.objects.get(pk=int(pk))
        serializer = ComponentSerializer(comp)
        print serializer
        print serializer.data


        return send_response(request.method, serializer)

    def create(self, request, operation):
        """
        Create a component for a particular experiment
        ---
        request_serializer: ComponentSerializer
        """
        data = json.loads(JSONRenderer().render(request.data))

        op = None  # TODO: [refactor] This value is probably not needed

        exp_id = int(data["experiment"])

        # TODO: [required] this statement should be surrounded by try-catch
        exp = Experiment.objects.get(pk=exp_id)

        print "Experiment ", exp_id, " Operation ", operation
        op = self.set_operation(operation, data)

        component = Component(experiment=exp, operation_type=op)
        component.save()
        serializer = ComponentSerializer(component)
        return send_response("GET", serializer)

    def update(self, request, operation, pk=None):
        """
        Update a component for a particular experiment
        ---
        request_serializer: ComponentSerializer
        """
        data = json.loads(JSONRenderer().render(request.data))

        op = None  # TODO: [refactor] This value is probably not needed

        exp_id = int(data["experiment"])
        print "Experiment ", exp_id, " Operation ", operation
        op = self.set_operation(operation, data)
        comp = Component.objects.get(pk=pk)
        comp.operation_type = op
        serializer = ComponentSerializer(comp, data=request.data)
        serializer.operation_type = op
        if serializer.is_valid():
            # serializer.operation_type = op
            serializer.save()
        # TODO: response serializer.errors when is_valid() is False
        return send_response(request.method, serializer)

    def destroy(self, request, operation, pk=None):
        """
        Delete a component for a particular experiment
        ---
        """
        user = Component.objects.get(pk=pk)
        serializer = None
        user.delete()
        return send_response(request.method, serializer)
