interface RemoveMissingValuesComponentCreateParams {
    op_action: string; //"Replace_mean" or Drop_row
}

//enum MissValueOperation {ReplaceMean, DropRow};

interface RemoveMissingValuesRequestParams {
    op_action: string; //"Replace_mean" or Drop_row
}

class RemoveMissingValues extends ComponentBase {

    private operation: string;

    static add_btn: any;
    static edit_btn: any;

    constructor () {

        RemoveMissingValues.add_btn = $("#remove_missing_value-add-btn");
        RemoveMissingValues.edit_btn = $("#remove_missing_value-edit-btn");

        super({
            "name": "Remove Missing Values",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: RemoveMissingValuesComponentCreateParams){

        this.operation = params.op_action;

        var json_data = {
            op_action: params.op_action
        };

        var api_url = '/api/v1' + '/operations/remove_missing/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {
        var params = RemoveMissingValues.generate_request();
        this.put_request(params);
        super.update();
    }

    public put_request(params: RemoveMissingValuesRequestParams) {

        this.operation = params.op_action;

        var json_data = {
            op_action: params.op_action
        };

        var api_url = '/api/v1' + '/operations/remove_missing/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/remove_missing/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {
        ComponentController.activate_menubar("remove_missing_value");
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        RemoveMissingValues.add_btn.addClass("disabled");
        RemoveMissingValues.edit_btn.removeClass("disabled");
        RemoveMissingValues.edit_btn.val(this.get_id());
        RemoveMissingValues.edit_btn.click(this.update.bind(this));
    }

    static generate_request(): RemoveMissingValuesRequestParams {
        var method = $('#remove_missing_value_method').val();
        var params: RemoveMissingValuesRequestParams = {
            op_action: method //"Replace_mean" or Drop_row
        };
        return params;
    }
}