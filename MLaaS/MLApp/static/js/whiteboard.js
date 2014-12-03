var _uploaded_file_as_text   = "";
var _uploaded_file_name      = "";
var _uploaded_file_as_arrays = [];
var _debug_tmp;

$(function(){
  
  var m = new Manager();
  var cognitive_client = new CognitiveAPIClientV1();
  
  var svg = d3.selectAll("svg");


  var projections = 0;
  $('.projection.plus-bottom').click(function(){

    var column_names = _uploaded_file_as_arrays[0];
    var option_string = "";
    for (var i=0; i < column_names.length; i++ ){
      option_string += '<option value="'+i+'">'+ column_names[i] +'</option>'
    }
    $('.form-group.projection_form').append('<select class="form-control projection_selects _selects_'+projections+'">'+option_string+'</select>');
    projections++;
  });

  var _num_remove_duplicates_column = 0;
  $('.remove_duplicates.plus-bottom').click(function(){

    var column_names = _uploaded_file_as_arrays[0];
    var option_string = "";
    for (var i=0; i < column_names.length; i++ ){
      option_string += '<option value="'+i+'">'+ column_names[i] +'</option>'
    }
    $('.form-group.remove_duplicates_form').append('<select class="form-control remove_duplicates_selects _selects_'+_num_remove_duplicates_column+'">'+option_string+'</select>');
    _num_remove_duplicates_column++;
  });


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
    description_formula();
  });

  $(".menu_bar.projection").click(function(){
    m.activate_menubar("projection");
  });


  $(".menu_bar.normalization").click(function(){
    m.activate_menubar("normalization");
    description_normalization();
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
    description_metadata();
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
  

  
  
  $(".add_btn").click(function(){
    var node;
    var response;

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

      console.log("add_row test");
      
      node = new Node({
        name:'Add Row',
        input: 1,
        output:1
      });

      var request_text = "";
      for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
        request_text += $(".add_row._column_" + i).val();
        if (i == _uploaded_file_as_arrays[0] - 2) {
          break;
        }
        request_text += ",";
      }

      request_text = request_text.slice(0, request_text.length-1) 
      console.log(request_text);

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

      var method   = $('select#formula_method').val();
      var column_num   = $('select#formula_column').val();
      var constant = $('#formula_constant').val();
      
      var t = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_type: "Column",
        component_id: column_num, // should be index number
        op_type: method, // or Sub, Mul, Div
        op_constant: constant
      };
      console.log(t);

      cognitive_client.createMathFormulaComponent(t, node);

    } else if ($(this).hasClass('add_normalization')) {
      
      node = new Node({
        name:'Normalization',
        input:1,
        output:1
      });

      var method   = $('select#normalization_method').val();
      var column_num   = $('select#normalization_column').val();

      cognitive_client.createNormalizationComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_type: "column",
        component_id: column_num,
        op_type: method
      }, node);

    } else if ($(this).hasClass('add_projection')) {
      
      node = new Node({
        name:'Column Selection',
        input:1,
        output:1
      });

      var len = $('.projection_selects').length;

      var projection_columns = "[";
      for (var i=0; i<len; i++) {
        console.log($('.projection_selects._selects_'+i).val());
        projection_columns += $('.projection_selects._selects_'+i).val() + ","
      }

      projection_columns = projection_columns.slice(0, projection_columns.length-1) 
      projection_columns += "]";
      // var names = $('#projection_text').val();
      // var indexes = names_to_ids(names);
      // console.log(indexes);

      cognitive_client.createProjectionComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_id: projection_columns
      }, node);

    } else if ($(this).hasClass('add_remove_duplicates')) {
      
      node = new Node({
        name:'- Column',
        input:1,
        output:1
      });

      var len = $('.remove_duplicates_selects').length;

      var remove_duplicates_columns = "[";
      for (var i=0; i<len; i++) {
        console.log($('.remove_duplicates_selects._selects_'+i).val());
        remove_duplicates_columns += $('.remove_duplicates_selects._selects_'+i).val() + ","
      }
      remove_duplicates_columns = remove_duplicates_columns.slice(0, remove_duplicates_columns.length-1) 
      remove_duplicates_columns += "]"

      console.log('=============');
      console.log(remove_duplicates_columns);


      cognitive_client.createRemoveDuplicatesComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_id: remove_duplicates_columns
      }, node);

    } else if ($(this).hasClass('add_remove_missing_value')) {
      
      node = new Node({
        name:'Remove Missing Values',
        input:1,
        output:1
      });

      // var names = $('#remove_missing_values_text').val();
      // var indexes = names_to_ids(names);
      // console.log(indexes);
      var method = $('#remove_missing_value_method').val();

      cognitive_client.createRemoveMissingValuesComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        op_action: method //"Replace_mean" or Drop_row
      }, node);

    } else if ($(this).hasClass('add_metadata')) {
      
      node = new Node({
        name:'MetaData',
        input:1,
        output:1
      });

      var types = "";
      for (var i = 0; i < _uploaded_file_as_arrays.length; i++){
        console.log($(".metadata .column"+i).val());
        types += $(".metadata .column"+i).val() + ",";
      }

      cognitive_client.createMetadataComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        column_type: types
      }, node);

    }  else if ($(this).hasClass('add_output')) {
      
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
        output:1
      });

      var argo = $('.machine_learning_select').val()

      console.log(argo);

      cognitive_client.createMachineLeaningComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        model_type: argo,
        train_data_percentage: 70,
        target_column: 1
      }, node);

    }
    // else if ($(this).hasClass('run')) {
      
    //   node = new Node({
    //     name:'Machine Learning',
    //     input:1,
    //     output:0
    //   });

    //   cognitive_client.run({
    //     user_id: 1,
    //     name: "sample_input.csv",
    //     token: "aaa",
    //     type: "css",
    //     experiment: 1,
    //     data: uploaded_file_as_text 
    //   }, node);

    // } 

    Node.appendToList(node);
  });

  $("#execute-btn").click(function(){
  
    console.log("aaaaa");

    var start = Node.find_by({name:"INPUT_DATA"});
    var node_list = Node.getWorkflowFrom(start.getId());
    
    if (node_list.length < 2) {
      alert("no workflow or input files");
      return ;
    }

    var components_id_list = node_list.map(function(n){
      return n.getComponentId();
    })

    console.log(components_id_list);
    // var flow_path = function(x){ 
    //   var l = [];
    //   for (var i =0; i < x.length-1; i++) {  
    //     var t = "";
    //     t += x[i]+":"+x[i+1];
    //     l.push(t);
    //   }
    //   console.log(l);
    //   return l;
    // }(components_id_list);

    var flow_path = function(x){ 
      var t = "";
      for (var i =0; i < x.length-1; i++) {  
        t += x[i]+":"+x[i+1] + ",";
      }
      return t.substr(0,t.length-1);
    }(components_id_list);

    console.log('------');
    console.log(flow_path);

    cognitive_client.executeAll({
      user_id: 1,
      experiment: 1,
      graph_data: flow_path
    });
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

    // $("<button/>", {
    //   "class": "btn btn-material-lightgreen show_result_graph",
    //   text: "Show",
    //   style:"float:right",
    //   href:"#result_table",
    //   click: getResult()
    // }).appendTo(".detail.data_input");
  });
 
 // $(".show_result_graph").colorbox({inline:true, width:"50%"});
 $(".show_result_graph").colorbox({inline:true, width:"50%"});    
 $(".show_result_graph").click(getResult);

 function getResult() {
    console.log("-------------------");
    var node = Node.getCurrentForcus();
    console.log(node);
    console.log("-------------------A");
    if (node == null) {return;}

    $.ajax({ 
      url:  '/api/v1/results/?experiment=1&component_id=' + node.component_id,
      type: "GET",
      data: "",
      success: function(result) { 
        console.log("aaaaaa");
        console.log(result);
        $('#result_table').empty();
        $('#result_table').append(result);
        adjust_result_table(result);
        $(".show_result_graph").colorbox({inline:true, width:"50%"});    
      }
    });
  }


});

function description_addrow() {
  $('.add_row_form').empty();
  _uploaded_file_as_arrays[0];
  console.log(_uploaded_file_as_arrays[0]);
  if (_uploaded_file_as_text == "") {return;}
  for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
  $(".add_row_form").append('<li class="add_row column_'+i+'" style="padding-top: 10px"></li>');
    $(".add_row_form li.column_"+i).append('<p>'+_uploaded_file_as_arrays[0][i]+'<p/>');
    $("<input/>", {
      "class": "form-control floating-label"+" _column_" + i,
      id: "_column_" + i,
      type:"text", 
      placeholder: "value",
    }).appendTo(".add_row_form li.column_"+i);  
  }
}

function description_formula() {
  $("#formula_column").empty(); 
  if (_uploaded_file_as_text == "") {return;}
  for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
    $("#formula_column").append('<option value="'+i+'">'+_uploaded_file_as_arrays[0][i]+'</option>');
  }
}
function description_normalization() {
  $("#normalization_column").empty(); 
  if (_uploaded_file_as_text == "") {return;}
  for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
    $("#normalization_column").append('<option value="'+i+'">'+_uploaded_file_as_arrays[0][i]+'</option>');
  }
}

function description_metadata() {
  $("#metadata_discriptions").empty(); 
  if (_uploaded_file_as_text == "") {return;}
  for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
    $("#metadata_discriptions").append('<div class="row meta_'+i+'" style="padding-top:25px;"></div>');
    $("#metadata_discriptions div.meta_"+i).append('<p>'+_uploaded_file_as_arrays[0][i]+'</p>');
    $("#metadata_discriptions div.meta_"+i)
      .append('<select class="form-control metadata column'+i+'" id="formula_method select"><option>string</option><option>integer</option><option>categorical</option></select>');
  }
}


function names_to_ids(names) {
  var parsed  = names.split(",");
  var indexes = "";
  console.log(parsed);
  for (var i =0; i < parsed.length; i++) {
    for (var j =0; j < _uploaded_file_as_arrays[0].length; j++) {
      if (parsed[i] == _uploaded_file_as_arrays[0][j])
        indexes += j + ",";
    }
  }
  return indexes;
}

function adjust_result_table(t) {
  $('#result_table').empty();
  $('#result_table').append('<table id="result_graph"></table>');
  for (var i = 0; i < t.length; i++) {
    $('#result_graph').append('<tr class="result_'+i+'"></tr>');
    for (var j = 0; j < t[i].length; j++) {
      $('tr.result_'+i).append('<th>'+t[i][j]+'</th>');
      console.log(t[i][j]);
    }
  }
}