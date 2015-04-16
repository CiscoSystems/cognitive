interface ColumnSelectionComponentCreateParams {
    component_id: number;
}

interface ColumnSelectionComponentPutParams {
    component_id: number;
}

class ColumnSelection extends ComponentBase {

    private column_idx: number;

    static add_btn: any;
    static edit_btn: any;

    constructor () {

        ColumnSelection.add_btn = $("#projection-add-btn");
        ColumnSelection.edit_btn = $("#projection-edit-btn");

        super({
            "name": "Column Selection",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: ColumnSelectionComponentCreateParams) {

        this.column_idx = params.component_id;

        var json_data = {
            component_id: params.component_id
        };

        var api_url = '/api/v1' + '/operations/projection/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {

        var params: ColumnSelectionComponentPutParams = {
           component_id: number
        };

        this.put_request(params);
    }

    public put_request(params: ColumnSelectionComponentPutParams) {

        this.column_idx = params.component_id;

        var json_data = {
            component_id: params.component_id
        };

        var api_url = '/api/v1' + '/operations/projection/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/projection/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {
        ComponentController.activate_menubar("projection");
        ViewController.initialize_projection_column();
        ViewController.add_column_for_projection();
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        ColumnSelection.add_btn.addClass("disabled");
        ColumnSelection.edit_btn.removeClass("disabled");
        ColumnSelection.edit_btn.val(this.get_id())
        ColumnSelection.edit_btn.click(this.update.bind(this));
    }
}