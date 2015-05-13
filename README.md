![Alt tag](/doc/img/cognitive-icon-small.png?raw=true "Cognitive Icon") Cognitive
=========

Machine Learning as a Service (MLaaS)

It is still in development. If you find any errors, please let us know.

<!--![Alt text](/doc/img/demo-login.png?raw=true "Cognitive Login")-->

![Alt text](/doc/img/demo-main.png?raw=true "Cognitive Workspace")

<!--![Alt text](/doc/img/demo-result.png?raw=true "Cognitive Result")-->

Installation
------------

Install all python packages listed in requirements file. Start your Django server(Optionally using a public ip).  It is advised to use virtualenv to isolate other python environments.

        virtualenv venv
        source venv/bin/activate
        pip install -r requirements.txt
        python manage.py syncdb
        python manage.py runserver <optional IP:PORT>

Now, UI can be accessed at the specified IP:port. If nothing is specified, UI is started at http://127.0.0.1:8000

Usage
-----

1.  Add CSV input data
         
      Only file format that is supported from UI is '.csv'.  You can use Titanic dataset csv file in the 'tmp' folder. 
      All column names must be visible after you add input data.  

2. You can add any operation from the left pane and apply it on the input data. The sequence of execution is determined by the workflow graph displayed on the right pane. Create links between components to show the relationship.

      a) You can create a link between two components by 'drag and drop'.

      b) Click “Run” if you add a new component. This registers the new component and adds it to your saved workflow. Or in other words, you won't see the effect unless you click 'Run' after adding the new component. 

      c) You can select any component and click "Show" to view the transformed data till that stage. If you have added a new component, you have to click 'Run' to save it first and then click 'show' to view changes.


3. Once data is completely clean, apply ML algorithm by choosing the classifier and the target column. You have to also specify the split percentage (the ratio of 'training data size' to 'test data size').

              
Upcoming features
----------------

1.  Validations are missing in UI. 
    
        eg: Applying mathematical operations on  non numerical columns
            Applying operations on columns that are non-existent. (Once 'Column selection' feature is applied to project lesser number of columns, un-selected columns cannot be used in any of the future operations)
            Applying ML algorithm on an input that has some missing entries
            Applying ML algorithm on an input that has non-numerical values

2. Run the topology in remote storm cluster for parallelizing heavy jobs.
3. Error reporting is missing in UI. It will not display any result if the user creates a component with wrong parameters. Please check console for errors.

API Documentation
-----------------

Swagger API Documentation is available via `http://127.0.0.1:8000/docs` after launchnig Django server.

