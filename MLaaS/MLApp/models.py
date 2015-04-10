from django.db import models


class Data_operation_type(models.Model):
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
            return_str = return_str + self.function_arg_id + " "
        if self.function_subtype is not None:
            return_str = return_str + self.function_subtype + " "
        if self.function_subtype_arg is not None:
            return_str = return_str + self.function_subtype_arg + " "
        return return_str


class User(models.Model):
    username = models.CharField(max_length=50)
    full_name = models.CharField(max_length=50)
    max_experiments = models.IntegerField(default=50)

    def __str__(self):
        return self.username


class Experiment(models.Model):
    EXPERIMENT_STATUS = (
        ('Draft', ' Saved as draft'),
        ('InComplete', 'More information required'),
        ('InExecution', 'Execution started'),
        ('Error', ' Error when executed'),
        ('Completed', 'Executed Successfully'),
    )
    user = models.ForeignKey(User)
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=EXPERIMENT_STATUS, default='Draft')
    created_time = models.DateField(blank=True, null=True)
    modified_time = models.DateField(blank=True, null=True)
    execution_start_time = models.DateField(blank=True, null=True)
    execution_end_time = models.DateField(blank=True, null=True)
    component_start_id = models.IntegerField(blank=True, null=True)


class Component(models.Model):
    COMPONENT_STATUS = (
        ('Draft', ' Saved as draft'),
        ('InComplete', 'More information required'),
        ('InExecution', 'Execution started'),
        ('Error', ' Error when executed'),
        ('Completed', 'Executed Successfully'),
    )

    experiment = models.ForeignKey(Experiment)
    status = models.CharField(max_length=50, choices=COMPONENT_STATUS, default='Draft')
    operation_type = models.OneToOneField(Data_operation_type, blank=True, null=True)
    created_time = models.DateField(blank=True, null=True)
    modified_time = models.DateField(blank=True, null=True)
    execution_start_time = models.DateField(blank=True, null=True)
    execution_end_time = models.DateField(blank=True, null=True)
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
