interface MetadataEditorComponentCreateParams {
    column_type;
}

interface MetadataEditorComponentPutParams {
    column_type;
}

class MetadataEditor extends ComponentBase {

    private column_type;

    constructor() {
        super({
            "name": "Metadata",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: MetadataEditorComponentCreateParams){

        this.column_type = params.column_type;

        var json_data = {
            column_type: params.column_type
        };

        var api_url = '/api/v1' + '/operations/metadata/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public put_request(params: MetadataEditorComponentPutParams) {

        this.column_type = params.column_type;

        var json_data = {
            column_type: params.column_type
        };

        var api_url = '/api/v1' + '/operations/metadata/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/metadata/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }
}
