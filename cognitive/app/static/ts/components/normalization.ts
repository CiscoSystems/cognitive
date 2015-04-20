interface NormalizationComponentCreateParams {
    component_type: string;
    component_id: number;
    op_type: string;
}

interface NormalizationRequestParams {
    component_type: string;
    component_id: number;
    op_type: string;
}


class Normalization extends ComponentBase {

    private column_type: string;
    private column_idx: number;
    private operation: string;

    static add_btn: any;
    static edit_btn: any;

    constructor () {

        Normalization.add_btn = $("#normalization-add-btn");
        Normalization.edit_btn = $("#normalization-edit-btn");

        super({
            "name": "Normalization",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: NormalizationComponentCreateParams){

        this.column_type = params.component_type;
        this.column_idx = params.component_id;
        this.operation = params.op_type;

        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type
        };

        var api_url = '/api/v1' + '/operations/normalization/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {
        var params = Normalization.generate_request();
        this.put_request(params);
    }

    public put_request(params: NormalizationRequestParams) {

        this.column_type = params.component_type;
        this.column_idx = params.component_id;
        this.operation = params.op_type;

        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type
        };

        var api_url = '/api/v1' + '/operations/normalization/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/normalization/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {
        ComponentController.activate_menubar("normalization");
        //ViewController.description_normalization();
        Normalization.generate_detail_view();
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        Normalization.add_btn.addClass("disabled");
        Normalization.edit_btn.removeClass("disabled");
        Normalization.edit_btn.val(this.get_id())
        Normalization.edit_btn.click(this.update.bind(this));
    }

    static generate_detail_view(): void {
        var form_root = $("#normalization_column");
        form_root.empty();
        if (_uploaded_file_as_text == "") { return; }
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            form_root.append('<option value="' + i + '">' + _uploaded_file_as_arrays[0][i] + '</option>');
        }
    }

    static generate_request(): NormalizationRequestParams {
        var method = $('select#normalization_method').val();
        var column_num = $('select#normalization_column').val();
        var params: NormalizationRequestParams = {
            component_type: "Column",
            component_id: column_num,
            op_type: method
        };

        return params;
    }
}