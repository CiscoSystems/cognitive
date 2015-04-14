interface InputDataComponentCreateParams {
    file_name: string;
    text_data: string;
}

class InputData extends ComponentBase {
    constructor(){
        super({
            "name": "Input Data",
            "width": 0,
            "height":0,
            "input":0,
            "output":1
        });
    }

    public create_request(params: InputDataComponentCreateParams){
        var json_data = {
            user_id: 1,
            input_file: params.file_name,
            token: "token",
            input_file_type: "csv",
            experiment: 1,
            data_values: params.text_data
        };

        var api_url = '/api/v1'  + '/operations/input/';
        ComponentBase._send_request(api_url, "POST", json_data, this);

    }

}
