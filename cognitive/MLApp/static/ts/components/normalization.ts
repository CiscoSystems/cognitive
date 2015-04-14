interface NormalizationComponentCreateParams {
    component_type: string;
    component_id: number;
    op_type: string;
}


class Normalization extends ComponentBase {
    constructor () {
        super({
            "name": "Normalization",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: NormalizationComponentCreateParams){
        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type
        };

        var api_url = '/api/v1' + '/operations/normalization/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }
}