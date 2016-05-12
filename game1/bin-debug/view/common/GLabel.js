var GLabel = (function (_super) {
    __extends(GLabel, _super);
    function GLabel() {
        _super.call(this);
        this.textColor = Global.COLOR_FORE;
        this.size = Global.FS_20;
    }
    var d = __define,c=GLabel,p=c.prototype;
    return GLabel;
}(eui.Label));
egret.registerClass(GLabel,'GLabel');
