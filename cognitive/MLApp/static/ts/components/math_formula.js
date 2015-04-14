var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MathFormula = (function (_super) {
    __extends(MathFormula, _super);
    function MathFormula() {
        console.log("----------------");
        _super.call(this, {
            "name": "Math Formula",
            "width": 0,
            "height": 0,
            "input": 1,
            "output": 1
        });
        console.log("==================");
    }
    return MathFormula;
})(ComponentBase);
//# sourceMappingURL=math_formula.js.map