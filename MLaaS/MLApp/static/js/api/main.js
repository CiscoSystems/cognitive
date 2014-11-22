function CognitiveAPIClientV1(){
  thie.prefix  = '/api/v1';
}

function send_request(api_url, method, json_data) {
  $.ajax({ 
    url:  api_url,
    type: method,
    data: json_data,
    "success": function(result) { return result; }
  });
};

CognitiveAPIClientV1.prototype.createInputComponent = function(json_data) {
  api_url = this.prefix + '/component/input'; 
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