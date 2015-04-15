var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RemoveMissingValues = (function (_super) {
    __extends(RemoveMissingValues, _super);
    function RemoveMissingValues() {
        _super.call(this, {
            "name": "Remove Missing Values",
            "width": 0,
            "height": 0,
            "input": 1,
            "output": 1
        });
    }
    RemoveMissingValues.prototype.create_request = function (params) {
        this.operation = params.op_action;
        var json_data = {
            op_action: params.op_action
        };
        var api_url = '/api/v1' + '/operations/remove_missing/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    RemoveMissingValues.prototype.put_request = function (params) {
        this.operation = params.op_action;
        var json_data = {
            op_action: params.op_action
        };
        var api_url = '/api/v1' + '/operations/remove_missing/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    };
    RemoveMissingValues.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/remove_missing/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    RemoveMissingValues.prototype.click_edit = function (e) {
    };
    return RemoveMissingValues;
})(ComponentBase);
//# sourceMappingURL=remove_missing_values.js.map