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
import os.path

from ..models import Data, User
from ..serializers import DataSerializer
from ..views import send_response
from rest_framework import viewsets

from pandas import datetime

PROJECT_PATH = os.path.abspath(os.path.dirname(__name__))
FILE_UPLOAD_DIR = os.path.join(PROJECT_PATH, 'cognitive/app/uploads/')


def handle_uploaded_file(f):
    file_dir = os.path.join(FILE_UPLOAD_DIR, str(f))
    with open(file_dir, 'w+') as dest:
        for chunk in f.chunks():
            dest.write(chunk)


class DataViewSet(viewsets.ViewSet):
    # This API endpoint needs to be modified for enabling directly
    # upload any kind of data without requiring hard work on frontend

    def list(self, request):
        """
        Lists all experiments for a particular user
        ---
        """
        data = Data.objects.all()
        serializer = DataSerializer(data, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, pk=None):
        """
        Retrieve an experiment for a particular user
        ---
        """
        data = Data.objects.get(pk=pk)
        serializer = DataSerializer(data)
        return send_response(request.method, serializer)

    def create(self, request):
        upload_file = request.FILES['file']
        first_line = upload_file.readline().rstrip('\r\n')
        handle_uploaded_file(upload_file)

        data = request.DATA
        data_model = Data(
            type="csv",
            file_path=str(upload_file),
            user=User.objects.get(pk=int(data["user_id"])),
            columns=first_line,
            created_time=datetime.now(),
            modified_time=datetime.now())
        data_model.save()

        serializer = DataSerializer(data_model)
        return send_response("GET", serializer)

    def update(self, request, pk=None):
        """
        Update an experiment for a particular user
        ---
        request_serializer: DataSerializer
        """
        serializer = None
        # data_model = Data.objects.get(pk=pk)
        # if request.DATA["type"] == "csv":
        #     file_path = "/tmp/" + request.DATA["filename"]
        #     f = open(file_path, 'w')
        #     f.write(request.DATA["data_values"])
        #     f.close()
        #     data_model['type'] = "csv"
        #     data_model['file_path'] = file_path
        #     data_model.save()
        #     serializer = DataSerializer(data_model)

        return send_response(request.method, serializer)

    def destroy(self, request, pk=None):
        """
        Delete an experiment for a particular user
        ---
        """
        data = Data.objects.get(pk=pk)
        # TODO: remove corresponding file
        data.delete()
        serializer = None
        return send_response(request.method, serializer)
