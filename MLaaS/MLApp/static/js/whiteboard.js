var _uploaded_file_as_text   = "";
var _uploaded_file_name      = "";
var _uploaded_file_as_arrays = [];
var _debug_tmp;
$(function(){
  
  var m = new Manager();
  var cognitive_client = new CognitiveAPIClientV1();
  
  var svg = d3.selectAll("svg");


  $(".menu_bar.introduction").click(function(){
    m.activate_menubar('introduction');
  });
  
  $(".menu_bar.data_input").click(function(){
    m.activate_menubar('data_input');    
  });

  $(".menu_bar.add_row").click(function(){
    m.activate_menubar("add_row");
    description_addrow();
  });

  $(".menu_bar.add_math_fomula").click(function(){
    m.activate_menubar("add_math_fomula");
  });

  $(".menu_bar.projection").click(function(){
    m.activate_menubar("projection");
  });


  $(".menu_bar.normalization").click(function(){
    m.activate_menubar("normalization");
  });

  $(".menu_bar.remove_column").click(function(){
    m.activate_menubar("remove_column");
  });

  $(".menu_bar.remove_missing_value").click(function(){
    m.activate_menubar("remove_missing_value");
  });
  
  
  $(".menu_bar.transform").click(function(){
    m.activate_menubar("transform");
  });

  $(".menu_bar.metadata").click(function(){
    m.activate_menubar("metadata");
  });

  $(".menu_bar.formula").click(function(){
    m.activate_menubar("formula");
  });

  $(".menu_bar.filter").click(function(){
    m.activate_menubar("filter");
  });

  $(".menu_bar.machine_learning").click(function(){
    m.activate_menubar("machine_learning");
  });

  $(".menu_bar.data_output").click(function(){
    m.activate_menubar("data_output");    
  });
  
  var nodes = [];
  var response;

  $(".add_btn").click(function(){

    var node;
    if ($(this).hasClass('add_input')){

      node = new Node({
        name:'INPUT_DATA',
        output:1,
        input:0,
      });

      cognitive_client.createInputComponent({
        user_id: 1,
        input_file: _uploaded_file_name,
        token: "token",
        input_file_type: "csv",
        experiment: 1,
        data_values: _uploaded_file_as_text 
      }, node);
      
    } else if ($(this).hasClass('add_row')) {

      node = new Node({
        name:'+ Row',
        input: 1,
        output:1
      });

      var request_text = "";
      for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
        request_text += $("#_column_" + i).val();
        if (i == _uploaded_file_as_arrays[0] - 2) {
          break;
        }
        request_text += ",";
      }

      cognitive_client.createAddRowComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        row_values: request_text
      }, node);


    } else if ($(this).hasClass('add_math_fomula')) {
      
      node = new Node({
        name:'Apply Formula',
        input:1,
        output:1
      });

      cognitive_client.createMathFormulaComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_type: "column",
        component_id: 1, // should be index number
        op_type: "Add", // or Sub, Mul, Div
        op_constant: 10
      }, node);

    } else if ($(this).hasClass('add_normalization')) {
      
      node = new Node({
        name:'Normalization',
        input:1,
        output:1
      });

      cognitive_client.createNormalizationComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_type: "column",
        component_id: 1,
        op_type: "standard"
      }, node);

    } else if ($(this).hasClass('add_projection')) {
      
      node = new Node({
        name:'Projection',
        input:1,
        output:1
      });

      cognitive_client.createProjectionComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_id: "1,2,3"
      }, node);

    } else if ($(this).hasClass('add_remove_duplicates')) {
      
      node = new Node({
        name:'- Column',
        input:1,
        output:1
      });
      
      cognitive_client.createRemoveDuplicatesComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_id: "1,2,3"
      }, node);

    } else if ($(this).hasClass('add_remove_missing_value')) {
      
      node = new Node({
        name:'Remove Missing Values',
        input:1,
        output:1
      });

      cognitive_client.createRemoveMissingValuesComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        op_action: "Replace_mean" // or Drop_row
      }, node);

    } else if ($(this).hasClass('add_metadata')) {
      
      node = new Node({
        name:'MetaData',
        input:1,
        output:1
      });

      cognitive_client.createMetadataComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        column_type: "int,string,categorical"
      }, node);

    }  else if ($(this).hasClass('add_formula')) {
      
      node = new Node({
        name:'FORMULA',
        input:1,
        output:1
      });

      cognitive_client.createFormulaComponent({
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      }, node);

    } 
    // else if ($(this).hasClass('add_filtering')) {
      
    //   node = new Node({
    //     name:'FILTERING',
    //     input:1,
    //     outputs:1
    //   });

    //   cognitive_client.createFilteringComponent({
    //     user_id: 1,
    //     name: "sample_input.csv",
    //     token: "aaa",
    //     type: "css",
    //     experiment: 1,
    //     data: uploaded_file_as_text 
    //   }, node);

    // } 
      else if ($(this).hasClass('add_output')) {
      
      node = new Node({
        name:'OUTPUT',
        input:1,
        output:0
      });

      cognitive_client.createOutputComponent({
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      }, node);

    } else if ($(this).hasClass('add_machine_learning')) {
      
      node = new Node({
        name:'Machine Learning',
        input:1,
        output:0
      });

      cognitive_client.createMachineLearningComponent({
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      }, node);

    } else if ($(this).hasClass('run')) {
      
      node = new Node({
        name:'Machine Learning',
        input:1,
        output:0
      });

      cognitive_client.run({
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      }, node);

    }
  });


  $('#inputFile').change(function(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) { 
      _uploaded_file_as_text   = e.target.result;
      _uploaded_file_as_arrays = $.csv.toArrays(_uploaded_file_as_text);
    }
    reader.readAsText(file);

    _uploaded_file_name = file.name

    $("<button/>", {
      "class": "btn btn-material-lightgreen",
      text: "Show",
      style:"float:right",
      click: function() {
        alert(_uploaded_file_as_text);   
      }
    }).appendTo(".detail.data_input");
  });

});

function description_addrow() {
  _uploaded_file_as_arrays[0];
  console.log(_uploaded_file_as_arrays[0]);
  for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
    $(".add_row_form").append('<li class="column_'+i+'" style="padding-top: 10px"></li>');
    $(".add_row_form li.column_"+i).append('<p>'+_uploaded_file_as_arrays[0][i]+'<p/>');
    $("<input/>", {
      "class": "form-control floating-label"+" _column_" + i,
      id: "_column_" + i,
      type:"text", 
      placeholder: "value",
    }).appendTo(".add_row_form li.column_"+i);  
  }
}
