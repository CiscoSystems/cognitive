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

from django.shortcuts import render_to_response, redirect, render
from django.template import RequestContext
from rest_framework import status
from rest_framework.response import Response

from models import User


def index(request):
    return render_to_response(
        'index.haml', context_instance=RequestContext(request))


def login(request):
    messages = []
    if request.method == "POST":
        print request.POST
        username_or_email = request.POST.get("username_or_email")
        password = request.POST.get("password")
        user = User.authenticate(
            username_or_email=username_or_email, password=password)
        if user is None:
            msg = {"message": "Username or password is not correct.", "tag": "danger"}
            messages.append(msg)
        else:
            request.session["cognitive"] = {}
            request.session["cognitive"]["user"] = {}
            request.session["cognitive"]["user"]["id"] = user.id
            request.session["cognitive"]["user"]["name"] = user.username
            request.session["cognitive"]["user"]["token"] = user.token
            msg = {"message": "Login Successfully", "tag": "success"}
            messages.append(msg)
            return redirect('/whiteboard', {"messages": messages})
    print(messages)
    return render(request, 'login.haml', {"messages": messages})


def join(request):
    if request.method == "POST":
        print request.POST
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        token = User.generate_token()
        user = User(username=username, password=password,
                    email=email, full_name=username, token=token)
        try:
            user.save()
            request.session["cognitive-user-id"] = user.id
            request.session["cognitive-user-name"] = user.username
            request.session["cognitive-user-token"] = user.token
        except Exception:
            err_msg = "User is not created"

    return render_to_response(
        'join.haml', context_instance=RequestContext(request))


def logout(request):
    request.session.flush()
    return redirect('/', {"messages": ""})


def whiteboard(request):
    return render_to_response(
        'whiteboard.haml', context_instance=RequestContext(request))


def send_response(method, serializer):
    print "method", method
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
