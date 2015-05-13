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
from ..serializers import UserSerializer
from ..views import send_response

from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class UserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny, ]
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

    # this implementation is tempral for front end developers
    def create(self, request):
        """
        Create a new user in the system
        ---
        request_serializer: UserSerializer
        """
        # serializer = UserSerializer(data=request.DATA)
        # if serializer.is_valid():
        #     serializer.save()
        # return send_response(request.method, serializer)
        try:
            username = request.DATA.get('username')
            email = request.DATA.get('email')
            password = request.DATA.get('password')
            if not User.validate(username, email, password):
                return Response({'status': 'failure'})
            token = User.generate_token()
            user = User(username=username, email=email,
                        password=password, token=token)
            user.save()
            return Response({
                'id': user.id, 'username': user.username,
                'token': user.token, 'email': user.email,
                'status': 'success'})
        except Exception as e:
            return Response({'status': 'failure', 'message': str(e[0])})

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

    # this implementation is temporal not to stop front end developers
    # users/login?username_or_email=some_user_name&password=some_password
    @list_route(methods=["GET"])
    def login(self, request):
        try:
            username_or_email = request.GET.get('username_or_email')
            password = request.GET.get('password')
            user = User.authenticate(username_or_email, password)
            return Response({
                'id': user.id, 'username': user.username,
                'email': user.email, 'token': user.token,
                'status': 'success'})
        except:
            return Response({'status': 'failure'})
