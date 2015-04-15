var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColumnSelection = (function (_super) {
    __extends(ColumnSelection, _super);
    function ColumnSelection() {
        _super.call(this, {
            "name": "Column Selection",
            "width": 0,
            "height": 0,
            "input": 1,
            "output": 1
        });
    }
    ColumnSelection.prototype.create_request = function (params) {
        var json_data = {
            component_id: params.component_id
        };
        var api_url = '/api/v1' + '/operations/projection/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    ColumnSelection.prototype.put_request = function (params) {
        var json_data = {
            component_id: params.component_id
        };
        var api_url = '/api/v1' + '/operations/projection/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    };
    ColumnSelection.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/projection/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    return ColumnSelection;
})(ComponentBase);
//# sourceMappingURL=column_selection.js.map