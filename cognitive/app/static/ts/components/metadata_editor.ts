interface MetadataEditorComponentCreateParams {
    column_type;
}

interface MetadataEditorComponentPutParams {
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

        var params:  MetadataEditorComponentPutParams = {
            column_type: a
        };

        this.put_request(params);
    }

    public put_request(params: MetadataEditorComponentPutParams) {

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
        ViewController.description_metadata();
        this.activate_edit_btn();
    }

    private activate_edit_btn(): void {
        MetadataEditor.add_btn.addClass("disabled");
        MetadataEditor.edit_btn.removeClass("disabled");
        MetadataEditor.edit_btn.val(this.get_id())
        MetadataEditor.edit_btn.click(this.update.bind(this));
    }
}
