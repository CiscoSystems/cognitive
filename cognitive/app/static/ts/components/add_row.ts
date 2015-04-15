interface AddRowComponentCreateParams {
    values: string;
}

interface AddRowComponentPutParams {
    values: string;
}

class AddRow extends ComponentBase {

    private values: string;

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

        this.values = params.values;

        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            row_values: params.values
        };

        var api_url = '/api/v1' + '/operations/row/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public put_request(params: AddRowComponentPutParams) {

        this.values = params.values;

        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            row_values: params.values
        };

        var api_url = '/api/v1' + '/operations/row/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/row/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {

    }
}