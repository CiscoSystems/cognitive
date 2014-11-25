$(function(){
  var dataset = [ 5, 10, 15, 20, 25 ];
  var nodes = [];
  
  var last_clicked_elm = null;
  var group_id = 1;  

  node = new Node({
    name: 'aaaa',
    inputs: 1,
    outputs: 1
  });

  
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
        token: "aaa",
        experiment_id: 1,
        type: "css",
        data: [["1","2","3"],["4","5","6"]]
      };

    } else if ($(this).hasClass('add_transform')) {
      node = new Node({
        name:'TRANSFORM',
        input: 1,
        output:1
      });

    } else if ($(this).hasClass('add_metadata')) {
      node = new Node({
        name:'METADATA',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_transform')) {
      node = new Node({
        name:'TRANSFORM',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_formula')) {
      node = new Node({
        name:'FORMULA',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_filtering')) {
      node = new Node({
        name:'FILTERING',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_output')) {
      node = new Node({
        name:'OUTPUT',
        input:1,
        output:0
      });
    } else if ($(this).hasClass('add_machine_learning')) {
      node = new Node({
        name:'Machine Learning',
        input:1,
        output:0
      });
    } 
  });
})


