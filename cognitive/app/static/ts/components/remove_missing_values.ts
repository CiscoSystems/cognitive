interface RemoveMissingValuesComponentCreateParams {
    op_action: string; //"Replace_mean" or Drop_row
}

interface RemoveMissingValuesComponentPutParams {
    op_action: string; //"Replace_mean" or Drop_row
}

class RemoveMissingValues extends ComponentBase {

    private operation: string;

    constructor () {
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

    public put_request(params: RemoveMissingValuesComponentPutParams) {

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

    }

}