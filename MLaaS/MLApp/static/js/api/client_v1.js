var CognitiveAPIClientV1 = (function() {

  function CognitiveAPIClientV1(options) {
    this.prefix  = '/api/v1';  
  }
  
  function _send_request(api_url, method, json_data, node) {
    $.ajax({ 
      url:  api_url,
      type: method,
      data: json_data,
      success: function(result) { 
        console.log(result);
        if (node != null){
          node.setComponentId(result.id);
        }
      }
    });
  };

  function createInputComponent(json_data, node) {
    api_url = this.prefix + '/operations/input/';
    _send_request(api_url, "POST", json_data, node);
  };

  function createOutputComponent(json_data, node) {
    api_url = this.prefix + '/operations/output/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createAddRowComponent(json_data, node) {
    api_url = this.prefix + '/operations/row/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createMathFormulaComponent(json_data, node) {
    api_url = this.prefix + '/operations/math_formula/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createMetadataComponent(json_data, node) {
    api_url = this.prefix + '/operations/metadata/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createMachineLeaningComponent(json_data, node) {
    api_url = this.prefix + '/operations/machine_learning/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createNormalizationComponent(json_data, node) {
    api_url = this.prefix + '/operations/normalization/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createRemoveDuplicatesComponent(json_data, node) {
    api_url = this.prefix + '/operations/remove_duplicates/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createRemoveMissingValueComponent(json_data, node) {
    api_url = this.prefix + '/operations/RemoveMissingValue'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createFilterComponent(json_data, node) {
    api_url = this.prefix + '/operations/filter'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createRemoveMissingValuesComponent(json_data, node) {
    api_url = this.prefix + '/operations/remove_missing/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function run(json_data, node) {
    api_url = this.prefix + '/operations/filter'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function createProjectionComponent(json_data, node) {
    api_url = this.prefix + '/operations/projection/'; 
    _send_request(api_url, "POST", json_data, node);
  };

  function executeAll(json_data) {
    api_url = this.prefix + '/workflows/'; 
    _send_request(api_url, "POST", json_data, null);
  };


  CognitiveAPIClientV1.prototype = {
    constructor: CognitiveAPIClientV1,
    createInputComponent: createInputComponent,
    createOutputComponent: createOutputComponent,
    createAddRowComponent: createAddRowComponent,
    createMathFormulaComponent: createMathFormulaComponent,
    createMetadataComponent: createMetadataComponent,
    createMachineLeaningComponent: createMachineLeaningComponent,
    createNormalizationComponent: createNormalizationComponent,
    createRemoveDuplicatesComponent: createRemoveDuplicatesComponent,
    createRemoveMissingValueComponent: createRemoveMissingValueComponent,
    createFilterComponent: createFilterComponent,
    createRemoveMissingValuesComponent: createRemoveMissingValuesComponent,
    createProjectionComponent: createProjectionComponent,
    executeAll: executeAll
  };

  return CognitiveAPIClientV1;

})();