interface MetadataEditorComponentCreateParams {
    column_type;
}

class MetadataEditor extends ComponentBase {
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
        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            column_type: params.column_type
        };

        var api_url = '/api/v1' + '/operations/metadata/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }
}
