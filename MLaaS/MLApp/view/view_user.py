# Copyright (c) 2015 Cisco, Inc.
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

from ..models import User
from ..serializers import UserSerializer
from ..views import send_response
from rest_framework import viewsets


class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet that for listing or retrieving users.

    user_list = UserViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })

    user_detail = UserViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })
    """
    def list(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return send_response(request.method, serializer)

    def create(self, request):
        serializer = UserSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def update(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def destroy(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = None
        user.delete()
        return send_response(request.method, serializer)
