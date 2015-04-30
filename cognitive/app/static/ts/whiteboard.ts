// Will remove these global variables
var _uploaded_file_as_text   = "";
var _uploaded_file_name      = "";
var _uploaded_file_as_arrays = [];

class ViewController {

    static remove_duplicates_columns: number;

    static svg_root: any;
    static layer_0: any;
    static scope_layer: any;
    static connection_layer: any;
    static component_layer: any;
    static functionality_layer: any;
    /*
     * TODO: uploaded file related variable should not be global
     */

    //static uploaded_file_as_text   = "";
    //static uploaded_file_name      = "";
    //static uploaded_file_as_arrays = [];

    constructor() {

        ViewController.svg_root = $("#root");
        ViewController.layer_0 = $("#layer-0");
        ViewController.scope_layer = $("#layer-1");
        ViewController.connection_layer = $("#layer-2");
        ViewController.component_layer = $("#layer-3");
        ViewController.functionality_layer = $("#layer-4");

        $(".menu_bar").click(function(){
            if ($(this).hasClass("introduction")){
                ComponentController.activate_menubar('introduction');
            } else if ($(this).hasClass("data_input")) {
                ComponentController.activate_menubar('data_input');
                InputData.generate_detail_view();
            } else if ($(this).hasClass("add_row")) {
                ComponentController.activate_menubar("add_row");
                AddRow.generate_detail_view();
            } else if ($(this).hasClass("add_math_fomula")) {
                ComponentController.activate_menubar("add_math_fomula");
                MathFormula.generate_detail_view();
            } else if ($(this).hasClass("projection")) {
                ComponentController.activate_menubar("projection");
                ColumnSelection.generate_detail_view();
            } else if ($(this).hasClass("normalization")) {
                ComponentController.activate_menubar("normalization");
                Normalization.generate_detail_view();
            } else if ($(this).hasClass("remove_column")) {
                ComponentController.activate_menubar("remove_column");
                RemoveDuplicates.generate_detail_view();
            } else if ($(this).hasClass("remove_missing_value")) {
                ComponentController.activate_menubar("remove_missing_value");
            } else if ($(this).hasClass("transform")) {
                ComponentController.activate_menubar("transform");
            } else if ($(this).hasClass("metadata")) {
                ComponentController.activate_menubar("metadata");
                MetadataEditor.generate_detail_view();
            } else if ($(this).hasClass("machine_learning")) {
                ComponentController.activate_menubar("machine_learning");
                MachineLearning.generate_detail_view();
            }
        });

        $(".add_btn").click(function() {

            /*
             * TODO: [refactor] create_component method will be defined in ComponentBase class
             * in create_component method, they call _create method which can be override
             * by sub class.
             */

            if ($(this).hasClass('add_input')) {
                ComponentController.create_input_component();
            } else if ($(this).hasClass('add_row')) {
                ComponentController.create_add_row_component();
            } else if ($(this).hasClass('add_math_fomula')) {
                ComponentController.create_math_formula_component();
            } else if ($(this).hasClass('add_normalization')) {
                ComponentController.create_normalization_component();
            } else if ($(this).hasClass('add_projection')) {
                ComponentController.create_projection_component();
            } else if ($(this).hasClass('add_remove_duplicates')) {
                ComponentController.create_remove_duplicates_component();
            } else if ($(this).hasClass('add_remove_missing_value')) {
                ComponentController.create_remove_missing_value_component();
            } else if ($(this).hasClass('add_metadata')) {
                ComponentController.create_metadata_component();
            } else if ($(this).hasClass('add_machine_learning')) {
                ComponentController.create_machine_learning_component();
            }
        });

        $("#execute-btn").click(function () {
            ViewController.run();
        });

        $('.projection.plus-bottom').click(ColumnSelection.append_column);
        $('.remove_duplicates.plus-bottom').click(ViewController.add_column_for_remove_duplicates);

        $('#inputFile').change(function(evt) {
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                _uploaded_file_as_text = e.target.result;
                _uploaded_file_as_arrays = $.csv.toArrays(_uploaded_file_as_text);
            };
            reader.readAsText(file);

            _uploaded_file_name = file.name
        });

        var t = document.getElementById('root');
        var root_drag_frag;
        var root_drag_frag_reverse;
        var drag_start_x: number;
        var drag_start_y: number;
        var current_line_id: number;
        var previous_line_id: number;

        t.addEventListener('mousedown', function (e) {
            root_drag_frag = 0;
            root_drag_frag_reverse = 1;
            drag_start_x = e.x;
            drag_start_y = e.y;
            previous_line_id = 0;
            current_line_id = 1;
        }, false);

        t.addEventListener('mousemove', function (e) {
            root_drag_frag = 1;
            /*
             * [WIP] mouse drag should eneble to select some areas.
             */
            if (root_drag_frag_reverse === 1) {
                console.log(e.x, " ", e.y);
                var func_lay = d3.selectAll(ViewController.functionality_layer);
                func_lay.append("rect")
                    .attr("class", "mouse-select-range")
                    .attr("id", "mouse-select-range-" + current_line_id)
                    .attr("x", drag_start_x - 280).attr("y", drag_start_y - 45)
                    .attr("width", e.x - drag_start_x).attr("height", e.y - drag_start_y)
                    .attr('stroke', "steelblue" ).attr('stroke-width', "1")
                    .attr('fill', 'none');
            }
            $("#mouse-select-range-" + previous_line_id).remove();
            previous_line_id = current_line_id;
        }, false);

        t.addEventListener('mouseup', function () {
            // this is click
            if (root_drag_frag === 0) {
                ComponentController.deacitive_menubar();
                ComponentController.deactivate_focus();
            }
            root_drag_frag = 0;
            root_drag_frag_reverse = 0;
            $("#mouse-select-range-" + previous_line_id).remove();
        }, false);

        $("#create-experiment").click(function(){

            // will consider the session information
            var request = {
                "name": $("#whiteboard-name").val(),
                "status": "Draft",
                "user": $("#user-id").attr("value"),
                "token": $("#user-token").attr("value")
            };

            console.log(request);

            $.ajax({
                url:  "/api/v1/experiments/",
                type: "POST",
                data: request,
                success: function(result) {
                    console.log(result);
                    $("#template-whiteboard-name")[0].innerHTML = result["name"];
                    var template = $("#template-whiteboard-tab").clone();
                    template.css("display", "");
                    $("#whiteboard-nav-tabs").append(template);
                    template.click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    });
                    template.tab('show')
                },
                error: function(result) {
                    alert("To Create Whiteboard, You Need to Login")
                }
            });
        });

        $("#open-experiment").click(function () {
            var opts = $("#user-whiteboards");
            var template = $("#template-whiteboard-tab");
            var whiteboard_tab_bar = $("#whiteboard-nav-tabs");
            var id = opts.val();
            var name = opts.find("> option[value=" + id + "]")[0].innerHTML;
            var generated_tab = template.clone();

            generated_tab.find(">a>.template-whiteboard-name")[0].innerHTML = name;
            generated_tab.find(">a").attr("href", "#whiteboard-content-" + id);
            generated_tab.attr("id", "").attr("whiteboard", id);
            generated_tab.css("display", "");

            whiteboard_tab_bar.append(generated_tab);

            generated_tab.click(function (e) {
                e.preventDefault();
                var whiteboard_draw_area = $("#whiteboard-draw-area");
                whiteboard_draw_area.find("> .active").removeClass("active");
                $(this).tab('show');
                $("#whitebord-content-" + $(this).attr("whiteboard")).addClass("active");
                ViewController.focus_on_whiteboard($(this).attr("whiteboard"));
            });


            var template_drawarea = $("#template-whiteboard-draw-area").clone();
            template_drawarea.css("display", "");
            var svg = template_drawarea.find(">.whiteboard-draw-area-wrapper > svg");
            svg.children().attr("whiteboard", id);
            svg.attr("id", "whiteboard-root-" + id);
            template_drawarea.attr("id", "whitebord-content-" + id);
            template_drawarea.addClass("active");
            var whiteboard_draw_area = $("#whiteboard-draw-area");


            // This part should be bootstrap's tab('show') function.
            whiteboard_tab_bar.find(">li.active").removeClass("active");
            generated_tab.addClass("active");

            whiteboard_draw_area.find("> .active").removeClass("active");
            whiteboard_draw_area.append(template_drawarea);

            ViewController.focus_on_whiteboard(id);

            // --------------------------

        });

        $("#plusWhiteboard").click(function () {
            $.ajax({
                url: "/api/v1/experiments",
                type: "GET",
                success: function(result) {
                    console.log(result);
                    $("#user-whiteboards > option").remove();
                    for(var i=0; i<result.length; i++) {
                        var id = result[i].id;
                        var name = result[i].name;
                        var option = $("<option>").val(id).append(name);
                        $("#user-whiteboards").append(option);
                    }
                }
            })
        });

    }

    static focus_on_whiteboard(whiteboard_id: string): void{
        ViewController.svg_root = $("#whiteboard-root-" + whiteboard_id);
        ViewController.layer_0 = $("g.layer-0[whiteboard="+whiteboard_id+"]");
        ViewController.scope_layer = $("g.layer-1[whiteboard="+whiteboard_id+"]");
        ViewController.connection_layer = $("g.layer-2[whiteboard="+whiteboard_id+"]");
        ViewController.component_layer = $("g.layer-3[whiteboard="+whiteboard_id+"]");
        ViewController.functionality_layer = $("g.layer-4[whiteboard="+whiteboard_id+"]");

        var t = document.getElementById('whiteboard-root-' + whiteboard_id);
        var root_drag_frag;
        var root_drag_frag_reverse;
        var drag_start_x: number;
        var drag_start_y: number;
        var current_line_id: number;
        var previous_line_id: number;

        t.addEventListener('mousedown', function (e) {
            root_drag_frag = 0;
            root_drag_frag_reverse = 1;
            drag_start_x = e.x;
            drag_start_y = e.y;
            previous_line_id = 0;
            current_line_id = 1;
        }, false);

        t.addEventListener('mousemove', function (e) {
            root_drag_frag = 1;
            /*
             * [WIP] mouse drag should eneble to select some areas.
             */
            if (root_drag_frag_reverse === 1) {
                console.log(e.x, " ", e.y);
                var func_lay = d3.selectAll(ViewController.functionality_layer);
                func_lay.append("rect")
                    .attr("class", "mouse-select-range")
                    .attr("id", "mouse-select-range-" + current_line_id)
                    .attr("x", drag_start_x - 280).attr("y", drag_start_y - 45)
                    .attr("width", e.x - drag_start_x).attr("height", e.y - drag_start_y)
                    .attr('stroke', "steelblue" ).attr('stroke-width', "1")
                    .attr('fill', 'none');
            }
            $("#mouse-select-range-" + previous_line_id).remove();
            previous_line_id = current_line_id;
        }, false);

        t.addEventListener('mouseup', function () {
            // this is click
            if (root_drag_frag === 0) {
                ComponentController.deacitive_menubar();
                ComponentController.deactivate_focus();
            }
            root_drag_frag = 0;
            root_drag_frag_reverse = 0;
            $("#mouse-select-range-" + previous_line_id).remove();
        }, false);
    }

    static run(): void {

        var start: InputData;

        for (var i: number = 0; i < ComponentBase.component_list.length; i++) {
            if (ComponentBase.component_list[i].name == "Input Data") {
                start = ComponentBase.component_list[i];
            }
        }

        var node_list = ComponentBase.get_workflow_from(start.get_id());

        if (node_list.length < 1) {
            console.log("no workflow or input files");
            return;
        }

        var components_id_list = node_list.map(function (n) {
            return n.get_backend_id();
        });

        var flow_path = function (x) {
            var t = "";
            for (var i = 0; i < x.length - 1; i++) {
                t += x[i] + ":" + x[i + 1] + ",";
            }
            return t.substr(0, t.length - 1);
        }(components_id_list);

        $.ajax({
            url: '/api/v1/workflows/',
            type: "POST", data: {
                user_id: 1,
                experiment: 1,
                graph_data: flow_path
            },
            success: function (result) {
                console.log(result);
            }
        });

        $.colorbox({
            html: "<img src='/static/img/spinner.gif' alt='Smiley face' height='200px' width='200px'/>",
            closeButton: false,
            transition: "none",
            opacity: 0,
            arrowKey: false,
            overlayClose: false,
            fastIframe: false,
            width: "300px",
            height: "300px"
        });
        $('#cboxClose').remove();
        $('#cboxTopLeft').remove();
        $('#cboxTopCenter').remove();
        $('#cboxTopRight').remove();
        $('#cboxMiddleLeft').remove();
        $('#cboxMiddleRight').remove();
        $('#cboxBottomCenter').remove();
        $('#cboxBottomLeft').remove();
        $('#cboxBottomRight').remove();
        setTimeout("$.colorbox.close()", 700);

        node_list.map(function(n) {
            n.processed();
        })
    }
}

class ComponentController {

    static active_menu;

    constructor(){
        ComponentController.active_menu = null;
    }

    static activate_menubar(elm): void {
        this._activate_menubar(elm);
    }

    static deacitive_menubar(): void {
        if (ComponentController._active_menu !== null) {
            var previous_menubar = $('li.'+ this._active_menu);
            var previous_description = $('.detail.'+ this._active_menu);
            previous_description.toggle("slide");
            previous_menubar
                .css("background-color", "")
                .css("color", "").removeClass("active");
            ComponentController._active_menu = null;
        }
    }

    static _activate_menubar(elm): void {
        menubar = $('li.'+elm);
        description = $('.detail.'+elm);

        menubar
            .css("background-color", "#1e8cff")
            .css("color", "white");

        description.toggle("slide", {direction: "left"}, 700);

        if (this._active_menu === null) {
            this._active_menu = elm;
            return(menubar.addClass("active"));
        }

        if (this._active_menu == elm) {
            if (menubar.hasClass("active")) {
                this._active_menu = null;
                return menubar
                    .css("background-color", "")
                    .css("color", "")
                    .removeClass("active");
            }
        }

        previous_menubar = $('li.'+ this._active_menu);
        previous_description = $('.detail.'+ this._active_menu);

        previous_description.toggle("slide");
        previous_menubar
            .css("background-color", "")
            .css("color", "")
            .removeClass("active");

        this._active_menu = elm;

        return(menubar.addClass("active"));
    }

    static deactivate_focus(): void {
        if (ComponentBase.current_focus === null) {return;}
        ComponentBase.current_focus.classed("clicked", false);
        ComponentBase.current_focus = null;
    }

    static create_input_component(): void {
        var node = new InputData();
        var params: InputDataComponentCreateParams = {
            file_name: _uploaded_file_name,
            text_data: _uploaded_file_as_text
        };

        node.create_request(params);
    }

    static create_add_row_component(): void {
        var node = new AddRow();
        var params =AddRow.generate_request();
        node.create_request(params);
    }

    static create_math_formula_component(): void {
        var node = new MathFormula();
        var params = MathFormula.generate_request();
        node.create_request(params)
    }

    static create_normalization_component(): void {
        var node = new Normalization();
        var params = Normalization.generate_request();
        node.create_request(params);
    }

    static create_projection_component(): void {
        /* TODO: [refactor] projection to column_selection */
        var node = new ColumnSelection();
        var params = ColumnSelection.generate_request();
        node.create_request(params);
    }

    static create_remove_duplicates_component(): void {
        var node = new RemoveDuplicates();
        var params = RemoveDuplicates.generate_request();
        node.create_request(params);
    }

    static create_remove_missing_value_component(): void {
        var node = new RemoveMissingValues();
        var params = RemoveMissingValues.generate_request();
        node.create_request(params);
    }

    static create_metadata_component(): void {
        var node = new MetadataEditor();
        var params = MetadataEditor.generate_request();
        node.create_request(params);
    }

    static create_machine_learning_component(): void {
        var node = new MachineLearning();
        var params = MachineLearning.generate_request();
        node.create_request(params);
    }
}

var Manager = new ComponentController();

$(function(){

    var m = Manager;
    var svg = d3.selectAll("svg");
    var t = new ViewController();

    /*
     * TODO: getting results and rendering results should be implemented
     *       into Component Class and ViewController Class...(?)
     *       1) show should be implemented into VC
     *       2) the differences are implemented into Component
     */

    $("#show_component").click(getResult);

    function getResult() {

        var component = ComponentBase.get_current_focus_component();
        if (component == null) {return;}

        $.ajax({
            url:  '/api/v1/results/?experiment=1&component_id=' + component.get_backend_id(),
            type: "GET",
            data: "",
            success: function(result) {
                a = result;
                console.log(result);
                var z = serialize_result_to_html(result);

                $.colorbox({html:"<h1><i class='fa.fa-bar-chart'></i> Results</h1><p>"+z+"</p>", width: "90%"});

                render_result_graphs(result);
            }
        });
    }

    function render_result_graphs(result) {
        var w = 100;
        var h = 100;

        for (var i=0; i < result['feature_names'].length; i++ ){
            var target_area = d3.select("svg[class='graph column_"+i+"']");
            var dataset = result.graph_data[i][1];

            if (d3.max(dataset) == d3.min(dataset)) {
                dataset = [100,100,100,100];
            }

            for (var j=0; j < dataset.length; j++) {
                if (dataset[j] >= 96) {
                    dataset[j] -= 4;
                }
            }

            if (dataset.length == 3){
                dataset.push(0);
            } else if (dataset.length == 2) {
                var _t = [0];
                _t.push(dataset[0]);
                _t.push(0);
                _t.push(dataset[1]);
                dataset = _t;
            } else if (dataset.length == 1) {
                var _t = [0];
                _t.push(dataset[0]);
                _t.push(0);
                _t.push(0);
                dataset = _t;
            }

            var svg = d3.select("svg[class='graph column_"+i+"']");

            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d,i){ return i * 22 + 7; })
                .attr("y", function(d){ return h - d; })
                .attr('class', 'bar')
                .attr('height', function(d){ return d -4; })
                .attr("width", (w/dataset.length - 6));

            svg.append('rect')
                .attr("x", 3)
                .attr("y", 3)
                .attr('width',  w - 6 )
                .attr('height', h - 6 )
                .attr('stroke', "black" )
                .attr('fill', 'none')
                .attr('stroke-width', "1" )
        }
    }

    function serialize_result_to_html(result) {

        var _html ="<div id='result_wrapper'>";

        if (Object.keys(result).indexOf('output') >= 0) {
            _html += "<h2 style='border-left: solid 35px midnightblue;padding-left: 8px;'>Model Evaluation</h2>";
            _html += "<table class='result_table machine_learning_result'>";

            var ml_output = result['output'];
            var keys = Object.keys(ml_output);

            _html += "<tr class='metrics'>";
            for (var i=0; i<keys.length; i++) {
                _html += "<th>"+keys[i]+"</th>"
            }
            _html += "</tr><tr>";
            for (var i=0; i<keys.length; i++) {
                _html += "<th>"+ml_output[keys[i]]+"</th>"
            }
            _html += "</tr></table>"
        }

        _html += "<h2 style='border-left: solid 35px midnightblue;padding-left: 8px;'></i>Statistics</h2>";
        _html += "<table class='result_table'>";

        _html +="<tr><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";

        for (var i=0; i < result['feature_names'].length; i++ ){
            _html += "<th><svg class='graph column_"+i+"'></svg></th>"
        }
        _html +="</tr>";

        _html += '<tr class="metrics">';
        _html +="<th>Statistics</th>";
        for (var i=0; i < result['feature_names'].length; i++ ){
            _html += "<th>" + result['feature_names'][i] + "</th>"
        }
        _html += "</tr>";

        _html += "<tr class='result_row static_results'>";
        _html +="<th>Std Deviation</th>";
        for (var i=0; i < result['std'].length; i++ ){
            _html += "<th>" + result['std'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>75 Quartile</th>";
        for (var i=0; i < result['75_quartile'].length; i++ ){
            _html += "<th>" + result['75_quartile'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>50 Quartile</th>";
        for (var i=0; i < result['50_quartile'].length; i++ ){
            _html += "<th>" + result['50_quartile'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>25 Quartile</th>";
        for (var i=0; i < result['25_quartile'].length; i++ ){
            _html += "<th>" + result['25_quartile'][i] + "</th>"
        }

        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>Max</th>";
        for (var i=0; i < result['max'].length; i++ ){
            _html += "<th>" + result['max'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>Mean</th>";
        for (var i=0; i < result['mean'].length; i++ ){
            _html += "<th>" + result['mean'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>Median</th>";
        for (var i=0; i < result['median'].length; i++ ){
            _html += "<th>" + result['median'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>Min</th>";
        for (var i=0; i < result['min'].length; i++ ){
            _html += "<th>" + result['min'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>Missing Values</th>";
        for (var i=0; i < result['missing_values'].length; i++ ){
            _html += "<th>" + result['missing_values'][i] + "</th>"
        }
        _html += "</tr><tr class='result_row static_results'>";

        _html +="<th>Unique Values</th>";
        for (var i=0; i < result['unique_values'].length; i++ ){
            _html += "<th>" + result['unique_values'][i] + "</th>"
        }

        _html += "</tr><tr class='metrics static_results'><td></td>";
        for (var i=0; i < result['feature_names'].length; i++ ){
            _html += "<th>" + result['feature_names'][i] + "</th>"
        }
        _html += "</tr>";

        for (var i=0; i < result['data'].length; i++ ){
            _html +="<tr class='result_row'><th></th>";
            for (var j=0; j < result['data'][i].length; j++ ){
                _html += "<th>" + result['data'][i][j] + "</th>"
            }
            _html +="</tr>"
        }
        _html += "</table></div>";

        return _html;
    }
});