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
