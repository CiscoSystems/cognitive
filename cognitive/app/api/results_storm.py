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

from ..models import Experiment, Component
from toposort import toposort_flatten
from rest_framework import viewsets
from django.http import HttpResponse
from django.conf import settings
from django.core import serializers
from collections import defaultdict
# TODO: [refactor] this import statement should specify some file instead of '*'
from pandas import *
import redis
import threading
import json

CACHE = {}


class storm_client (threading.Thread):

    def __init__(self, thread_id, name, experiment, component_id, max_results, cache_results):
        threading.Thread.__init__(self)
        self.threadID = thread_id
        self.name = name
        self.experiment = experiment
        self.comp_id = component_id
        self.result = {}
        self.max_results = max_results
        self.cache_results = cache_results
        print "Submitting topology to storm. End component", self.comp_id
        exp = Experiment.objects.get(pk=self.experiment)
        graph = exp.workflow.graph_data
        graph_data = {}
        print graph
        tmp = graph.split(',')
        for elem in tmp:
            first_node = elem.split(":")[0]
            second_node = elem.split(":")[1]
            if second_node in graph_data:
                depend_nodes = graph_data[second_node]
                depend_nodes.add(first_node)
            else:
                graph_data[second_node] = set()
                graph_data[second_node].add(first_node)
        topological_graph = toposort_flatten(graph_data)
        print "Graph after topological sort", topological_graph
        message = {
            'exp_id': self.experiment, 'result': self.comp_id,
            'graph': topological_graph, 'components': defaultdict()}

        for data in topological_graph:
            component_id = int(data)
            comp = Component.objects.get(pk=component_id)
            if comp.operation_type.function_type == 'Create':
                if comp.operation_type.function_arg == 'Table':
                        filename = comp.operation_type.function_subtype_arg
                        input_data = read_csv(filename)
                        message['input'] = {}
                        for elem in list(input_data.columns):
                            message['input'][elem] = list(input_data[elem])
                        message['cols'] = list(input_data.columns)
                        # message['input'] = input_data.to_dict()

            serialized_obj = serializers.serialize('json', [comp.operation_type, ])
            print "Component_id", component_id, " ", comp.operation_type
            message['components'][data] = serialized_obj

        print "Message ", message
        r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
        self.pubsub = r.pubsub(ignore_subscribe_messages=True)
        self.pubsub.subscribe("Exp " + str(self.experiment))
        ret = r.publish('workflow', json.dumps(message))
        print "return", ret

    def run(self):
        print "Listening for results"
        for message in self.pubsub.listen():
            self.result = json.loads(message['data'])
            print self.result
            break
        self.pubsub.unsubscribe()
        self.pubsub.close()


class ResultViewSet(viewsets.ViewSet):

    def list(self, request):
        exp_id = int(request.GET.get('experiment', ''))
        component_id = int(request.GET.get('component_id', ''))
        print "Experiment ", exp_id
        try:
            client_thread = storm_client(1, "WorkFlow Thread", exp_id, component_id, 10, False)
            client_thread.start()
            client_thread.join()
        except Exception, e:
            print "Exception Raised during storm cluster connection", str(e)
            client_thread.result = {'status': 'failed', 'message': str(e)}
        print "Client thread status ", client_thread.result
        return HttpResponse(json.dumps(client_thread.result), content_type="application/json")
