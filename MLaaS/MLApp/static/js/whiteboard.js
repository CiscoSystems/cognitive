
var uploaded_file_as_text = "";

$(function(){
  
  // var detail = $(".detail_introduction");

  var svg = d3.selectAll("svg");
    // .call(make_x_axis()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat("")
    // )

    // svg.append("g")         
    //   .attr("class", "grid")
    //   .call(make_y_axis()
    //       .tickSize(-width, 0, 0)
    //       .tickFormat("")
    //   )



  var intro_clr     = "#ffeb3c";
  var input_clr     = "#009787";
  var transform_clr = "#ff9702";
  var metadata_clr  = "#f44236";
  var formula_clr   = "#3e51b5";
  var filter_clr    = "#009787";
  var ml_clr        = "#fe5721";
  var output_clr    = "#607d8b";

  // var uploaded_file_as_text = "";

// $(function(){
//   $('.placewise-nav-menu').click(function() {
//     $(".placewise-nav-flyout").css('left', 0);
//     $(".placewise-nav-flyout").animate(
//       {
//         width: 'toggle'
//       },
//       {
//         duration: 100
//       }
//     );
//   })
// })

  // $(".whiteboard-flyout").animate(
  //       {
  //         width: 'toggle'
  //       },
  //       {
  //         duration: 100
  //       }
  //     );




  function visualize_input_data() {
    // alert(uploaded_file_as_text);
  }

  var selected_menu;
  

  // $(".detail_introduction").toggle("slide", {direction: "left"}, 700);
  $(".detail_data_input").css("display", "none");
  $(".detail_transform").css("display", "none");
  $(".detail_metadata").css("display", "none");
  $(".detail_formula").css("display", "none");
  $(".detail_filter").css("display", "none");
  $(".detail_data_output").css("display", "none");
  
  
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
    $(".detail.introduction").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".introduction"), intro_clr);  
    $(".introduction").css("background-color", "#ffeb3c");
    detail.toggle();
    $(".detail_introduction").toggle("slide");
    detail = $(".detail_introduction");
  });

  
  $(".menu_bar.data_input").click(function(){
    $(".detail.data_input").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".data_input"), input_clr);
    detail.toggle();
    $(".detail_data_input").toggle("slide");
    
  });

  $(".menu_bar.add_row").click(function(){
    $(".detail.add_row").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".add_row"), transform_clr);
    detail.toggle();
    $(".detail_add_row").toggle("slide");
    detail = $(".detail_add_row");
  });
  $(".menu_bar.add_math_fomula").click(function(){
    $(".detail.add_math_fomula").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".add_math_fomula"), transform_clr);
    detail.toggle();
    $(".detail_add_row").toggle("slide");
    detail = $(".detail_add_row");
  });

  $(".menu_bar.projection").click(function(){
    $(".detail.projection").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".projection"), input_clr);
    detail.toggle();
    $(".detail_projection").toggle("slide");  
  });


  $(".menu_bar.normalization").click(function(){
    $(".detail.normalization").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".normalization"), input_clr);
    detail.toggle();
    $(".detail_normalization").toggle("slide");  
  });
  
  $(".menu_bar.transform").click(function(){
    $(".detail.transform").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".transform"), transform_clr);
    detail.toggle();
    $(".detail_transform").toggle("slide");
    detail = $(".detail_transform");
  });

  $(".menu_bar.metadata").click(function(){
    $(".detail.metadata").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".metadata"), metadata_clr);
    detail.toggle();
    $(".detail_metadata").toggle("slide");
    detail = $(".detail_metadata");
  });

  $(".menu_bar.formula").click(function(){
    $(".detail.formula").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".formula"), formula_clr);
    
    detail.toggle();
    $(".detail_formula").toggle("slide");
    detail = $(".detail_formula");
  });

  $(".menu_bar.filter").click(function(){
    $(".detail.filter").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".filter"), filter_clr);
    detail.toggle();
    $(".detail_filter").toggle("slide");
    detail = $(".detail_filter");
  });

  $(".menu_bar.machine_learning").click(function(){
    $(".detail.machine_learning").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".machine_learning"), ml_clr);
    detail.toggle();
    $(".detail_machine_learning").toggle("slide");
    detail = $(".detail_machine_learning");
  });

  $(".menu_bar.data_output").click(function(){
    $(".detail.data_output").toggle("slide", {direction: "left"}, 700);
    activate_menu_button($(".data_output"), output_clr);
    detail.toggle();
    $(".detail_data_output").toggle("slide");
    detail = $(".detail_data_output");
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

    } else if ($(this).hasClass('add_metadata')) {
      node = new Node({
        name:'METADATA',
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

    } else if ($(this).hasClass('add_normalization')) {
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

      cognitive_client.createNormalizationComponent(request_data);

    } else if ($(this).hasClass('add_projection')) {
      node = new Node({
        name:'Projection',
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

      cognitive_client.createComponent(request_data);

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
