interface AddRowComponentCreateParams {
    values: string;
}

class AddRow extends ComponentBase {
    constructor () {
        super({
            "name": "Add Row",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: AddRowComponentCreateParams) {

        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            row_values: params.values
        };

        var api_url = '/api/v1' + '/operations/row/';
        ComponentBase._send_request(api_url, "POST", json_data, this);

    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/row/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }
}