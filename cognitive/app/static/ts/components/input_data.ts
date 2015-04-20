interface InputDataComponentCreateParams {
    file_name: string;
    text_data: string;
}

interface InputDataRequestParams {
    file_name: string;
    text_data: string;
}

class InputData extends ComponentBase {

    private file_name: string;
    private text_data: string;

    static add_btn: any;
    static edit_btn: any;

    constructor(){

        InputData.add_btn = $("#input-add-btn");
        InputData.edit_btn = $("#input-edit-btn");

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
    public update(): void {

        var params: InputDataRequestParams = {
            file_name: string,
            text_data: string
        };

        this.put_request(params);
        super.update();
    }

    public put_request(params: InputDataRequestParams) {

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

    private click_edit(e): void {
        ComponentController.activate_menubar('data_input');
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        InputData.add_btn.addClass("disabled");
        InputData.edit_btn.removeClass("disabled");
        InputData.edit_btn.val(this.get_id());
        InputData.edit_btn.click(this.update.bind(this));
    }
}
