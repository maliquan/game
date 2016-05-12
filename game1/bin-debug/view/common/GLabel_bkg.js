var GLabel_bkg = (function (_super) {
    __extends(GLabel_bkg, _super);
    function GLabel_bkg(parent, posx, posy) {
        _super.call(this);
        this.size = Global.FS_20;
        this.textColor = Global.COLOR_FORE;
        this.background = true;
        this.backgroundColor = Global.COLOR_BACK;
        this.x = posx;
        this.y = posy;
        parent.addChild(this);
    }
    var d = __define,c=GLabel_bkg,p=c.prototype;
    return GLabel_bkg;
}(eui.Label));
egret.registerClass(GLabel_bkg,'GLabel_bkg');
