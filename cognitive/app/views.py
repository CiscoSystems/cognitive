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

from django.shortcuts import render_to_response
from django.template import RequestContext
from rest_framework import status
from rest_framework.response import Response


def index(request):
    return render_to_response(
        'index.html', context_instance=RequestContext(request))


def send_response(method, serializer):
    if method == 'GET':
        return Response(serializer.data)
    elif method == 'POST':
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif method == 'PUT':
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif method == 'DELETE':
        return Response(status=status.HTTP_204_NO_CONTENT)
