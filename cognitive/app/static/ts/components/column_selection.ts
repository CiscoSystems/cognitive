interface ColumnSelectionComponentCreateParams {
    component_id: string;
}

interface ColumnSelectionRequestParams {
    component_id: string;
}

class ColumnSelection extends ComponentBase {

    static projections: number;
    static option_html_tag: string;
    private column_idx: string;

    static add_btn: any;
    static edit_btn: any;

    constructor () {

        ColumnSelection.add_btn = $("#projection-add-btn");
        ColumnSelection.edit_btn = $("#projection-edit-btn");

        // this variable is for managing <input id="here">
        // for generating next input tag.
        ColumnSelection.option_html_tag = "";
        ColumnSelection.projections = 0;

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

        console.log(json_data);

        var api_url = '/api/v1' + '/operations/projection/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {

        var params = ColumnSelection.generate_request();
        this.put_request(params);
        super.update();
    }

    public put_request(params: ColumnSelectionRequestParams) {

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
        //ViewController.initialize_projection_column();
        //ViewController.add_column_for_projection();
        ColumnSelection.generate_detail_view();
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        ColumnSelection.add_btn.addClass("disabled");
        ColumnSelection.edit_btn.removeClass("disabled");
        ColumnSelection.edit_btn.val(this.get_id());
        ColumnSelection.edit_btn.click(this.update.bind(this));
    }

    static generate_detail_view(): void {

        var form_root = $('.form-group.projection_form');
        ColumnSelection.projections = 0;
        form_root.empty();

        if (_uploaded_file_as_text == ""){ return; }
        var column_names = _uploaded_file_as_arrays[0];

        ColumnSelection.option_html_tag = "";
        for (var i=0; i < column_names.length; i++ ){
            ColumnSelection.option_html_tag += '<option value="'+i+'">'+ column_names[i] +'</option>'
        }

        form_root.append(
            '<select class="form-control projection_selects _selects_' +
            ColumnSelection.projections+'">'+ColumnSelection.option_html_tag+'</select>'
        );

        ColumnSelection.projections++;

        this.get_add_btn().removeClass("disabled");
        this.get_edit_btn().addClass("disabled");
    }

    static generate_request(): ColumnSelectionRequestParams {
        var len = $('.projection_selects').length;
        var projection_columns = "[";

        for (var i = 0; i < len; i++) {
            projection_columns += $('.projection_selects._selects_' + i).val() + ","
        }

        projection_columns = projection_columns.slice(0, projection_columns.length - 1);
        projection_columns += "]";

        var params: ColumnSelectionRequestParams = {
            component_id: projection_columns
        };

        return params;
    }

    static append_column(): void {
        $('.form-group.projection_form').append(
            '<select class="form-control projection_selects _selects_'
            +ColumnSelection.projections+'">'+ColumnSelection.option_html_tag+'</select>'
        );
        ColumnSelection.projections++;
    }
}