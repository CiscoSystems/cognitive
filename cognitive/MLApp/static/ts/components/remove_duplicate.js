var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RemoveDuplicates = (function (_super) {
    __extends(RemoveDuplicates, _super);
    function RemoveDuplicates() {
        _super.call(this, {
            "name": "Remove Duplicates",
            "width": 0,
            "height": 0,
            "input": 1,
            "output": 1
        });
    }
    RemoveDuplicates.prototype.create_request = function (params) {
        this.column_idx = params.component_id;
        var json_data = {
            component_id: params.component_id
        };
        var api_url = '/api/v1' + '/operations/remove_duplicates/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    RemoveDuplicates.prototype.put_request = function (params) {
        this.column_idx = params.component_id;
        var json_data = {
            component_id: params.component_id
        };
        var api_url = '/api/v1' + '/operations/remove_duplicates/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    };
    RemoveDuplicates.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/remove_duplicates' + '/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    return RemoveDuplicates;
})(ComponentBase);
//# sourceMappingURL=remove_duplicate.js.map