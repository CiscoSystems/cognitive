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
from api import users as api_users
from api import data as api_data
from api import experiments as api_experiments
from api import operations as api_operations
from api import workflows as api_workflow


if settings.CLUSTER_TYPE == 'storm':
    from api import results_storm as api_result
else:
    from api import results_local as api_result

router = DefaultRouter()
router.register(r'data', api_data.DataViewSet, '')
router.register(r'experiments', api_experiments.ExperimentViewSet, '')
router.register(r'operations/(?P<operation>\w+)', api_operations.OperationViewSet, '')
router.register(r'results', api_result.ResultViewSet, '')
router.register(r'users', api_users.UserViewSet, '')
router.register(r'workflows', api_workflow.WorkFlowViewSet, '')


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
)
