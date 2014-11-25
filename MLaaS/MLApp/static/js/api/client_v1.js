var CognitiveAPIClientV1 = (function() {
  
  function CognitiveAPIClientV1(options) {
    this.prefix  = '/api/v1';  
  }

  return CognitiveAPIClientV1;
})();


function send_request(api_url, method, json_data) {
  $.ajax({ 
    url:  api_url,
    type: method,
    data: json_data,
    "success": function(result) { console.log(result); }
  });
};

CognitiveAPIClientV1.createInputComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/input/';
  send_request(api_url, "POST", json_data);
};


CognitiveAPIClientV1.prototype.createOutputComponent = function(json_data) {
  api_url = this.prefix + '/component/output'; 
};
CognitiveAPIClientV1.prototype.createTransformComponent = function(json_data) {
  api_url = this.prefix + '/component/transform'; 
};
CognitiveAPIClientV1.prototype.createMetadataComponent = function(json_data) {
  api_url = this.prefix + '/component/metadata'; 
};
CognitiveAPIClientV1.prototype.createMachineLeaningComponent = function(json_data) {
  api_url = this.prefix + '/component/machine_learning'; 
};
CognitiveAPIClientV1.prototype.createFormulaComponent = function(json_data) {
  api_url = this.prefix + '/component/formula'; 
};
CognitiveAPIClientV1.prototype.createFilterComponent = function(json_data) {
  api_url = this.prefix + '/component/filter'; 
};