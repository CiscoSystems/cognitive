from django.db import models

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
    function_type = models.CharField(max_length=50) 
    created_time = models.DateField(blank=True, null=True)
    modified_time = models.DateField(blank=True, null=True)
    execution_start_time = models.DateField(blank=True, null=True)
    execution_end_time = models.DateField(blank=True, null=True)
    
