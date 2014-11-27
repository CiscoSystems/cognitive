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
CognitiveAPIClientV1.createOutputComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/output/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createAddRowComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/row/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createMathFormulaComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/math_formula/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createMetadataComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/metadata/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createMachineLeaningComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/machine_learning/'; 
  send_request(api_url, "POST", json_data);
};
// CognitiveAPIClientV1.createMathFormulaComponent = function(json_data) {
//   this.prefix  = '/api/v1';  
//   api_url = this.prefix + '/operations/MathFormula'; 
//   send_request(api_url, "POST", json_data);
// };
CognitiveAPIClientV1.createNormalizationComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/normalization/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createProjectionComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/projection/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createRemoveDuplicateComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/remove_duplicate/'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createRemoveMissingValueComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/RemoveMissingValue'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createFilterComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/filter'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.run = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/filter'; 
  send_request(api_url, "POST", json_data);
};
CognitiveAPIClientV1.createComponent = function(json_data) {
  this.prefix  = '/api/v1';  
  api_url = this.prefix + '/operations/filter'; 
  send_request(api_url, "POST", json_data);
};