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

from rest_framework import serializers
from .models import User, Experiment, Component, Workflow


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = ['id','username','full_name']


class ExperimentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Experiment
        # fields = ('created_time', 'modified_time',
        #        'execution_start_time', 'execution_end_time', 'component_start_id')
        # read_only_fields = ('created_time', 'modified_time',
        #        'execution_start_time', 'execution_end_time', 'component_start_id')
        # write_only_fields = ('created_time', 'modified_time',
        #        'execution_start_time', 'execution_end_time', 'component_start_id')


class ComponentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Component


class WorkflowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workflow
