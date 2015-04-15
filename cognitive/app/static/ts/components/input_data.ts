interface InputDataComponentCreateParams {
    file_name: string;
    text_data: string;
}

interface InputDataComponentPutParams {
    file_name: string;
    text_data: string;
}

class InputData extends ComponentBase {

    private file_name: string;
    private text_data: string;

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

        this.file_name = params.file_name;
        this.text_data = params.text_data;

        var json_data = {
            input_file: params.file_name,
            input_file_type: "csv",
            data_values: params.text_data
        };

        var api_url = '/api/v1'  + '/operations/input/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public put_request(params: InputDataComponentPutParams) {

        this.file_name = params.file_name;
        this.text_data = params.text_data;

        var json_data = {
            input_file: params.file_name,
            input_file_type: "csv",
            data_values: params.text_data
        };

        var api_url = '/api/v1'  + '/operations/input/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);

    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/input/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

}
