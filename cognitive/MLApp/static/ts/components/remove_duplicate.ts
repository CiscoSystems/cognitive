interface RemoveDuplicatesComponentCreateParams {
    component_id: number;
}

interface RemoveDuplicatesComponentPutParams {
    component_id: number;
}

class RemoveDuplicates extends ComponentBase {
    constructor () {
        super({
            "name": "Remove Duplicates",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: RemoveDuplicatesComponentCreateParams){
        var json_data = {
            component_id: params.component_id
        };

        var api_url = '/api/v1' + '/operations/remove_duplicates/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public put_request(params: RemoveDuplicatesComponentPutParams) {
        var json_data = {
            component_id: params.component_id
        };

        var api_url = '/api/v1' + '/operations/remove_duplicates/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/remove_duplicates' + '/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }
}