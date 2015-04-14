var CognitiveAPIClientV1 = (function() {

    /*
     * TODO: will separate cognitive specific function and others
     * for ex: run function is kept here
     *         input/delete * component will be separated
     *         like plugin.
     */

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
                a = node;
                if (node !== null){ node.set_backend_id(result.id);}
            }
        });
    };

    function createInputComponent(json_data, node) {
        api_url = this.prefix + '/operations/input/';
        _send_request(api_url, "POST", json_data, node);
    };


    function deleteInputComponent(id) {
        api_url = this.prefix + '/operations/input/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createOutputComponent(json_data, node) {
        api_url = this.prefix + '/operations/output/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteOutputComponent(id) {
        api_url = this.prefix + '/operations/output/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createAddRowComponent(json_data, node) {
        api_url = this.prefix + '/operations/row/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteAddRowComponent(id) {
        api_url = this.prefix + '/operations/row/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createMathFormulaComponent(json_data, node) {
        api_url = this.prefix + '/operations/math_formula/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteMathFormulaComponent(id) {
        api_url = this.prefix + '/operations/math_formula/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createMetadataComponent(json_data, node) {
        api_url = this.prefix + '/operations/metadata/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteMetadataComponent(id) {
        api_url = this.prefix + '/operations/metadata/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createMachineLeaningComponent(json_data, node) {
        api_url = this.prefix + '/operations/machine_learning/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteMachineLeaningComponent(id) {
        api_url = this.prefix + '/operations/machine_learning/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createNormalizationComponent(json_data, node) {
        api_url = this.prefix + '/operations/normalization/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteNormalizationComponent(id) {
        api_url = this.prefix + '/operations/normalization/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createRemoveDuplicatesComponent(json_data, node) {
        api_url = this.prefix + '/operations/remove_duplicates/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteRemoveDuplicatesComponent(id) {
        api_url = this.prefix + '/operations/remove_duplicates/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createRemoveMissingValueComponent(json_data, node) {
        api_url = this.prefix + '/operations/RemoveMissingValue';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteRemoveMissingValueComponent(id) {
        api_url = this.prefix + '/operations/RemoveMissingValue/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createFilterComponent(json_data, node) {
        api_url = this.prefix + '/operations/filter';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteFilterComponent(id) {
        api_url = this.prefix + '/operations/filter/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createRemoveMissingValuesComponent(json_data, node) {
        api_url = this.prefix + '/operations/remove_missing/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteRemoveMissingValuesComponent(id) {
        api_url = this.prefix + '/operations/remove_missing/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function run(json_data, node) {
        api_url = this.prefix + '/operations/filter';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteOutputComponent(id) {
        api_url = this.prefix + '/operations/filter/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createProjectionComponent(json_data, node) {
        api_url = this.prefix + '/operations/projection/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteProjectionComponent(id) {
        api_url = this.prefix + '/operations/projection/';
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function executeAll(json_data) {
        api_url = this.prefix + '/workflows/';
        _send_request(api_url, "POST", json_data, null);
    };

    function getResult(component_id) {
        api_url = this.prefix + '/results/?expetiment=1&component_id=' + component_id;
        _send_request(api_url, "GET", null, null);
    };


    CognitiveAPIClientV1.prototype = {
        constructor: CognitiveAPIClientV1,
        createInputComponent: createInputComponent,
        deleteInputComponent: deleteInputComponent,
        createOutputComponent: createOutputComponent,
        deleteOutputComponent: deleteOutputComponent,
        createAddRowComponent: createAddRowComponent,
        deleteAddRowComponent: deleteAddRowComponent,
        createMathFormulaComponent: createMathFormulaComponent,
        deleteMathFormulaComponent: deleteMathFormulaComponent,
        createMetadataComponent: createMetadataComponent,
        deleteMetadataComponent: deleteMetadataComponent,
        createMachineLeaningComponent: createMachineLeaningComponent,
        deleteMachineLeaningComponent: deleteMachineLeaningComponent,
        createNormalizationComponent: createNormalizationComponent,
        deleteNormalizationComponent: deleteNormalizationComponent,
        createRemoveDuplicatesComponent: createRemoveDuplicatesComponent,
        deleteRemoveDuplicatesComponent: deleteRemoveDuplicatesComponent,
        createRemoveMissingValueComponent: createRemoveMissingValueComponent,
        deleteRemoveMissingValueComponent: deleteRemoveMissingValueComponent,
        createFilterComponent: createFilterComponent,
        deleteFilterComponent: deleteFilterComponent,
        createRemoveMissingValuesComponent: createRemoveMissingValuesComponent,
        deleteRemoveMissingValuesComponent: deleteRemoveMissingValuesComponent,
        createProjectionComponent: createProjectionComponent,
        deleteProjectionComponent: deleteProjectionComponent,
        executeAll: executeAll
    };

    return CognitiveAPIClientV1;

})();