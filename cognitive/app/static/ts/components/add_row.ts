interface AddRowComponentCreateParams {
    values: string;
}

interface AddRowRequestParams {
    values: string;
}

class AddRow extends ComponentBase {

    private values: string;

    static add_btn: any;
    static edit_btn: any;

    constructor () {

        AddRow.add_btn = $("#add_row-add-btn");
        AddRow.edit_btn  = $("#add_row-edit-btn");

        super({
            "name": "Add Row",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public get_values(): string {
        return this.values;
    }

    public create_request(params: AddRowComponentCreateParams) {

        this.values = params.values;

        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            row_values: params.values
        };

        var api_url = '/api/v1' + '/operations/row/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {
        var params = AddRow.generate_request();
        this.put_request(params);
    }

    public put_request(params: AddRowRequestParams) {

        this.values = params.values;

        var json_data = {
            user_id: 1,
            token: "aaa",
            experiment: 1,
            row_values: params.values
        };

        var api_url = '/api/v1' + '/operations/row/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1' + '/operations/row/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    static generate_detail_view(): void {
        $(".add_row_form").empty();
        _uploaded_file_as_arrays[0];
        console.log(_uploaded_file_as_arrays[0]);
        if (_uploaded_file_as_text == "") { return; }
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            $(".add_row_form").append('<li class="add-row-option" id="add-row-column-' + i + '" style="padding-top: 10px"></li>');
            $("#add-row-column-" + i).append('<p>' + _uploaded_file_as_arrays[0][i] + '<p/>');
            $("<input/>", {
                "class": "add_row form-control floating-label" + " _column_" + i + " add-row-input",
                id: "add-row-input-" + i,
                type: "text",
                placeholder: "value"
            }).appendTo("#add-row-column-" + i);
        }
    }

    static delete_detail_view(): void {
        $(".add_row_form").empty();
    }

    private click_edit(e): void {
        AddRow.generate_detail_view();
        var input_forms:any = $('.add-row-input');
        var _vals = this.values.replace(/\[/g,"").replace(/]/g,"").replace(/"/g,"").split(",");
        for (var i=0; i < input_forms.length; i++) {$("#add-row-input-"+i).val(_vals[i]);}
        ComponentController.activate_menubar("add_row");
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        AddRow.add_btn.addClass("disabled");
        AddRow.edit_btn.removeClass("disabled");
        AddRow.edit_btn.val(this.get_id());
        AddRow.edit_btn.click(this.update.bind(this));
    }

    static generate_request(): AddRowRequestParams {
        var request_text = "[";
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            request_text += "\"" + $(".add_row._column_" + i).val() + "\",";
        }
        request_text = request_text.slice(0, request_text.length - 1);
        request_text += "]";

        var params: AddRowRequestParams = {
            values: request_text
        };
        return params;
    }

}