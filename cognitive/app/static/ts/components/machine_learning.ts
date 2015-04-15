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

    constructor() {
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
    }
}