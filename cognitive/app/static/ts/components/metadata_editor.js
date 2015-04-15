var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MetadataEditor = (function (_super) {
    __extends(MetadataEditor, _super);
    function MetadataEditor() {
        _super.call(this, {
            "name": "Metadata",
            "width": 0,
            "height": 0,
            "input": 1,
            "output": 1
        });
    }
    MetadataEditor.prototype.create_request = function (params) {
        this.column_type = params.column_type;
        var json_data = {
            column_type: params.column_type
        };
        var api_url = '/api/v1' + '/operations/metadata/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    MetadataEditor.prototype.put_request = function (params) {
        this.column_type = params.column_type;
        var json_data = {
            column_type: params.column_type
        };
        var api_url = '/api/v1' + '/operations/metadata/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    };
    MetadataEditor.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/metadata/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    MetadataEditor.prototype.click_edit = function (e) {
    };
    return MetadataEditor;
})(ComponentBase);
//# sourceMappingURL=metadata_editor.js.map