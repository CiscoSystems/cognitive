interface ComponentInfo extends Object {
    name:string; width:number; height:number; input: number; output:number;
}

class ComponentBase {

    //authentication

    private _id: number;
    private name: string;
    private width: number;
    private height: number;
    private backend_id: number;
    private x: number;
    private y: number;
    private avilable_input_links: number;
    private avilable_output_links: number;
    private enter_path;
    private leave_path;
    static add_btn: any;
    static edit_btn: any;

    static function_layer: any;
    static component_layer: any;
    static connection_layer: any;
    static scope_layer: any;

    static component_list: any = [];
    static current_focus: any = null;

    static generate_component_id = (function(){
        var gen = 1;
        return function(){ return gen++;}
    })();

    constructor(params: ComponentInfo) {

        this._id = ComponentBase.generate_component_id();
        this.name = params.name;
        this.width = 180;
        this.height = 40;
        this.backend_id = 0;
        this.x = 0;
        this.y = 0;
        this.avilable_input_links = params.input;
        this.avilable_output_links = params.output;
        this.enter_path = null; // should be number?
        this.leave_path = null;

        ComponentBase.function_layer= ViewController.functionality_layer;
        ComponentBase.component_layer = ViewController.component_layer;
        ComponentBase.connection_layer = ViewController.connection_layer;
        ComponentBase.scope_layer = ViewController.scope_layer;

        this.render_component();
        this.render_scope();
        this.render_functions();

        ComponentBase.component_list.push(this);

        console.log("Current Components:", ComponentBase.component_list);
    }

    private render_component() {

        // Just adding an element of randomity so things don't appear on top of each other.
        this.x = $('.detail').width() + (Math.random() * 400);
        this.y = 50 + (Math.random() * 400);

        // Lets compensate for smaller window widths, just in case.
        if (this.x > window.innerWidth - 350) { this.x = window.innerWidth - 500; console.log("Too big, making " + this.x);}
        if (this.y > window.innerHeight) { this.y = window.innerHeight - 300;}

        var svg = d3.selectAll(ComponentBase.component_layer);
        var _click = this._click;
        var g = svg.append('g')
            .attr('class', 'node-group')
            .attr('x', 0)
            .attr('y', 0)
            .attr('abs_x', this.x)
            .attr('abs_y', this.y)
            .attr('id', 'node-group-' + this._id)
            .call(d3.behavior.drag().on("drag", this._drag))
            .on("click", function () {_click(this)})
            .on("mouseenter", function() {
                var id = this.id.split("-")[2];
                $("#close-icon-id-" + id).css("display", "block");
                $("#edit-icon-id-" + id).css("display", "block");
            });

        g.append('rect')
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width',  this.width)
            .attr('height', this.height)
            .attr('class', "node base-node")
            .attr('stroke', "steelblue" )
            .attr('stroke-width', "3" );

        g.append('text')
            .attr('x', this.x + 90)
            .attr('y', this.y + 25)
            .attr('fill', 'black')
            .style('stroke-width', 1)
            .style({"font-size":"14px","z-index":"9999999"} )
            .style('text-anchor', "middle")
            .text(this.name);

        if (this.avilable_input_links > 0) {
            g.append('circle')
                .attr('cx', this.x + 90)
                .attr('cy', this.y)
                .attr('r', 4)
                .attr('fill', '#fd8d3c')
                .style('stroke-width', 1);
        }

        if (this.avilable_output_links > 0) {
            g.append('circle')
                .attr('cx', this.x + 90 )
                .attr('cy', this.y + 40 )
                .attr('r', 4 )
                .attr('fill', '#5264ae')
                .style('stroke-width', 1);
        }
    }

    private render_scope() {
        var scope = d3.selectAll(ComponentBase.scope_layer)
            .append('g').attr('id', "scope-group-" + this._id)
            .on("mouseleave", function(){
                var id = this.id.split("-")[2];
                $("#close-icon-id-" + id).css("display", "none");
                $("#edit-icon-id-" + id).css("display", "none");
            });

        scope.append('rect')
            .attr('x', this.x - 35)
            .attr('y', this.y - 35)
            .attr('width',  this.width + 70)
            .attr('height', this.height + 70)
            .attr('class', "scope")
            .attr('id', "scope-" + this._id)
            .attr('fill', 'white');
    }

    private render_functions() {
        var svg = d3.selectAll(ComponentBase.function_layer);
        var g = svg.append('g').attr('id', 'functionality-group-' + this._id);
        var _eliminate = this.eliminate;

        g.append('text')
            .attr('x',this.x - 20)
            .attr('y', this.y - 5)
            .attr('class', 'fa-icon close-icon')
            .attr('id', 'close-icon-id-' + this._id)
            .text('\uf00d')  // icon: fa-close
            .on("click",  this.eliminate.bind(this) )
            .on("mouseenter", function(){
                $(this).css("display", "block");
                var id = $(this).attr("id").split("-")[3];
                $("#edit-icon-id-" + id).css("display", "block");

            });

        g.append('text')
            .attr('x',this.x)
            .attr('y', this.y - 5)
            .attr('class', 'fa-icon edit-icon')
            .attr('id', 'edit-icon-id-' + this._id)
            .text('\uf044') // icon: fa-edit
            .on("click", this.click_edit.bind(this))
            .on("mouseenter", function(){
                $(this).css("display", "block");
                var id = $(this).attr("id").split("-")[3];
                $("#close-icon-id-" + id).css("display", "block");
            });
    }

    public click_edit(e) {
        console.log("click_edit function is not implemented");
    }

    public update(): void {
        var id = this.get_id();
        var node =  $("#node-group-" +id+ " > .node ");
        node.attr("class", node.attr("class").replace(/processed/g, ""));
    }

    private _drag() {

        var group = d3.select(this);
        var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
        var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);

        group.attr('x', sx).attr('y', sy)
            .attr('transform', 'translate(' + sx + ',' + sy + ')');

        d3.selectAll('g[from_id="' + group.attr('id') + '"]').selectAll('line')
            .attr('x1', sx + parseInt(group.attr('abs_x')) + 90)
            .attr('y1', sy + parseInt(group.attr('abs_y')) + 40);

        d3.selectAll('g[to_id="' + group.attr('id') + '"]').selectAll('line')
            .attr('x2', sx + parseInt(group.attr('abs_x')) + 90)
            .attr('y2', sy + parseInt(group.attr('abs_y')));

        var node_id = group.attr('id').split("-")[2];
        var scope = d3.selectAll($('#scope-' + node_id));

        scope
            .attr('x', sx - 30 + parseInt(group.attr('abs_x')))
            .attr('y', sy - 30 + parseInt(group.attr('abs_y')));

        var functionality_group = d3.selectAll($('#close-icon-id-' + node_id));

        functionality_group
            .attr('x', sx - 20 + parseInt(group.attr('abs_x')))
            .attr('y', sy - 5 + parseInt(group.attr('abs_y')));

        var edit_icon = d3.selectAll($('#edit-icon-id-' + node_id));

        edit_icon
            .attr('x', sx + parseInt(group.attr('abs_x')))
            .attr('y', sy - 5 + parseInt(group.attr('abs_y')));
    }

    private _click(e) {

        // following procedures should be separate function like: focus_on(elm)

        $("#whiteboard-right-menu").toggle("slide", {direction: "right"}, 300);
        console.log("------------------------");

        if (d3.event.defaultPrevented) return;

        var component = d3.select(e);

        if (ComponentBase.current_focus == null) {
            component.classed('clicked', true);
            ComponentBase.current_focus = component;
            return;
        }

        if (ComponentBase.current_focus.attr('id') == component.attr('id')) {
            component.classed('clicked', false);
            ComponentBase.current_focus = null;
            return;
        }

        var svg = d3.selectAll(ComponentBase.connection_layer);
        var g = svg.append('g')
            .attr('from_id', ComponentBase.current_focus.attr('id'))
            .attr('to_id', component.attr('id'));

        var line  = g.append("line")
            .attr('x1',  parseInt(ComponentBase.current_focus.attr('x')) +  parseInt(ComponentBase.current_focus.attr('abs_x')) + 90)
            .attr('y1',  parseInt(ComponentBase.current_focus.attr('y')) +  parseInt(ComponentBase.current_focus.attr('abs_y')) + 40)
            .attr('x2',  parseInt(component.attr('x')) +  parseInt(component.attr('abs_x'))+ 90)
            .attr('y2',  parseInt(component.attr('y')) +  parseInt(component.attr('abs_y')))
            .attr("stroke", "gray")
            .attr('stroke-width', 2);

        var current_focus_node_id = ComponentBase.current_focus.attr('id').split("-")[2];
        var next_node_id = component.attr('id').split("-")[2];

        ComponentBase.find_by_id(current_focus_node_id).setOutputPath(g);
        ComponentBase.find_by_id(next_node_id).setInputPath(g);
        ComponentBase.current_focus.classed('clicked', false);

        component.classed('clicked', false);
        ComponentBase.current_focus = null;
    }

    public eliminate() {
        var id = this._id;
        ComponentBase.current_focus = null;

        $('#scope-group-' + id).remove();
        $('#node-group-' + id).remove();
        $('g[from_id="' + "node-group-" + id +'"]').remove();
        $('g[to_id="' + "node-group-" + id +'"]').remove();
        $('#functionality-group-' + id).remove();

        ComponentBase.remove_by_id(id);

        console.log("Current Components:", ComponentBase.component_list);

        this.delete_request();

        return false;
    }

    public processed () {
        var id = this.get_id();
        var node = $("#node-group-" + id + " > .node");

        node.attr("class", node.attr("class") + " processed");
    }

    public delete_request() {
        /* you should overwrite this function
         * this function is called when remove button of the UI is clicked */
        console.log("delete_request function is not implemented");
    }

    static find_by_id(id): any {
        for (var i=0; i < ComponentBase.component_list.length; i++) {
            if (ComponentBase.component_list[i].get_id() == id) {
                return ComponentBase.component_list[i];
            }
        }
        return null;
    }

    static find_by_key_value(obj): any {
        var key = Object.keys(obj);
        for (var i = 0; i < ComponentBase.component_list.length; i++) {
            if (ComponentBase.component_list[i][key] == obj[key]) {
                return ComponentBase.component_list[i];
            }
        }
        return null;
    }

    static remove_by_id(id): void {
        var list_idx = ComponentBase._get_idx_from_id(id);
        if (list_idx > -1) {
            ComponentBase.component_list.splice(list_idx, 1);
        }
    }

    static _get_idx_from_id(id):number {
        var comp = ComponentBase.find_by_id(id);
        return ComponentBase.component_list.indexOf(comp);
    }

    public get_id(): number {
        return this._id;
    }

    static get_current_focus_component() {
        var id = ComponentBase.current_focus[0][0].id.split("-")[2];
        return ComponentBase.find_by_id(id);
    }

    static get_workflow_from(id) {

        var component_list = [];
        var start_component = ComponentBase.find_by_id(id);
        var i = start_component;

        while (true) {
            component_list.push(i);
            console.log("component_list: ", component_list);
            if (i.getOutputPath() == null || i.getOutputPath() == undefined) break;
            var _output_obj = i.getOutputPath()
            var next_id = _output_obj.attr("to_id").split("-")[2]
            i = ComponentBase.find_by_id(next_id)
        }

        return component_list;
    }

    public set_backend_id(id): void {
        this.backend_id = id;
    }

    public get_backend_id(): number {
        return this.backend_id;
    }

    static _send_request(api_url: string, method: string, json_data, node): void {

        /* authentication information */
        json_data["user_id"] = 1;
        json_data["token"] = "token";
        json_data["experiment"] = 1;

        if (method === "DELETE") {
            $.ajax({ url:  api_url, type: method, data: json_data,
                success: function() {}
            });
            return;
        }

        $.ajax({
            url:  api_url,
            type: method,
            data: json_data,
            success: function(result) {
                console.log(result);
                if (method === "PUT") { return ;}
                if (node !== null){ node.set_backend_id(result.id);}
            }
        });
    }

    /* TODO: [refactor] the function names bellow */
    public getInputPath(){
        return this.enter_path;
    }

    public setInputPath(g){
        this.enter_path = g;
    }

    public setOutputPath(g){
        this.leave_path = g;
    }

    public getOutputPath() {
        return this.leave_path;
    }

    static get_add_btn() {
        return this.add_btn
    }

    static get_edit_btn() {
        return this.edit_btn;
    }
}