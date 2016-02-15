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


from ..models import User
#from django.contrib.auth.models import User
from ..serializers import UserSerializer
from ..views import send_response, send_response_message
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAdminUser
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.hashers import make_password
from django.conf import settings
import requests
import json


class UserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny, ]
    #permission_classes = [IsAdminUser, ]
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
        """
        Lists all users in the system
        ---
        """
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, pk=None):
        """
        Retrieve a user in the system
        ---
        """
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return send_response(request.method, serializer)

    def create(self, request):
        """
        Create a new user in the system
        ---
        request_serializer: UserSerializer
        """
        try:
            print request.DATA
            data = json.loads(JSONRenderer().render(request.DATA))
            password = data['password']
            data['password'] = make_password(data['password'])
 
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            user = self.generate_access_token(data['username'], password)
            serializer = UserSerializer(user)
            if serializer.is_valid:
                serializer.save()
            return send_response("GET", serializer)
        except Exception as e:
            return send_response_message(False,str(e[0]))

    def update(self, request, pk=None):
        """
        Update all users in the system
        ---
        request_serializer: UserSerializer
        """
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def destroy(self, request, pk=None):
        """
        Delete a user in the system
        ---
        """
        user = User.objects.get(pk=pk)
        serializer = None
        user.delete()
        return send_response(request.method, serializer)

    @list_route(methods=["POST"])
    def login(self, request):
        try:
            username_or_email = request.POST.get('username_or_email')
            password = request.POST.get('password')
            print username_or_email, password 
            user = self.generate_access_token(username_or_email, password)
            serializer = UserSerializer(user)
            if serializer.is_valid:
                serializer.save()
            return send_response("GET", serializer)
        except Exception as e:
            return Response({'status': 'failure','message':str(e[0])})

    def generate_access_token(self,username_or_email, password):
        print username_or_email, password
        try:
            user = User.objects.get(username=username_or_email)
            username = user.username
        except:
            try:
                user = User.objects.get(email=username_or_email)
                username = user.username
            except:
                return None
        data = {'grant_type':'password','username':username,'password':password}
        ret = requests.post(settings.OAUTH_URL,data,auth=(settings.COGNITIVE_CLIENT_ID,settings.COGNITIVE_CLIENT_SECRET))
        print ret.json()
        user.token = ret.json()['access_token']
        user.save(update_fields=['token'])
        print "saved"
        return user
