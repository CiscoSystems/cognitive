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
    constructor(){
        super({
            "name": "Math Formula",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        });
    }

    public create_request(params: MathFormulaComponentCreateParams){
        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type,
            op_constant: params.op_constant
        };

        var api_url = '/api/v1' + '/operations/math_formula/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public put_request(params: MathFormulaComponentPutParams) {
        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type,
            op_constant: params.op_constant
        };

        var api_url = '/api/v1' + '/operations/math_formula/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/math_formula/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e) {
        console.log("test");
    }

}