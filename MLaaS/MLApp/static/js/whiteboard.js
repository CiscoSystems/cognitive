
var uploaded_file_as_text = "";

var Manager = (function(){
    
  function Manager(param){
    this._active_menu = null;
  }

  function activate_menubar(elm){
    menubar     = $('li.'+elm)
    description = $('.detail.'+elm)

    menubar
      .css("background-color", "#1e8cff")
      .css("color", "white");

    description.toggle("slide", {direction: "left"}, 700);

    if (this._active_menu == null) {
      this._active_menu = elm;
      return(menubar.addClass("active"));
    } 

    if (this._active_menu == elm) {
      if (menubar.hasClass("active")) {
        this._active_menu = null;
        return menubar
                  .css("background-color", "")
                  .css("color", "")
                  .removeClass("active");
      }
    }

    previous_menubar     = $('li.'+ this._active_menu)
    previous_description = $('.detail.'+ this._active_menu)

    previous_description.toggle("slide");
    previous_menubar
      .css("background-color", "")
      .css("color", "")
      .removeClass("active");

    this._active_menu = elm;
    
    return(menubar.addClass("active"));
  }

  Manager.prototype = {
    constructor: Manager,
    activate_menubar: activate_menubar
  };

  return Manager;

})();


$(function(){
  
  var m = new Manager();
  var svg = d3.selectAll("svg");

  function visualize_input_data() {
    // alert(uploaded_file_as_text);
  }

  // $(".detail_introduction").toggle("slide", {direction: "left"}, 700);
  
  // $(".introduction").css("background-color", "#ffeb3c");
  // activate_menu_button($(".introduction"), "#ffeb3c");

  
  // $(".introduction").on("mouseenter", "", function(evt){
  //   $(".introduction").css("background-color", intro_clr)
  // }).on("mouseleave","", function(evt){
    // console.log(selected_menu);
    // console.log($(".introduction"));
    // console.log($(".introduction").attr('class') === $(".introduction").attr('class'))
  //   if ($(".introduction").attr('class') != $(".introduction").attr('class')) { $(".introduction").css("background-color", intro_clr) }
  // })
    // function(){ $(".introduction").css("background-color", intro_clr)},
    // function(){})

  $(".menu_bar.introduction").click(function(){
    m.activate_menubar('introduction');
  });
  
  $(".menu_bar.data_input").click(function(){
    m.activate_menubar('data_input');    
  });

  $(".menu_bar.add_row").click(function(){
    m.activate_menubar("add_row");
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

  function handleFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object
    
    console("--------------")
    console.log(file);
    console.log(file.type);
    
    var reader = new FileReader();
    
    reader.onload = function(e) { 
      uploaded_file_as_text = e.target.result; 
    }
    
    reader.readAsText(file)

    $("<button/>", {
      "class": "btn btn-material-lightgreen",
      text: "Show",
      style:"float:right",
      click: visualize_input_data
    }).appendTo(".detail_data_input");

  }

  document.getElementById('inputFile').addEventListener('change', handleFileSelect, false);


  // -----------------------------
  // Following lines are divided finaly because of readability reason.
  // -----------------------------


    var dataset = [ 5, 10, 15, 20, 25 ];
  var nodes = [];

  cognitive_client = CognitiveAPIClientV1;
  
  var last_clicked_elm = null;
  var group_id = 1;  

  // node = new Node({
  //   name: 'aaaa',
  //   inputs: 1,
  //   outputs: 1
  // });


  // node = new Node({
  //   name: 'bbb',
  //   inputs: 1,
  //   outputs: 1
  // });

  
  $(".add_btn").click(function(){

    var node;
    if ($(this).hasClass('add_input')){
      
      node = new Node({
        name:'INPUT_DATA',
        outputs:1,
        inputs:0
      });
      
      request_data = {
        user_id: 1,
        input_file: "sample_input.csv",
        token: "aaa",
        input_file_type: "csv",
        experiment: 1,
        data_values: uploaded_file_as_text 
      };

      cognitive_client.createInputComponent(request_data);

    } else if ($(this).hasClass('add_row')) {
      node = new Node({
        name:'+ Row',
        input: 1,
        output:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        row_values: '1,"aaa",12,"csacsadcsa"'
      };

      cognitive_client.createAddRowComponent(request_data);


    } else if ($(this).hasClass('add_math_fomula')) {
      node = new Node({
        name:'Apply Formula',
        input:1,
        outputs:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_type: "column",
        component_id: 1, // should be index number
        op_type: "Add", // or Sub, Mul, Div
        op_constant: 10
      };

      cognitive_client.createMathFormulaComponent(request_data);

    } else if ($(this).hasClass('add_normalization')) {
      node = new Node({
        name:'Normalization',
        input:1,
        output:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_type: "column",
        component_id: 1,
        op_type: "standard"
      };

      cognitive_client.createNormalizationComponent(request_data);

    } else if ($(this).hasClass('add_projection')) {
      node = new Node({
        name:'Projection',
        input:1,
        output:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_id: "1,2,3"
      };

      cognitive_client.createProjectionComponent(request_data);

    } else if ($(this).hasClass('add_remove_duplicates')) {
      
      node = new Node({
        name:'- Column',
        input:1,
        output:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        component_id: "1,2,3"
      };

      cognitive_client.createRemoveDuplicatesComponent(request_data);

    } else if ($(this).hasClass('add_remove_missing_value')) {
      node = new Node({
        name:'Remove Missing Values',
        input:1,
        outputs:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        op_action: "Replace_mean" // or Drop_row
      };

      cognitive_client.createRemoveMissingValuesComponent(request_data);

    } else if ($(this).hasClass('add_metadata')) {
      node = new Node({
        name:'MetaData',
        input:1,
        outputs:1
      });

      request_data = {
        user_id: 1,
        token: "aaa",
        experiment: 1,
        column_type: "int,string,categorical"
      };

      cognitive_client.createMetadataComponent(request_data);

    }  else if ($(this).hasClass('add_formula')) {
      node = new Node({
        name:'FORMULA',
        input:1,
        outputs:1
      });

      request_data = {
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      };

      cognitive_client.createFormulaComponent(request_data);

    } else if ($(this).hasClass('add_filtering')) {
      node = new Node({
        name:'FILTERING',
        input:1,
        outputs:1
      });

      request_data = {
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      };

      cognitive_client.createFilteringComponent(request_data);

    } else if ($(this).hasClass('add_output')) {
      node = new Node({
        name:'OUTPUT',
        input:1,
        output:0
      });

      request_data = {
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      };

      cognitive_client.createOutputComponent(request_data);

    } else if ($(this).hasClass('add_machine_learning')) {
      
      node = new Node({
        name:'Machine Learning',
        input:1,
        output:0
      });

      request_data = {
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      };

      cognitive_client.createMachineLearningComponent(request_data);

    } else if ($(this).hasClass('run')) {
      node = new Node({
        name:'Machine Learning',
        input:1,
        output:0
      });

      request_data = {
        user_id: 1,
        name: "sample_input.csv",
        token: "aaa",
        type: "css",
        experiment: 1,
        data: uploaded_file_as_text 
      };

      cognitive_client.run(request_data);

    }
  });














  // $('#inputFile').change(function() {
  //   // upload csv file
    
  //   console.log("aaaaa");
  //   var csv_file = new FormData($('#inputFile'));
  //   console.log(csv_file);
  //   var reader = new FileReader();
  //   reader.readAsText(csv_file);
  //   reader.onload = function(event) {
  //     var csvData = event.target.result;
  //     data = $.csv.toArrays(csvData);
  //     if (data && data.length > 0) {
  //       alert('Imported -' + data.length + '- rows successfully!');
  //     } else {
  //       alert('No data to import!');
  //     }
  //   };
  //   reader.onerror = function() {
  //     alert('Unable to read ' + file.fileName);
  //   };
  // });
});
