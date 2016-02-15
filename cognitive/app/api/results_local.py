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
from ..ml_models import Classifier
from rest_framework import viewsets
from django.http import HttpResponse
from collections import Counter
# TODO: [refactor] this import statement should specify needed file instead of '*'
from pandas import *
import threading
import json

CACHE = {}


class myThread(threading.Thread):

    def __init__(self, thread_id, name, experiment, component_id, max_results, cache_results):

        threading.Thread.__init__(self)
        self.threadID = thread_id
        self.name = name
        self.experiment = experiment
        self.comp_id = component_id
        self.result = {}
        self.max_results = max_results
        self.cache_results = cache_results

    def run(self):
        print "Run called for thread name", self.name, "End component", self.comp_id
        exp = Experiment.objects.get(pk=self.experiment)
        graph = exp.workflow.graph_data
        graph_data = {}
        print graph
        status = "success"
        err_msg = ""
        tmp = graph.split(',')

        for elem in tmp:
            node = elem.split(":")
            if len(node) > 1:
                first_node = node[0]
                second_node = node[1]
            else:
                first_node = node[0]
                second_node = ''
            if second_node in graph_data:
                depend_nodes = graph_data[second_node]
                depend_nodes.add(first_node)
            else:
                graph_data[second_node] = set()
                graph_data[second_node].add(first_node)

        topological_graph = toposort_flatten(graph_data)
        print "Graph after topological sort", topological_graph

        if self.experiment in CACHE:
            input_data = CACHE[self.experiment]
        else:
            input_data = DataFrame

        feature_names = None
        feature_types = None
        output_data = None

        for data in topological_graph:
            component_id = int(data)
            comp = Component.objects.get(pk=component_id)
            print "Component_id", component_id, " ", comp.operation_type
            op = comp.operation_type

            if op.function_type == 'Create':
                if op.function_arg == 'Table':
                    if op.function_subtype == 'Input':
                        filename = op.function_subtype_arg
                        input_data = read_csv(filename)
                        feature_names = input_data.columns

                # TODO: [refactor] elif?
                if op.function_arg == 'Row':
                    if op.function_subtype == 'Row':
                        row_values = json.loads(op.function_subtype_arg)
                        input_data.loc[len(input_data) + 1] = row_values

                if op.function_arg == 'Model':
                    if op.function_subtype == 'Train-Test':
                        params = json.loads(op.function_subtype_arg)
                        train_data_percentage = int(params["train_data_percentage"])
                        target_column = int(params["target_column"])
                        model_type = op.function_arg_id
                        print model_type, train_data_percentage, target_column
                        target_feature = feature_names[target_column]
                        try:
                            actual_target_column = input_data.columns.get_loc(target_feature)
                            input_feature_columns = range(len(input_data.columns))
                            input_feature_columns.remove(actual_target_column)
                            input_features = input_data.columns[input_feature_columns]
                            classifier = Classifier(
                                input_data, model_type, train_data_percentage,
                                input_features, target_feature)
                            output_data = classifier.learn()
                        except ValueError as e:
                            status = "failure"
                            err_msg = " Invalid input for the model training"
                        except KeyError as e:
                            status = "failure"
                            err_msg = target_feature + " column is not available for Model Training"

            # TODO: [refactor] elif?
            if op.function_type == 'Update':
                if op.function_arg == 'Table':
                    if op.function_subtype == 'Metadata':
                        feature_types = json.loads(op.function_subtype_arg)
                        print "Feature Names", feature_names, " Feature_types ", feature_types

                if op.function_arg == 'Column':
                    if op.function_subtype == 'Add':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        if column_name not in input_data:
                            #print "Column name ", column_name, " not present. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = column_name + " column is not available for current operation"
                        elif input_data[column_name].dtype == 'object':
                            #print "Column name ", column_name, " is not integer/float. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = " Invalid input in column "+ column_name+ " for the current operation"
                        else:
                            input_data[column_name] += constant_value
                    if op.function_subtype == 'Sub':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        if column_name not in input_data:
                            #print "Column name ", column_name, " not present. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = column_name + " column is not available for current operation"
                        elif input_data[column_name].dtype == 'object':
                            #print "Column name ", column_name, " is not integer/float. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = " Invalid input in column "+ column_name+ " for the current operation"
                        else:
                            input_data[column_name] -= constant_value
                    if op.function_subtype == 'Mult':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        if column_name not in input_data:
                            #print "Column name ", column_name, " not present. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = column_name + " column is not available for current operation"
                        elif input_data[column_name].dtype == 'object':
                            #print "Column name ", column_name, " is not integer/float. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = " Invalid input in column "+ column_name+ " for the current operation"
                        else:
                            input_data[column_name] *= constant_value
                    if op.function_subtype == 'Div':
                        constant_value = float(op.function_subtype_arg)
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        if column_name not in input_data:
                            #print "Column name ", column_name, " not present. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = column_name + " column is not available for current operation"
                        elif input_data[column_name].dtype == 'object':
                            #print "Column name ", column_name, " is not integer/float. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = " Invalid input in column "+ column_name+ " for the current operation"
                        else:
                            input_data[column_name] /= constant_value
                    if op.function_subtype == 'Normalize':
                        column_id = float(op.function_arg_id)
                        column_name = feature_names[column_id]
                        sum_array = input_data.sum(axis=0)
                        if column_name not in sum_array:
                            #print "Column name ", column_name, " not present. Skipping"
                            #continue  # throw error in module status
                            status = "failure"
                            err_msg = column_name + " column is not available for current operation"
                        else:
                            normalization_value = sum_array[column_name]
                            input_data[column_name] = input_data[column_name] / normalization_value

            # TODO: [refactor] elif?
            if op.function_type == 'Filter':
                if op.function_arg == 'Table':
                    if op.function_subtype == 'Project':
                        column_id_list = json.loads(op.function_arg_id)
                        excluded_columns = range(len(feature_names))
                        for elem in column_id_list:  # Bug: Calling Projection twice will break indexing logic
                            excluded_columns.remove(elem)
                        excluded_columns = [x for x in excluded_columns if feature_names[x] in input_data]
                        print "Excluded columns ", excluded_columns
                        if excluded_columns:
                            input_data = input_data.drop(feature_names[excluded_columns], axis=1)
                    if op.function_subtype == 'RemoveDup':
                        column_id_list = json.loads(op.function_arg_id)
                        column_name_list = []
                        for elem in column_id_list:
                            column_name = feature_names[elem]
                            if column_name not in input_data:
                                #print "Column name ", column_name, " not present. Skipping"
                                #continue  # throw error in module status
                                status = "failure"
                                err_msg = column_name + " column is not available for current operation"
                            else:
                                column_name_list.append(column_name)
                        if column_name_list:
                            input_data = input_data.drop_duplicates(subset=column_name_list)
                    if op.function_subtype == 'RemoveMissing':
                        if op.function_subtype_arg == 'Replace_mean':
                            input_data = input_data.fillna(input_data.mean().round(2))
                        if op.function_subtype_arg == 'Replace_median':
                            input_data = input_data.fillna(input_data.median().round(2))
                        if op.function_subtype_arg == 'Replace_mode':
                            input_data = input_data.fillna(input_data.mode())
                        if op.function_subtype_arg == 'Drop_row':
                            input_data = input_data.dropna(axis=0)

            if component_id == self.comp_id:
                print "End component reached"
                self.result["feature_names"] = list(input_data.columns)
                if feature_types is not None:
                    self.result["feature_types"] = feature_types
                # self.result["data"] = input_data[:self.max_results].to_json()
                self.result["data"] = []
                result_length = min(len(input_data), self.max_results)

                for i in range(result_length):
                    tmp = []
                    for col in input_data.columns:
                        if json.dumps(input_data[col][i]) == 'NaN':
                            tmp.append('')
                        else:
                            tmp.append(input_data[col][i])
                    self.result["data"].append(tmp)

                self.result["graph_data"] = []

                for name in list(input_data.columns):
                    top_uniques = Counter(list(input_data[name])).most_common(4)
                    col_names = []
                    unique_count = []
                    for val in top_uniques:
                        if json.dumps(val[0]) == 'NaN':
                            continue
                        col_names.append(val[0])
                        unique_count.append(val[1])
                    tmp = [col_names, unique_count]
                    self.result["graph_data"].append(tmp)

                if output_data is not None:
                    self.result["output"] = output_data

                self.result["status"] = status
                self.result["message"] = err_msg

                self.result["missing_values"] = list(input_data.isnull().sum().values)
                mean = input_data.mean().round(2)
                median = input_data.median().round(2)
                self.result["mean"] = []
                self.result["median"] = []

                for elem in input_data.columns:
                    if elem in mean:
                        self.result["mean"].append(mean[elem])
                    else:
                        self.result["mean"].append('')
                    if elem in median:
                        self.result["median"].append(median[elem])
                    else:
                        self.result["median"].append('')

                self.result["unique_values"] = []

                for elem in input_data.columns:
                    self.result["unique_values"].append(input_data[elem].nunique())

                self.result["min"] = []
                self.result["max"] = []
                self.result["std"] = []
                self.result["25_quartile"] = []
                self.result["50_quartile"] = []
                self.result["75_quartile"] = []
                metric_val = input_data.describe()

                for elem in input_data.columns:
                    if elem in metric_val:
                        val = metric_val[elem].round(2)
                        self.result["min"].append(val["min"])
                        self.result["max"].append(val["max"])
                        self.result["std"].append(val["std"])
                        self.result["25_quartile"].append(val["25%"])
                        self.result["50_quartile"].append(val["50%"])
                        self.result["75_quartile"].append(val["75%"])
                    else:
                        self.result["min"].append('')
                        self.result["max"].append('')
                        self.result["std"].append('')
                        self.result["25_quartile"].append('')
                        self.result["50_quartile"].append('')
                        self.result["75_quartile"].append('')

                self.result["total_rows"] = input_data.shape[0]
                self.result["total_columns"] = input_data.shape[1]

                if self.cache_results is True:
                    CACHE[self.experiment] = input_data

                #print self.result
                print self.result["status"]
                print self.result["message"]
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
