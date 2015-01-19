from ..models import Experiment, Component
from toposort import toposort, toposort_flatten
from ..serializers import ExperimentSerializer
from ..views import send_response
from ..ml_models import Classifier 
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from datetime import datetime
from numpy import genfromtxt
from collections import Counter
from storm.drpc import DRPCClient
from django.conf import settings
from django.core import serializers
from collections import defaultdict
from pandas import *
import redis
import numpy as np
import threading
import json
import sys

CACHE = {}

class storm_client (threading.Thread):
    def __init__(self, threadID, name, experiment, component_id, max_results, cache_results):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.experiment = experiment
        self.comp_id = component_id
        self.result = {}
        self.max_results = max_results
        self.cache_results = cache_results
        #print "Storm DPRC HOST ",settings.DRPC_HOST
        #self.client = DRPCClient(settings.DRPC_HOST, 3772)
       

    def run(self):
        print "Run called for thread name", self.name, "End component", self.comp_id
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
        message = {'exp_id':self.experiment,'result':self.comp_id,'graph':topological_graph}
        message['components']= defaultdict()
        for data in topological_graph:
            component_id = int(data)
            comp = Component.objects.get(pk= component_id)
            serialized_obj = serializers.serialize('json', [ comp.operation_type, ])
            print "Component_id" , component_id, " " ,comp.operation_type, " string "
            message['components'][data]=serialized_obj
        print "Message ",message
        r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0) 
        ret = r.publish('workflow', json.dumps(message))
        print "return", ret
 
                         

class ResultViewSet(viewsets.ViewSet):
    
    def list(self, request):
        exp_id = int(request.GET.get('experiment', ''))
        component_id = int(request.GET.get('component_id', ''))
        print "Experiment ", exp_id
        try:
            client_thread = storm_client(1, "WorkFlow Thread", exp_id, component_id, 10, False)
            client_thread.start()
            client_thread.join()
        except Exception,e:
            print "Exception Raised during storm cluster connection",str(e)
            client_thread.result={'status':'failed', 'message':str(e)}
        return HttpResponse(json.dumps(client_thread.result), content_type="application/json")

        
