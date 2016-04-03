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

from models import Component
from models import Data
from models import DataOperationType
from models import Experiment
from models import User
from models import Workflow
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        write_only_fields = ['password']
        read_only_fields = ['id']


class ExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        # fields = ('created_time', 'modified_time',
        #        'execution_start_time', 'execution_end_time', 'component_start_id')
        # read_only_fields = ('created_time', 'modified_time',
        #        'execution_start_time', 'execution_end_time', 'component_start_id')
        # write_only_fields = ('created_time', 'modified_time',
        #        'execution_start_time', 'execution_end_time', 'component_start_id')


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data


class DataOperationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataOperationType


class ComponentSerializer(serializers.ModelSerializer):
    # operation_type = DataOperationTypeSerializer()
    # function_type='Update',
    # function_arg=data["component_type"],
    # function_subtype=data["op_type"],
    # function_arg_id=data["component_id"],
    # function_subtype_arg=data["op_constant"])

    # component_type = serializers.CharField(source='operation_type.function_arg')
    # component_id = serializers.CharField(source='operation_type.function_arg_id')
    # op_type = serializers.CharField(source='operation_type.function_subtype')
    # op_constant = serializers.CharField(source='operation_type.function_subtype_arg')

    class Meta:
        model = Component
        depth = 1


class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workflow
