
var uploaded_file_as_text = "";

$(function(){
  
  var detail = $(".detail_introduction");

  var intro_clr     = "#ffeb3c";
  var input_clr     = "#009787";
  var transform_clr = "#ff9702";
  var metadata_clr  = "#f44236";
  var formula_clr   = "#3e51b5";
  var filter_clr    = "#009787";
  var ml_clr        = "#fe5721";
  var output_clr    = "#607d8b";

  // var uploaded_file_as_text = "";

  function visualize_input_data() {
    alert(uploaded_file_as_text);
  }

  var selected_menu;
  function activate_menu_button(elm, background_color){
    // elm.animate({"box-shadow":"0 6px 10px rgba(0,0,0,.23),0 10px 30px rgba(0,0,0,.19)"});
    if (selected_menu != null) {
      selected_menu.css("box-shadow","");
      selected_menu.css("background-color", "#eeeeee");
    }
    elm.css("box-shadow", "0 6px 10px rgba(0,0,0,.23),0 10px 30px rgba(0,0,0,.19)");
    elm.css("background-color", background_color);
    selected_menu = elm
  } 

  $(".detail_introduction").toggle("slide", {direction: "left"}, 700);
  $(".detail_data_input").css("display", "none");
  $(".detail_transform").css("display", "none");
  $(".detail_metadata").css("display", "none");
  $(".detail_formula").css("display", "none");
  $(".detail_filter").css("display", "none");
  $(".detail_data_output").css("display", "none");
  
  
  $(".introduction").css("background-color", "#ffeb3c");
  activate_menu_button($(".introduction"), "#ffeb3c");

  
  $(".introduction").on("mouseenter", "", function(evt){
    $(".introduction").css("background-color", intro_clr)
  }).on("mouseleave","", function(evt){
    // console.log(selected_menu);
    // console.log($(".introduction"));
    // console.log($(".introduction").attr('class') === $(".introduction").attr('class'))
    if ($(".introduction").attr('class') != $(".introduction").attr('class')) { $(".introduction").css("background-color", intro_clr) }
  })
    // function(){ $(".introduction").css("background-color", intro_clr)},
    // function(){})

  $(".introduction").click(function(){
    activate_menu_button($(".introduction"), intro_clr);  
    $(".introduction").css("background-color", "#ffeb3c");
    detail.toggle();
    $(".detail_introduction").toggle("slide");
    detail = $(".detail_introduction");
  });

  
  $(".data_input").hover(
    function(){ $(".data_input").css("background-color", input_clr)},
    function(){ $(".data_input").css("background-color", "#eeeeee")})
  $(".data_input").click(function(){
    activate_menu_button($(".data_input"), input_clr);
    detail.toggle();
    $(".detail_data_input").toggle("slide");
    detail = $(".detail_data_input");
  });

  $(".transform").hover(
    function(){ $(".transform").css("background-color", transform_clr)},
    function(){ $(".transform").css("background-color", "#eeeeee")})
  $(".transform").click(function(){
    activate_menu_button($(".transform"), transform_clr);
    detail.toggle();
    $(".detail_transform").toggle("slide");
    detail = $(".detail_transform");
  });

  $(".metadata").hover(
    function(){ $(".metadata").css("background-color", metadata_clr)},
    function(){ $(".metadata").css("background-color", "#eeeeee")})
  $(".metadata").click(function(){
    activate_menu_button($(".metadata"), metadata_clr);
    detail.toggle();
    $(".detail_metadata").toggle("slide");
    detail = $(".detail_metadata");
  });

  $(".formula").hover(
    function(){ $(".formula").css("background-color", formula_clr)},
    function(){ $(".formula").css("background-color", "#eeeeee")})
  $(".formula").click(function(){
    activate_menu_button($(".formula"), formula_clr);
    
    detail.toggle();
    $(".detail_formula").toggle("slide");
    detail = $(".detail_formula");
  });

  $(".filter").hover(
    function(){ $(".filter").css("background-color", filter_clr)},
    function(){ $(".filter").css("background-color", "#eeeeee")})
  $(".filter").click(function(){
    activate_menu_button($(".filter"), filter_clr);
    detail.toggle();
    $(".detail_filter").toggle("slide");
    detail = $(".detail_filter");
  });

  $(".machine_learning").hover(
    function(){ $(".machine_learning").css("background-color", ml_clr)},
    function(){ $(".machine_learning").css("background-color", "#eeeeee")})
  $(".machine_learning").click(function(){
    activate_menu_button($(".machine_learning"), ml_clr);
    detail.toggle();
    $(".detail_machine_learning").toggle("slide");
    detail = $(".detail_machine_learning");
  });

  $(".data_output").hover(
    function(){ $(".data_output").css("background-color", output_clr)},
    function(){ $(".data_output").css("background-color", "#eeeeee")})
  $(".data_output").click(function(){
    activate_menu_button($(".data_output"), output_clr);
    detail.toggle();
    $(".detail_data_output").toggle("slide");
    detail = $(".detail_data_output");
  });

  function handleFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object
    
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
