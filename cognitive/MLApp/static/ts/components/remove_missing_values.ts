interface RemoveMissingValuesComponentCreateParams {
    op_action: string; //"Replace_mean" or Drop_row
}

class RemoveMissingValues extends ComponentBase {
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
        var json_data = {
            op_action: params.op_action
        };

        var api_url = '/api/v1' + '/operations/remove_missing/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }
}