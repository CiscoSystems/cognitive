var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Normalization = (function (_super) {
    __extends(Normalization, _super);
    function Normalization() {
        _super.call(this, {
            "name": "Normalization",
            "width": 0,
            "height": 0,
            "input": 1,
            "output": 1
        });
    }
    Normalization.prototype.create_request = function (params) {
        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type
        };
        var api_url = '/api/v1' + '/operations/normalization/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    Normalization.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/normalization/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    return Normalization;
})(ComponentBase);
//# sourceMappingURL=normalization.js.map