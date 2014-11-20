$(function(){
  var detail = $(".detail_introduction");

  $(".detail_introduction").toggle("slide", {direction: "left"}, 700);

  $(".detail_data_input").css("display", "none");
  $(".detail_transform").css("display", "none");
  $(".detail_metadata").css("display", "none");
  $(".detail_formula").css("display", "none");
  $(".detail_filter").css("display", "none");
  $(".detail_data_output").css("display", "none");  

  $(".introduction").click(function(){
    detail.toggle();
    $(".detail_introduction").toggle("slide");
    detail = $(".detail_introduction");
  });

  $(".data_input").click(function(){
    detail.toggle();
    $(".detail_data_input").toggle("slide");
    detail = $(".detail_data_input");
  });

  $(".transform").click(function(){

   $(".transform_category").toggle("slide", {direction: "left"}, 700);
    // detail.toggle();
    // $(".detail_transform").toggle("slide");
    // detail = $(".detail_transform");
  });

  $(".metadata").click(function(){
    detail.toggle();
    $(".detail_metadata").toggle("slide");
    detail = $(".detail_metadata");
  });

  $(".formula").click(function(){
    detail.toggle();
    $(".detail_formula").toggle("slide");
    detail = $(".detail_formula");
  });

  $(".filter").click(function(){
    detail.toggle();
    $(".detail_filter").toggle("slide");
    detail = $(".detail_filter");
  });

  $(".data_output").click(function(){
    detail.toggle();
    $(".detail_data_output").toggle("slide");
    detail = $(".detail_data_output");
  });
});
