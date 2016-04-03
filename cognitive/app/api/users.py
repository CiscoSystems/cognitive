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

from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import HttpResponse


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @list_route(methods=["GET"])
    def login(self, request):
        # TODO: Use oauth2 library
        try:
            username_or_email = request.GET.get('username_or_email')
            password = request.GET.get('password')
            user = User.authenticate(username_or_email, password)
            return Response({
                'id': user.id, 'username': user.username,
                'email': user.email, 'token': user.token,
                'status': 'success'})
        except:
            return HttpResponse('Unauthorized', status=401)
