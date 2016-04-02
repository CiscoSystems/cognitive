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

from ..models import Experiment
from ..serializers import ExperimentSerializer
from ..views import send_response
from rest_framework import viewsets


class ExperimentViewSet(viewsets.ViewSet):
    def list(self, request):
        """
        Lists all experiments for a particular user
        ---
        """
        exp = Experiment.objects.all()
        serializer = ExperimentSerializer(exp, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, pk=None):
        """
        Retrieve an experiment for a particular user
        ---
        """
        exp = Experiment.objects.get(pk=pk)
        serializer = ExperimentSerializer(exp)
        return send_response(request.method, serializer)

    def create(self, request):
        """
        Create an experiment for a particular user
        ---
        request_serializer: ExperimentSerializer
        """
        serializer = ExperimentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return send_response(request.method, serializer)

    def update(self, request, pk=None):
        """
        Update an experiment for a particular user
        ---
        request_serializer: ExperimentSerializer
        """
        exp = Experiment.objects.get(pk=pk)
        serializer = ExperimentSerializer(exp, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def destroy(self, request, pk=None):
        """
        Delete an experiment for a particular user
        ---
        """
        exp = Experiment.objects.get(pk=pk)
        serializer = None
        exp.delete()
        return send_response(request.method, serializer)
