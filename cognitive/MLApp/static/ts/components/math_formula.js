var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MathFormula = (function (_super) {
    __extends(MathFormula, _super);
    /*
     * TODO: `operation` and `constant` will be changed
     *       to deal with any mathematical formula in the future.
     */
    function MathFormula() {
        _super.call(this, {
            "name": "Math Formula",
            "width": 0, "height": 0, "input": 1, "output": 1
        });
    }
    MathFormula.prototype.create_request = function (params) {
        this.column_type = params.component_type;
        this.column_idx = params.component_id;
        this.operation = params.op_type;
        this.constant = params.op_constant;
        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type,
            op_constant: params.op_constant
        };
        var api_url = '/api/v1' + '/operations/math_formula/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    MathFormula.prototype.put_request = function (params) {
        this.column_type = params.component_type;
        this.column_idx = params.component_id;
        this.operation = params.op_type;
        this.constant = params.op_constant;
        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type,
            op_constant: params.op_constant
        };
        var api_url = '/api/v1' + '/operations/math_formula/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    };
    MathFormula.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/math_formula/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    MathFormula.prototype.click_edit = function (e) {
        Controller.activate_menubar("add_math_fomula");
        $('#formula_method').val(this.operation);
        $('#formula_column').val(this.column_idx);
        $('#formula_constant').val(this.constant);
    };
    return MathFormula;
})(ComponentBase);
//# sourceMappingURL=math_formula.js.map