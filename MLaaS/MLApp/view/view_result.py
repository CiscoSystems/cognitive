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
import numpy as np
from pandas import *
import threading
import json

CACHE = {}

class myThread (threading.Thread):
    def __init__(self, threadID, name, experiment, component_id, max_results, cache_results):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.experiment = experiment
        self.comp_id = component_id
        self.result = {}
        self.max_results = max_results
        self.cache_results = cache_results
       

    def run(self):
        print "Run called for thread name", self.name, "End component", self.comp_id
        exp = Experiment.objects.get(pk=self.experiment)
        print exp.workflow.graph_data
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
        #input_data = None
        if self.experiment in CACHE:
            input_data = CACHE[self.experiment]
        else:
            input_data = DataFrame
        feature_names = None
        feature_types = None
        output_data = None
        for data in topological_graph:
            component_id = int(data)
            comp = Component.objects.get(pk= component_id)
            print "Component_id" , component_id, " " ,comp.operation_type 
            op = comp.operation_type
            if op.function_type == 'Create':
                if op.function_arg == 'Table':
                    if op.function_subtype == 'Input':
                        filename = op.function_subtype_arg
                        input_data = read_csv(filename)
                        feature_names = input_data.columns
                if op.function_arg == 'Row':
                    if op.function_subtype == 'Row':
                        row_values = json.loads(op.function_subtype_arg)
                        input_data.loc[len(input_data)+1]= row_values
                if op.function_arg == 'Model':
                    if op.function_subtype == 'Train-Test':
                        params = json.loads(op.function_subtype_arg)
                        train_data_percentage = int(params["train_data_percentage"])
                        target_column = int(params["target_column"])
                        model_type = op.function_arg_id
                        print model_type, train_data_percentage,target_column
                        target_feature = feature_names[target_column]
                        actual_target_column = input_data.columns.get_loc(target_feature)
                        input_feature_columns = range(len(input_data.columns))
                        input_feature_columns.remove(actual_target_column)
                        input_features = input_data.columns[input_feature_columns]
                        classifier = Classifier(input_data, model_type, train_data_percentage, input_features ,target_feature)
                        output_data = classifier.learn()

            if op.function_type == 'Update' :
                if op.function_arg == 'Table':
                    if op.function_subtype == 'Metadata':
                        feature_types = json.loads(op.function_subtype_arg)
                        print "Feature Names" ,feature_names, " Feature_types ", feature_types
                        
                if op.function_arg == 'Column':
                    if op.function_subtype == 'Add':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        input_data[column_name] = input_data[column_name] + constant_value
                    if op.function_subtype == 'Sub':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        input_data[column_name] = input_data[column_name] - constant_value
                    if op.function_subtype == 'Mult':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        input_data[column_name] = input_data[column_name] * constant_value
                    if op.function_subtype == 'Div':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        input_data[column_name] = input_data[column_name] / constant_value
                    if op.function_subtype == 'Normalize':
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        sum_array = input_data.sum(axis=0)
                        normalization_value = sum_array[column_name]
                        input_data[column_name] = input_data[column_name] / normalization_value
            if op.function_type == 'Filter' :
                if op.function_arg == 'Table':
                    if op.function_subtype == 'Project':
                        column_id_list = json.loads(op.function_arg_id)
                        excluded_columns = range(len(input_data.columns))
                        for elem in column_id_list:#Bug: Calling Projection twice will break indexing logic
                            excluded_columns.remove(elem)
                        input_data = input_data.drop(input_data.columns[excluded_columns], axis=1)
                    if op.function_subtype == 'RemoveDup':
                        column_id_list = json.loads(op.function_arg_id)
                        column_name_list = []
                        for elem in column_id_list:
                            column_name_list.append(feature_names[elem])
                        input_data = input_data.drop_duplicates(subset = column_name_list) 
                    if op.function_subtype == 'RemoveMissing':
                        if op.function_subtype_arg == 'Replace_mean':
                            input_data = input_data.fillna(input_data.mean())
                        if op.function_subtype_arg == 'Replace_median':
                            input_data = input_data.fillna(input_data.median())
                        if op.function_subtype_arg == 'Replace_mode':
                            input_data = input_data.fillna(input_data.mode())
                        if op.function_subtype_arg == 'Drop_row':
                            input_data = input_data.dropna(axis = 0)
            #print "Data"
            #print input_data
            #print "Data Type"
            #print input_data.dtypes
            if component_id == self.comp_id:
                print "End component reached"
                self.result["feature_names"] = list(input_data.columns)
                if feature_types is not None:
                    self.result["feature_types"] = feature_types
                self.result["data"] = input_data[:self.max_results].to_json()
                if output_data is not None:
                    self.result["output"] = output_data
                self.result["missing_values"] = list(input_data.isnull().sum().values)
                mean = input_data.mean()  
                median = input_data.median()
                self.result["mean"] = []
                self.result["median"] = []
                for elem in input_data.columns:
                    if elem in mean:
                        self.result["mean"].append(mean[elem])
                    else:
                        self.result["mean"].append(None)
                    if elem in median:
                        self.result["median"].append(median[elem])
                    else:
                        self.result["median"].append(None)
                self.result["unique_values"] = []
                for elem in input_data.columns:
                    self.result["unique_values"].append(input_data[elem].nunique())
                self.result["min"] = []    
                self.result["max"] = []    
                self.result["std"] = []
                self.result["25_quartile"] =[]    
                self.result["50_quartile"] =[]    
                self.result["75_quartile"] =[]    
                metric_val = input_data.describe()
                for elem in input_data.columns:
                    if elem in metric_val:
                        self.result["min"].append(metric_val[elem]["min"])
                        self.result["max"].append(metric_val[elem]["max"])
                        self.result["std"].append(metric_val[elem]["std"])
                        self.result["25_quartile"].append(metric_val[elem]["25%"])
                        self.result["50_quartile"].append(metric_val[elem]["50%"])
                        self.result["75_quartile"].append(metric_val[elem]["75%"])
                    else:
                        self.result["min"].append(None)
                        self.result["max"].append(None)
                        self.result["std"].append(None)
                        self.result["25_quartile"].append(None)
                        self.result["50_quartile"].append(None)
                        self.result["75_quartile"].append(None)
                self.result["total_rows"] = input_data.shape[0]    
                self.result["total_columns"] = input_data.shape[1]   
                if self.cache_results == True:
                    CACHE[self.experiment] = input_data 
                break
                         

class ResultViewSet(viewsets.ViewSet):
    
    def list(self, request):
        exp_id = int(request.GET.get('experiment', ''))
        component_id = int(request.GET.get('component_id', ''))
        print "Experiment ", exp_id
        thread = myThread(1, "WorkFlow Thread", exp_id, component_id, 10, False)
        thread.start()
        thread.join()
        return HttpResponse(json.dumps(thread.result), content_type="application/json")

        
