var _uploaded_file_as_text   = "";
var _uploaded_file_name      = "";
var _uploaded_file_as_arrays = [];
var _debug_tmp;

$(function(){
  
  var m = new Manager();
  var cognitive_client = new CognitiveAPIClientV1();
  
  var svg = d3.selectAll("svg");

  
  $('.projection.plus-bottom').click(add_column_for_projection);

  var projections = 0;
  function add_column_for_projection(){
    if (_uploaded_file_as_text == ""){return;}
    var column_names = _uploaded_file_as_arrays[0];
    var option_string = "";
    for (var i=0; i < column_names.length; i++ ){
      option_string += '<option value="'+i+'">'+ column_names[i] +'</option>'
    }
    $('.form-group.projection_form').append('<select class="form-control projection_selects _selects_'+projections+'">'+option_string+'</select>');
    projections++;
  };
  function initializa_projection_column() {
    $('.form-group.projection_form').empty();
    projections = 0;
  }

  $('.remove_duplicates.plus-bottom').click(add_column_for_remove_duplicates);

  var _num_remove_duplicates_column = 0;
  function add_column_for_remove_duplicates(){
    if (_uploaded_file_as_text == ""){return;}
    var column_names = _uploaded_file_as_arrays[0];
    var option_string = "";
    for (var i=0; i < column_names.length; i++ ){
      option_string += '<option value="'+i+'">'+ column_names[i] +'</option>'
    }
    $('.form-group.remove_duplicates_form').append('<select class="form-control remove_duplicates_selects _selects_'+_num_remove_duplicates_column+'">'+option_string+'</select>');
    _num_remove_duplicates_column++;
  };
  function initializa_remove_duplicates_column() {
    $('.form-group.remove_duplicates_form').empty();
    _num_remove_duplicates_column = 0;
  }


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
    initializa_projection_column();
    add_column_for_projection();
  });


  $(".menu_bar.normalization").click(function(){
    m.activate_menubar("normalization");
    description_normalization();
  });

  $(".menu_bar.remove_column").click(function(){
    m.activate_menubar("remove_column");
    initializa_remove_duplicates_column();
    add_column_for_remove_duplicates();
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
    description_machine_learning();
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

      var request_text = "[";
      for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
        request_text += "\"" + $(".add_row._column_" + i).val() + "\",";
      }

      request_text = request_text.slice(0, request_text.length-1) 
      request_text += "]"
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
        component_type: "Column",
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

      var metadata_types = "[";
      for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++){
        console.log($(".metadata.column"+i).val());
        metadata_types += "\"" + $(".metadata.column"+i).val() + "\",";
      }
      metadata_types = metadata_types.slice(0, metadata_types.length-1);
      metadata_types += "]";
      console.log(metadata_types);

      cognitive_client.createMetadataComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        column_type: metadata_types
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

      var argo = $('.machine_learning_select').val();
      var target = $('.machine_learning_target').val();
      var parcentage = $('.machine_learning_target_parcentage').val();

      console.log(argo);

      cognitive_client.createMachineLeaningComponent({
        user_id: 1,
        token: "aaa",
        experiment: 1,
        model_type: argo,
        train_data_percentage: parcentage,
        target_column: target
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

  });
 
 // $(".show_result_graph").colorbox({inline:true, width:"50%"});
 // $(".show_result_graph").colorbox({inline:true, width:"50%"});
 $(".show_result_graph").click(getResult);

 function getResult() {
    console.log("-------------------");
    var node = Node.getCurrentForcus();
    console.log(node);

    if (node == null) {return;}
    console.log("-------------------A");
    $.ajax({ 
      url:  '/api/v1/results/?experiment=1&component_id=' + node.component_id,
      type: "GET",
      data: "",
      success: function(result) { 

        console.log(result);
        var z = serialize_result_to_html(result);

        a = result;
        $.colorbox({html:"<h1><i class='fa.fa-bar-chart'></i> Results</h1><p>"+z+"</p>", width: "90%"});

        render_result_graphs(result);
      }
    });
  }

  
  function render_result_graphs(result) {

    var w = 100;
    var h = 100;
    
    for (var i=0; i < result['feature_names'].length; i++ ){
      var target_area = d3.select("svg[class='graph column_"+i+"']");
      var dataset = result.graph_data[i][1]

      if (d3.max(dataset) == d3.min(dataset)) {
        dataset = [100,100,100,100];        
      }
      console.log(dataset.length);
      for (var j=0; j < dataset.length; j++) {
        console.log("test");
        if (dataset[j] >= 96) {
          dataset[j] -= 4;
        }
      }
      if (dataset.length == 3){
        dataset.push(0);
      } else if (dataset.length == 2) {
        var _t = [0];
        _t.push(dataset[0]);
        _t.push(0);
        _t.push(dataset[1]);
        dataset = _t;
      } else if (dataset.length == 1) {
        var _t = [0];
        _t.push(dataset[0]);
        _t.push(0)
        _t.push(0)
        dataset = _t;
      }

      // var xAxis = d3.svg.axis();
      // var yScale = d3.scale.linear()
      //       .domain([0, d3.max(dataset)])
      //       .range([0, 100]);


      var svg = d3.select("svg[class='graph column_"+i+"']");

      svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", function(d,i){ return i * 22 + 7; })
         .attr("y", function(d){ return h - d; })
         .attr('class', 'bar')
         .attr('height', function(d){ return d -4; })
         .attr("width", (w/dataset.length - 6));

      svg.append('rect')
        .attr("x", 3)
        .attr("y", 3)
        .attr('width',  w - 6 )
        .attr('height', h - 6 )
        .attr('stroke', "black" )
        .attr('fill', 'none')
        .attr('stroke-width', "1" )
    }

  }

  function serialize_result_to_html(result) {
    
    var _html ="<table class='result_table'>"


    _html +="<tr><th></th>"
    
    for (var i=0; i < result['feature_names'].length; i++ ){
      _html += "<th><svg class='graph column_"+i+"'></svg></th>"
    }
    _html +="</tr>"

    _html += '<tr class="metrics">'    
    _html +="<th>metrics name</th>"
    for (var i=0; i < result['feature_names'].length; i++ ){
      _html += "<th>" + result['feature_names'][i] + "</th>"
    }
    _html += "</tr>"

    _html += "<tr class='result_row'>"
    _html +="<th>standard deviation</th>"
    for (var i=0; i < result['std'].length; i++ ){
      _html += "<th>" + result['std'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"
    
    _html +="<th>75_quartile</th>"
    for (var i=0; i < result['75_quartile'].length; i++ ){
      _html += "<th>" + result['75_quartile'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"
    
    _html +="<th>50_quartile</th>"
    for (var i=0; i < result['50_quartile'].length; i++ ){
      _html += "<th>" + result['50_quartile'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>25_quartile</th>"
    for (var i=0; i < result['25_quartile'].length; i++ ){
      _html += "<th>" + result['25_quartile'][i] + "</th>"
    }
    _html += "</tr>"

    _html += "<tr class='metrics'>"

    _html +="<th>metrics name</th>"
    for (var i=0; i < result['feature_names'].length; i++ ){
      _html += "<th>" + result['feature_names'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>max</th>"
    for (var i=0; i < result['max'].length; i++ ){
      _html += "<th>" + result['max'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>mean</th>"
    for (var i=0; i < result['mean'].length; i++ ){
      _html += "<th>" + result['mean'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>median</th>"
    for (var i=0; i < result['median'].length; i++ ){
      _html += "<th>" + result['median'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>min</th>"
    for (var i=0; i < result['min'].length; i++ ){
      _html += "<th>" + result['min'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>missing_values</th>"
    for (var i=0; i < result['missing_values'].length; i++ ){
      _html += "<th>" + result['missing_values'][i] + "</th>"
    }
    _html += "</tr><tr class='result_row'>"

    _html +="<th>unique_values</th>"
    for (var i=0; i < result['unique_values'].length; i++ ){
      _html += "<th>" + result['unique_values'][i] + "</th>"
    }
    
    _html += "</tr><tr class='metrics'><td>metrics name</td>"
    for (var i=0; i < result['feature_names'].length; i++ ){
      _html += "<th>" + result['feature_names'][i] + "</th>"
    }
    _html += "</tr>"

    for (var i=0; i < result['data'].length; i++ ){
      _html +="<tr class='result_row'><th></th>"
      for (var j=0; j < result['data'][i].length; j++ ){
        _html += "<th>" + result['data'][i][j] + "</th>"
      }
      _html +="</tr>"
    }
    _html += "</table>"

    return _html;
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
      "class": "add_row form-control floating-label"+" _column_" + i,
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
function description_machine_learning() {
  $('.machine_learning_target').empty(); 
  if (_uploaded_file_as_text == "") {return;}
  for (var i =0; i < _uploaded_file_as_arrays[0].length; i++) {
    $('.machine_learning_target').append('<option value="'+i+'">'+_uploaded_file_as_arrays[0][i]+'</option>');
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
