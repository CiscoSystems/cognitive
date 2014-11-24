from django.db import models
from treebeard.mp_tree import MP_Node

class Category(MP_Node):
    id_val = models.IntegerField()
    node_order_by = ['id_val']

    def __unicode__(self):
        return 'Category: %d' % self.id_val


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
    )

    FUNCTION_SUBTYPE = (
        ('Add', 'Add operation'),
        ('Sub', 'Sub operation'),
        ('Mult', 'Mult operation'),
        ('Div', 'Div operation'),
        ('Normalize', 'Normalization operation'),
        ('Project' , 'Project certain columns'),
        ('RemoveDup', 'Remove duplicates'),
        ('RemoveMissing', 'Remove missing'),
        ('Metadata', 'Metadata editor'),
    )

    function_type = models.CharField(max_length=50,choices=FUNCTION_TYPE)
    function_arg = models.CharField(max_length=50,choices=FUNCTION_ARG, default='Table')
    function_arg_id = models.CharField(max_length=50)
    function_subtype = models.CharField(max_length=50,choices=FUNCTION_SUBTYPE)
    function_subtype_arg = models.CharField(max_length=50)
    
    def __str__(self):
        return self.function_type + " " + self.function_arg + " " + self.function_arg_id + \
                 " " +  self.function_subtype + " " + self.function_subtype_arg
    
class User(models.Model):
    username = models.CharField(max_length=50)
    full_name = models.CharField(max_length=50)
    
    def __str__(self): 
        return self.username
 
class Experiment(models.Model):
    EXPERIMENT_STATUS = (
        ('Draft',' Saved as draft'),
        ('InComplete','More information required'),
        ('InExecution','Execution started'),
        ('Error',' Error when executed'),
        ('Completed','Executed Successfully'),
    )
    user = models.ForeignKey(User)
    name = models.CharField(max_length=50)
    creator = models.CharField(max_length=50)
    status = models.CharField(max_length=50,choices=EXPERIMENT_STATUS, default= 'Draft')
    created_time = models.DateField(blank=True, null=True)
    modified_time = models.DateField(blank=True, null=True)
    execution_start_time = models.DateField(blank=True, null=True)
    execution_end_time = models.DateField(blank=True, null=True)
    component_start_id = models.IntegerField(blank=True, null=True)
    
class Component(models.Model):
    COMPONENT_STATUS = (
        ('Draft',' Saved as draft'),
        ('InComplete','More information required'),
        ('InExecution','Execution started'),
        ('Error',' Error when executed'),
        ('Completed','Executed Successfully'),
    )
    
    experiment = models.ForeignKey(Experiment)
    status = models.CharField(max_length=50,choices=COMPONENT_STATUS,default= 'Draft')
    operation_type = models.OneToOneField(Data_operation_type, blank=True, null=True)
    created_time = models.DateField(blank=True, null=True)
    modified_time = models.DateField(blank=True, null=True)
    execution_start_time = models.DateField(blank=True, null=True)
    execution_end_time = models.DateField(blank=True, null=True)
    data_location = models.CharField(max_length=50, blank=True, null=True)
    preferred_data_location = models.CharField(max_length=50, blank=True, null=True)
    component_id = models.IntegerField(blank=True, null=True)
   
 
   
