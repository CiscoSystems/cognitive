interface MetadataEditorComponentCreateParams {
    column_type;
}

interface MetadataEditorRequestParams {
    column_type;
}

class MetadataEditor extends ComponentBase {

    private column_type;

    static add_btn: any;
    static edit_btn: any;

    constructor() {

        MetadataEditor.add_btn = $("#metadata-add-btn");
        MetadataEditor.edit_btn = $("#metadata-edit-btn");

        super({
            "name": "Metadata",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: MetadataEditorComponentCreateParams){

        this.column_type = params.column_type;

        var json_data = {
            column_type: params.column_type
        };

        var api_url = '/api/v1' + '/operations/metadata/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public update(): void {
        var params = MetadataEditor.generate_request()
        this.put_request(params);
        super.update();
    }

    public put_request(params: MetadataEditorRequestParams) {

        this.column_type = params.column_type;

        var json_data = {
            column_type: params.column_type
        };

        var api_url = '/api/v1' + '/operations/metadata/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/metadata/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {
        ComponentController.activate_menubar("metadata");
        //ViewController.description_metadata();
        this.generate_detail_view();
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        MetadataEditor.add_btn.addClass("disabled");
        MetadataEditor.edit_btn.removeClass("disabled");
        MetadataEditor.edit_btn.val(this.get_id());
        MetadataEditor.edit_btn.click(this.update.bind(this));
    }

    static generate_detail_view(): void {
        var form_root = $("#metadata_discriptions");
        form_root.empty();
        if (_uploaded_file_as_text == "") { return; }
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            form_root.append('<div class="row meta_' + i + '" style="padding-top:25px;"></div>');
            $("#metadata_discriptions div.meta_" + i).append('<p>' + _uploaded_file_as_arrays[0][i] + '</p>');
            $("#metadata_discriptions div.meta_" + i)
                .append('<select class="form-control metadata column' + i + '" id="formula_method select"><option>string</option><option>integer</option><option>categorical</option></select>');
        }
        this.get_add_btn().removeClass("disabled");
        this.get_edit_btn().addClass("disabled");

    }

    static generate_request():MetadataEditorRequestParams {
        var metadata_types = "[";
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            metadata_types += "\"" + $(".metadata.column" + i).val() + "\",";
        }
        metadata_types = metadata_types.slice(0, metadata_types.length - 1);
        metadata_types += "]";

        var params: MetadataEditorRequestParams = {
            column_type: metadata_types
        };

        return params;
    }
}
