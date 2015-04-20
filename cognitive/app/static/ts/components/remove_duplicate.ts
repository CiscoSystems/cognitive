interface RemoveDuplicatesComponentCreateParams {
    component_ids: string;
}

interface RemoveDuplicatesRequestParams {
    component_ids: string;
}

class RemoveDuplicates extends ComponentBase {

    private column_idx: string;

    static add_btn: any;
    static edit_btn: any;


    constructor () {

        RemoveDuplicates.add_btn = $("#remove_dupplicates-add-btn");
        RemoveDuplicates.edit_btn = $("#remove_dupplicates-edit-btn")

        super({
            "name": "Remove Duplicates",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: RemoveDuplicatesComponentCreateParams){

        this.column_idx = params.component_id;

        var json_data = {
            component_id: params.component_id
        };

        var api_url = '/api/v1' + '/operations/remove_duplicates/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {
        var params = RemoveDuplicates.generate_request();
        this.put_request(params);
    }

    public put_request(params: RemoveDuplicatesRequestParams) {

        this.column_idx = params.component_ids;

        var json_data = {
            component_id: params.component_ids
        };

        var api_url = '/api/v1' + '/operations/remove_duplicates/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/remove_duplicates' + '/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }
    private click_edit(e): void {
        ComponentController.activate_menubar("remove_column");
        ViewController.initialize_projection_column();
    }

    private activate_edit_btn(): void {
        RemoveDuplicates.add_btn.addClass("disabled");
        RemoveDuplicates.edit_btn.removeClass("disabled");
        RemoveDuplicates.edit_btn.val(this.get_id())
        RemoveDuplicates.edit_btn.click(this.update.bind(this));
    }

    static generate_detail_view():void {
        var form_root = $('.form-group.remove_duplicates_form');
        form_root.empty();
        ViewController.remove_duplicates_columns = 0;
        if (_uploaded_file_as_text == ""){ return;}
        var column_names = _uploaded_file_as_arrays[0];
        var option_string = "";
        for (var i=0; i < column_names.length; i++ ){
            option_string += '<option value="'+i+'">'+ column_names[i] +'</option>'
        }
        form_root.append(
            '<select class="form-control remove_duplicates_selects _selects_'
            +ViewController.remove_duplicates_columns+'">'+option_string+'</select>'
        );

        ViewController.remove_duplicates_columns++;
    }

    static generate_request(): RemoveDuplicatesRequestParams {
        var len = $('.remove_duplicates_selects').length;
        var remove_duplicates_columns = "[";

        for (var i = 0; i < len; i++) {
            remove_duplicates_columns += $('.remove_duplicates_selects._selects_' + i).val() + ","
        }
        remove_duplicates_columns = remove_duplicates_columns.slice(0, remove_duplicates_columns.length - 1);
        remove_duplicates_columns += "]";

        var params: RemoveDuplicatesRequestParams = {
            component_ids: remove_duplicates_columns
        };
        return params;
    }

}