interface MathFormulaComponentCreateParams {
    component_type: string;
    component_id: number;
    op_type: string;  // Add or Sub, Mul, Div
    op_constant: number;
}

interface MathFormulaComponentPutParams {
    component_type: string;
    component_id: number;
    op_type: string;  // Add or Sub, Mul, Div
    op_constant: number;
}

class MathFormula extends ComponentBase {

    private column_type: string;
    private column_idx: number;
    private operation: string; // Add or Sub, Mul, Div
    private constant: number;

    static add_btn: any;
    static edit_btn: any;

    /*
     * TODO: `operation` and `constant` will be changed
     *       to deal with any mathematical formula in the future.
     */

    constructor(){

        MathFormula.add_btn = $("#math_formula-add-btn");
        MathFormula.edit_btn = $("#math_formula-edit-btn");

        super({
            "name": "Math Formula",
            "width": 0, "height":0, "input": 1, "output": 1
        });
    }

    public create_request(params: MathFormulaComponentCreateParams): void {

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

        console.log("CREATE MATH FORMULA: ", json_data);

        var api_url = '/api/v1' + '/operations/math_formula/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {

        var params: MathFormulaComponentPutParams = {
                component_type: "Column",
                component_id: $('#formula_column').val(),
                op_type: $('#formula_method').val(),
                op_constant: $('#formula_constant').val()
        };

        this.put_request(params);
    }

    public put_request(params: MathFormulaComponentPutParams): void {

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

        console.log("UPDATA MATH FORMULA: ", json_data);

        var api_url = '/api/v1' + '/operations/math_formula/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request(): void {
        var api_url = '/api/v1'  + '/operations/math_formula/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    /* TODO:
     * in the future, instead of implementing click edit function for all components,
     * static enable_click() function will deal with this.
     * The main problem is the mapping each id, say #formula_method, to
     */
    private click_edit(e): void {
        ComponentController.activate_menubar("add_math_fomula");
        $('#formula_method').val(this.operation);
        $('#formula_column').val(this.column_idx);
        $('#formula_constant').val(this.constant);
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        MathFormula.add_btn.addClass("disabled");
        MathFormula.edit_btn.removeClass("disabled");
        MathFormula.edit_btn.val(this.get_id())

        MathFormula.edit_btn.click(this.update.bind(this));
    }
}