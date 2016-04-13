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

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class DataOperationType(models.Model):
    FUNCTION_TYPE = (
        ('Create', 'Create a new type'),
        ('Update', 'Update a type'),
        ('Filter', 'Filter a type'),
        ('Delete', 'Delete a type'),
    )

    FUNCTION_ARG = (
        ('Row', 'Row of a table'),
        ('Column', 'Column of a table'),
        ('Table', 'Entire table'),
        ('Model', 'Machine Learning Model'),
    )

    FUNCTION_SUBTYPE = (
        ('Add', 'Add operation'),
        ('Sub', 'Sub operation'),
        ('Mult', 'Mult operation'),
        ('Div', 'Div operation'),
        ('Normalize', 'Normalization operation'),
        ('Project', 'Project certain columns'),
        ('RemoveDup', 'Remove duplicates'),
        ('RemoveMissing', 'Remove missing'),
        ('Metadata', 'Metadata editor'),
        ('Row', 'Adding a new row'),
        ('Input', 'Load input data'),
        ('Output', 'Dump output data'),
        ('Train-Test', 'Train and test a machine learning model'),
    )

    function_type = models.CharField(max_length=50, choices=FUNCTION_TYPE)
    function_arg = models.CharField(max_length=50, choices=FUNCTION_ARG)
    function_arg_id = models.CharField(max_length=50, blank=True, null=True)
    function_subtype = models.CharField(max_length=50, choices=FUNCTION_SUBTYPE)
    function_subtype_arg = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return_str = self.function_type + " " + self.function_arg + " "
        if self.function_arg_id is not None:
            return_str = return_str + str(self.function_arg_id) + " "
        if self.function_subtype is not None:
            return_str = return_str + self.function_subtype + " "
        if self.function_subtype_arg is not None:
            return_str = return_str + str(self.function_subtype_arg) + " "
        return return_str


class User(AbstractUser):
    token = models.CharField(max_length=100, blank=True, null=True)
    max_experiments = models.IntegerField(default=50)

    def __str__(self):
        return self.username

    def clean(self):
        if not self.username:
            raise ValidationError("Empty username field")
        if not self.password:
            raise ValidationError("Empty password field")
        if not self.email:
            raise ValidationError("Empty email field")
        validate_email(self.email)
        if User.objects.filter(username=self.username).count() > 0:
            raise ValidationError("Username already exists")
        if User.objects.filter(email=self.email).count() > 0:
            raise ValidationError("Email already exists")
        return True


class Data(models.Model):
    user = models.ForeignKey(User)
    type = models.CharField(blank=False, null=False, max_length=50)
    file_path = models.CharField(blank=True, null=True, max_length=50)
    columns = models.CharField(blank=True, null=True, max_length=1024)
    created_time = models.DateTimeField(auto_now=True)
    modified_time = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_time',)


class Experiment(models.Model):
    EXPERIMENT_STATUS = (
        ('Stop', ' Saved as stop'),
        ('InComplete', 'More information required'),
        ('InExecution', 'Execution started'),
        ('Error', ' Error when executed'),
        ('Completed', 'Executed Successfully'),
    )
    user = models.ForeignKey(User)
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=EXPERIMENT_STATUS, default='Stop')
    created_time = models.DateTimeField(auto_now=True)
    modified_time = models.DateTimeField(auto_now=True)
    execution_start_time = models.DateTimeField(blank=True, null=True)
    execution_end_time = models.DateTimeField(blank=True, null=True)
    component_start_id = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ['-modified_time']


class Component(models.Model):
    COMPONENT_STATUS = (
        ('Stop', ' Saved as stop'),
        ('InComplete', 'More information required'),
        ('InExecution', 'Execution started'),
        ('Error', ' Error when executed'),
        ('Completed', 'Executed Successfully'),
    )

    experiment = models.ForeignKey(Experiment)
    status = models.CharField(max_length=50, choices=COMPONENT_STATUS, default='Stop')
    operation_type = models.OneToOneField(DataOperationType, blank=True, null=True)
    created_time = models.DateTimeField(auto_now=True)
    modified_time = models.DateTimeField(auto_now=True)
    execution_start_time = models.DateTimeField(blank=True, null=True)
    execution_end_time = models.DateTimeField(blank=True, null=True)
    data_location = models.CharField(max_length=50, blank=True, null=True)
    preferred_data_location = models.CharField(max_length=50, blank=True, null=True)
    # component_id = models.IntegerField(blank=True, null=True)


class Workflow(models.Model):
    experiment = models.OneToOneField(Experiment)
    graph_data = models.CharField(max_length=100)


class MLearning(models.Model):
    MODEL_TYPE = (
        ('Classifier', 'Classifier models'),
        ('Clustering', 'Clustering models'),
        ('Regression', 'Regression models'),
    )

    experiment = models.ForeignKey(Experiment)
    model_type = models.CharField(max_length=50, choices=MODEL_TYPE)
    model_name = models.CharField(max_length=50)
    model_parameters = models.CharField(max_length=50, blank=True, null=True)
