var _uploaded_file_as_text = "";
var _uploaded_file_name = "";
var _uploaded_file_as_arrays = [];
var ViewController = (function () {
    function ViewController() {
        $(".menu_bar").click(function () {
            if ($(this).hasClass("introduction")) {
                ComponentController.activate_menubar('introduction');
            }
            else if ($(this).hasClass("data_input")) {
                ComponentController.activate_menubar('data_input');
            }
            else if ($(this).hasClass("add_row")) {
                ComponentController.activate_menubar("add_row");
                description_addrow();
            }
            else if ($(this).hasClass("add_math_fomula")) {
                ComponentController.activate_menubar("add_math_fomula");
                description_formula();
            }
            else if ($(this).hasClass("projection")) {
                ComponentController.activate_menubar("projection");
                ViewController.initialize_projection_column();
                ViewController.add_column_for_projection();
            }
            else if ($(this).hasClass("normalization")) {
                ComponentController.activate_menubar("normalization");
                description_normalization();
            }
            else if ($(this).hasClass("remove_column")) {
                ComponentController.activate_menubar("remove_column");
                ViewController.initialize_remove_duplicates_column();
                ViewController.add_column_for_remove_duplicates();
            }
            else if ($(this).hasClass("remove_missing_value")) {
                ComponentController.activate_menubar("remove_missing_value");
            }
            else if ($(this).hasClass("transform")) {
                ComponentController.activate_menubar("transform");
            }
            else if ($(this).hasClass("metadata")) {
                ComponentController.activate_menubar("metadata");
                description_metadata();
            }
            else if ($(this).hasClass("formula")) {
                ComponentController.activate_menubar("formula");
            }
            else if ($(this).hasClass("filter")) {
                ComponentController.activate_menubar("filter");
            }
            else if ($(this).hasClass("machine_learning")) {
                ComponentController.activate_menubar("machine_learning");
                description_machine_learning();
            }
        });
        $(".add_btn").click(function () {
            if ($(this).hasClass('add_input')) {
                ComponentController.create_input_component();
            }
            else if ($(this).hasClass('add_row')) {
                ComponentController.create_add_row_component();
            }
            else if ($(this).hasClass('add_math_fomula')) {
                ComponentController.create_math_fomula_component();
            }
            else if ($(this).hasClass('add_normalization')) {
                ComponentController.create_normalization_component();
            }
            else if ($(this).hasClass('add_projection')) {
                ComponentController.create_projection_component();
            }
            else if ($(this).hasClass('add_remove_duplicates')) {
                ComponentController.create_remove_duplicates_component();
            }
            else if ($(this).hasClass('add_remove_missing_value')) {
                ComponentController.create_remove_missing_value_component();
            }
            else if ($(this).hasClass('add_metadata')) {
                ComponentController.create_metadata_component();
            }
            else if ($(this).hasClass('add_machine_learning')) {
                ComponentController.create_machine_learning_component();
            }
        });
    }
    ViewController.initialize_projection_column = function () {
        $('.form-group.projection_form').empty();
        ViewController.projections = 0;
    };
    ViewController.add_column_for_projection = function () {
        if (_uploaded_file_as_text == "") {
            return;
        }
        var column_names = _uploaded_file_as_arrays[0];
        var option_string = "";
        for (var i = 0; i < column_names.length; i++) {
            option_string += '<option value="' + i + '">' + column_names[i] + '</option>';
        }
        $('.form-group.projection_form').append('<select class="form-control projection_selects _selects_'
            + ViewController.projections + '">' + option_string + '</select>');
        ViewController.projections++;
    };
    ViewController.initialize_remove_duplicates_column = function () {
        $('.form-group.remove_duplicates_form').empty();
        ViewController.remove_duplicates_columns = 0;
    };
    ViewController.add_column_for_remove_duplicates = function () {
        if (_uploaded_file_as_text == "") {
            return;
        }
        var column_names = _uploaded_file_as_arrays[0];
        var option_string = "";
        for (var i = 0; i < column_names.length; i++) {
            option_string += '<option value="' + i + '">' + column_names[i] + '</option>';
        }
        $('.form-group.remove_duplicates_form').append('<select class="form-control remove_duplicates_selects _selects_'
            + ViewController.remove_duplicates_columns + '">' + option_string + '</select>');
        ViewController.remove_duplicates_columns++;
    };
    return ViewController;
})();
$(function () {
    var m = Manager;
    var svg = d3.selectAll("svg");
    $('.projection.plus-bottom').click(ViewController.add_column_for_projection);
    $('.remove_duplicates.plus-bottom').click(ViewController.add_column_for_remove_duplicates);
    var t = new ViewController();
    $("#execute-btn").click(function () {
        var start;
        for (var i = 0; i < ComponentBase.component_list.length; i++) {
            if (ComponentBase.component_list[i].name == "Input Data") {
                start = ComponentBase.component_list[i];
            }
        }
        var node_list = ComponentBase.get_workflow_from(start.get_id());
        if (node_list.length < 1) {
            alert("no workflow or input files");
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
            success: function (result) { console.log(result); }
        });
        $.colorbox({ html: "<img src='/static/img/spinner.gif' alt='Smiley face' height='200px' width='200px'/>", closeButton: false, transition: "none", opacity: 0, arrowKey: false, overlayClose: false, fastIframe: false, width: "300px", height: "300px" });
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
    });
    $('#inputFile').change(function (evt) {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            _uploaded_file_as_text = e.target.result;
            _uploaded_file_as_arrays = $.csv.toArrays(_uploaded_file_as_text);
        };
        reader.readAsText(file);
        _uploaded_file_name = file.name;
    });
    $(".show_result_graph").click(getResult);
    function getResult() {
        var component = ComponentBase.get_current_focus_component();
        console.log(component);
        if (component == null) {
            return;
        }
        $.ajax({
            url: '/api/v1/results/?experiment=1&component_id=' + component.get_backend_id(),
            type: "GET",
            data: "",
            success: function (result) {
                a = result;
                console.log(result);
                var z = serialize_result_to_html(result);
                $.colorbox({ html: "<h1><i class='fa.fa-bar-chart'></i> Results</h1><p>" + z + "</p>", width: "90%" });
                render_result_graphs(result);
            }
        });
    }
    function render_result_graphs(result) {
        var w = 100;
        var h = 100;
        for (var i = 0; i < result['feature_names'].length; i++) {
            var target_area = d3.select("svg[class='graph column_" + i + "']");
            var dataset = result.graph_data[i][1];
            if (d3.max(dataset) == d3.min(dataset)) {
                dataset = [100, 100, 100, 100];
            }
            for (var j = 0; j < dataset.length; j++) {
                if (dataset[j] >= 96) {
                    dataset[j] -= 4;
                }
            }
            if (dataset.length == 3) {
                dataset.push(0);
            }
            else if (dataset.length == 2) {
                var _t = [0];
                _t.push(dataset[0]);
                _t.push(0);
                _t.push(dataset[1]);
                dataset = _t;
            }
            else if (dataset.length == 1) {
                var _t = [0];
                _t.push(dataset[0]);
                _t.push(0);
                _t.push(0);
                dataset = _t;
            }
            var svg = d3.select("svg[class='graph column_" + i + "']");
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function (d, i) { return i * 22 + 7; })
                .attr("y", function (d) { return h - d; })
                .attr('class', 'bar')
                .attr('height', function (d) { return d - 4; })
                .attr("width", (w / dataset.length - 6));
            svg.append('rect')
                .attr("x", 3)
                .attr("y", 3)
                .attr('width', w - 6)
                .attr('height', h - 6)
                .attr('stroke', "black")
                .attr('fill', 'none')
                .attr('stroke-width', "1");
        }
    }
    function serialize_result_to_html(result) {
        var _html = "<div id='result_wrapper'>";
        if (Object.keys(result).indexOf('output') >= 0) {
            _html += "<h2 style='border-left: solid 35px midnightblue;padding-left: 8px;'>Model Evaluation</h2>";
            _html += "<table class='result_table machine_learning_result'>";
            var ml_output = result['output'];
            var keys = Object.keys(ml_output);
            _html += "<tr class='metrics'>";
            for (var i = 0; i < keys.length; i++) {
                _html += "<th>" + keys[i] + "</th>";
            }
            _html += "</tr><tr>";
            for (var i = 0; i < keys.length; i++) {
                _html += "<th>" + ml_output[keys[i]] + "</th>";
            }
            _html += "</tr></table>";
        }
        _html += "<h2 style='border-left: solid 35px midnightblue;padding-left: 8px;'></i>Statistics</h2>";
        _html += "<table class='result_table'>";
        _html += "<tr><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
        for (var i = 0; i < result['feature_names'].length; i++) {
            _html += "<th><svg class='graph column_" + i + "'></svg></th>";
        }
        _html += "</tr>";
        _html += '<tr class="metrics">';
        _html += "<th>Statistics</th>";
        for (var i = 0; i < result['feature_names'].length; i++) {
            _html += "<th>" + result['feature_names'][i] + "</th>";
        }
        _html += "</tr>";
        _html += "<tr class='result_row static_results'>";
        _html += "<th>Std Deviation</th>";
        for (var i = 0; i < result['std'].length; i++) {
            _html += "<th>" + result['std'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>75 Quartile</th>";
        for (var i = 0; i < result['75_quartile'].length; i++) {
            _html += "<th>" + result['75_quartile'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>50 Quartile</th>";
        for (var i = 0; i < result['50_quartile'].length; i++) {
            _html += "<th>" + result['50_quartile'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>25 Quartile</th>";
        for (var i = 0; i < result['25_quartile'].length; i++) {
            _html += "<th>" + result['25_quartile'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>Max</th>";
        for (var i = 0; i < result['max'].length; i++) {
            _html += "<th>" + result['max'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>Mean</th>";
        for (var i = 0; i < result['mean'].length; i++) {
            _html += "<th>" + result['mean'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>Median</th>";
        for (var i = 0; i < result['median'].length; i++) {
            _html += "<th>" + result['median'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>Min</th>";
        for (var i = 0; i < result['min'].length; i++) {
            _html += "<th>" + result['min'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>Missing Values</th>";
        for (var i = 0; i < result['missing_values'].length; i++) {
            _html += "<th>" + result['missing_values'][i] + "</th>";
        }
        _html += "</tr><tr class='result_row static_results'>";
        _html += "<th>Unique Values</th>";
        for (var i = 0; i < result['unique_values'].length; i++) {
            _html += "<th>" + result['unique_values'][i] + "</th>";
        }
        _html += "</tr><tr class='metrics static_results'><td></td>";
        for (var i = 0; i < result['feature_names'].length; i++) {
            _html += "<th>" + result['feature_names'][i] + "</th>";
        }
        _html += "</tr>";
        for (var i = 0; i < result['data'].length; i++) {
            _html += "<tr class='result_row'><th></th>";
            for (var j = 0; j < result['data'][i].length; j++) {
                _html += "<th>" + result['data'][i][j] + "</th>";
            }
            _html += "</tr>";
        }
        _html += "</table></div>";
        return _html;
    }
});
function description_addrow() {
    $(".add_row_form").empty();
    _uploaded_file_as_arrays[0];
    console.log(_uploaded_file_as_arrays[0]);
    if (_uploaded_file_as_text == "") {
        return;
    }
    for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
        $(".add_row_form").append('<li class="add_row column_' + i + '" style="padding-top: 10px"></li>');
        $(".add_row_form li.column_" + i).append('<p>' + _uploaded_file_as_arrays[0][i] + '<p/>');
        $("<input/>", {
            "class": "add_row form-control floating-label" + " _column_" + i,
            id: "_column_" + i,
            type: "text",
            placeholder: "value"
        }).appendTo(".add_row_form li.column_" + i);
    }
}
function description_formula() {
    $("#formula_column").empty();
    if (_uploaded_file_as_text == "") {
        return;
    }
    for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
        $("#formula_column").append('<option value="' + i + '">' + _uploaded_file_as_arrays[0][i] + '</option>');
    }
}
function description_normalization() {
    $("#normalization_column").empty();
    if (_uploaded_file_as_text == "") {
        return;
    }
    for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
        $("#normalization_column").append('<option value="' + i + '">' + _uploaded_file_as_arrays[0][i] + '</option>');
    }
}
function description_machine_learning() {
    $('.machine_learning_target').empty();
    if (_uploaded_file_as_text == "") {
        return;
    }
    for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
        $('.machine_learning_target').append('<option value="' + i + '">' + _uploaded_file_as_arrays[0][i] + '</option>');
    }
}
function description_metadata() {
    $("#metadata_discriptions").empty();
    if (_uploaded_file_as_text == "") {
        return;
    }
    for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
        $("#metadata_discriptions").append('<div class="row meta_' + i + '" style="padding-top:25px;"></div>');
        $("#metadata_discriptions div.meta_" + i).append('<p>' + _uploaded_file_as_arrays[0][i] + '</p>');
        $("#metadata_discriptions div.meta_" + i)
            .append('<select class="form-control metadata column' + i + '" id="formula_method select"><option>string</option><option>integer</option><option>categorical</option></select>');
    }
}
var ComponentController = (function () {
    function ComponentController() {
        ComponentController.active_menu = null;
    }
    ComponentController.activate_menubar = function (elm) {
        this._activate_menubar(elm);
    };
    ComponentController._activate_menubar = function (elm) {
        menubar = $('li.' + elm);
        description = $('.detail.' + elm);
        menubar
            .css("background-color", "#1e8cff")
            .css("color", "white");
        description.toggle("slide", { direction: "left" }, 700);
        if (this._active_menu === null) {
            this._active_menu = elm;
            return (menubar.addClass("active"));
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
        previous_menubar = $('li.' + this._active_menu);
        previous_description = $('.detail.' + this._active_menu);
        previous_description.toggle("slide");
        previous_menubar
            .css("background-color", "")
            .css("color", "")
            .removeClass("active");
        this._active_menu = elm;
        return (menubar.addClass("active"));
    };
    ComponentController.create_input_component = function () {
        var node = new InputData();
        var params = {
            file_name: _uploaded_file_name,
            text_data: _uploaded_file_as_text
        };
        node.create_request(params);
    };
    ComponentController.create_add_row_component = function () {
        var node = new AddRow();
        var request_text = "[";
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            request_text += "\"" + $(".add_row._column_" + i).val() + "\",";
        }
        request_text = request_text.slice(0, request_text.length - 1);
        request_text += "]";
        var params = {
            values: request_text
        };
        node.create_request(params);
    };
    ComponentController.create_math_fomula_component = function () {
        var node = new MathFormula();
        var method = $('select#formula_method').val();
        var column_num = $('select#formula_column').val();
        var constant = $('#formula_constant').val();
        var params = {
            component_type: "Column",
            component_id: column_num,
            op_type: method,
            op_constant: constant
        };
        node.create_request(params);
    };
    ComponentController.create_normalization_component = function () {
        var node = new Normalization();
        var method = $('select#normalization_method').val();
        var column_num = $('select#normalization_column').val();
        var params = {
            component_type: "Column",
            component_id: column_num,
            op_type: method
        };
        node.create_request(params);
    };
    ComponentController.create_projection_component = function () {
        /* TODO: [refactor] projection to column_selection */
        var node = new ColumnSelection();
        var len = $('.projection_selects').length;
        var projection_columns = "[";
        for (var i = 0; i < len; i++) {
            console.log($('.projection_selects._selects_' + i).val());
            projection_columns += $('.projection_selects._selects_' + i).val() + ",";
        }
        projection_columns = projection_columns.slice(0, projection_columns.length - 1);
        projection_columns += "]";
        var params = {
            component_id: projection_columns
        };
        node.create_request(params);
    };
    ComponentController.create_remove_duplicates_component = function () {
        var node = new RemoveDuplicates();
        var len = $('.remove_duplicates_selects').length;
        var remove_duplicates_columns = "[";
        for (var i = 0; i < len; i++) {
            console.log($('.remove_duplicates_selects._selects_' + i).val());
            remove_duplicates_columns += $('.remove_duplicates_selects._selects_' + i).val() + ",";
        }
        remove_duplicates_columns = remove_duplicates_columns.slice(0, remove_duplicates_columns.length - 1);
        remove_duplicates_columns += "]";
        RemoveDuplicatesComponentCreateParams = {
            component_id: remove_duplicates_columns
        };
        node.create_request(params);
    };
    ComponentController.create_remove_missing_value_component = function () {
        var node = new RemoveMissingValues();
        var method = $('#remove_missing_value_method').val();
        var params = {
            op_action: method //"Replace_mean" or Drop_row
        };
        node.create_request(params);
    };
    ComponentController.create_metadata_component = function () {
        var node = new MetadataEditor();
        var metadata_types = "[";
        for (var i = 0; i < _uploaded_file_as_arrays[0].length; i++) {
            console.log($(".metadata.column" + i).val());
            metadata_types += "\"" + $(".metadata.column" + i).val() + "\",";
        }
        metadata_types = metadata_types.slice(0, metadata_types.length - 1);
        metadata_types += "]";
        var params = {
            column_type: metadata_types
        };
        node.create_request(params);
    };
    ComponentController.create_machine_learning_component = function () {
        var node = new MachineLearning();
        var argo = $('.machine_learning_select').val();
        var target = $('.machine_learning_target').val();
        var parcentage = $('.machine_learning_target_parcentage').val();
        var params = {
            model_type: argo,
            train_data_percentage: parcentage,
            target_column: target
        };
        node.create_request(params);
    };
    return ComponentController;
})();
var Manager = new ComponentController();
//# sourceMappingURL=whiteboard.js.map