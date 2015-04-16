interface MachineLearningComponentCreateParams {
    model_type;
    train_data_percentage;
    target_column;
}

interface MachineLearningComponentPutParams {
    model_type;
    train_data_percentage;
    target_column;
}

class MachineLearning extends ComponentBase {

    private model_type;
    private train_data_percentage;
    private target_column;

    static add_btn: any;
    static edit_btn: any;

    constructor() {

        MachineLearning.add_btn = $("#machine_learning-add-btn");
        MachineLearning.edit_btn = $("#machine_learning-edit-btn");

        super({
            "name": "Machine Learning",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: MachineLearningComponentCreateParams){

        this.model_type = params.model_type;
        this.train_data_percentage = params.train_data_percentage;
        this.target_column = params.target_column;

        var json_data = {
            model_type: params.model_type,
            train_data_percentage: params.train_data_percentage,
            target_column: params.target_column
        };

        var api_url = '/api/v1' + '/operations/machine_learning/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {

        var params: MachineLearningComponentPutParams = {
            model_type: a,
            train_data_percentage: a,
            target_column: a
        };

        this.put_request(params);
    }

    public put_request(params: MachineLearningComponentPutParams) {

        this.model_type = params.model_type;
        this.train_data_percentage = params.train_data_percentage;
        this.target_column = params.target_column;

        var json_data = {
            model_type: params.model_type,
            train_data_percentage: params.train_data_percentage,
            target_column: params.target_column
        };

        var api_url = '/api/v1' + '/operations/machine_learning/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/machine_learning/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {
        ComponentController.activate_menubar("machine_learning");
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        MachineLearning.add_btn.addClass("disabled");
        MachineLearning.edit_btn.removeClass("disabled");
        MachineLearning.edit_btn.val(this.get_id())
        MachineLearning.edit_btn.click(this.update.bind(this));
    }
}