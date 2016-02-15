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

from django.conf.urls import patterns, url, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.contrib import admin
from view import view_user, view_exp, view_operation, view_workflow

if settings.CLUSTER_TYPE == 'storm':
    from view import view_result_storm as view_result
else:
    from view import view_result_local as view_result

router = DefaultRouter()
router.register(r'users', view_user.UserViewSet, '')
router.register(r'experiments', view_exp.ExperimentViewSet, '')
router.register(r'workflows', view_workflow.WorkFlowViewSet, '')
router.register(r'results', view_result.ResultViewSet, '')
router.register(r'operations/(?P<operation>\w+)', view_operation.OperationViewSet, '')


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
)
