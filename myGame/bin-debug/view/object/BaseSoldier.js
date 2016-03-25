var BaseSoldier = (function (_super) {
    __extends(BaseSoldier, _super);
    function BaseSoldier() {
        _super.call(this);
        this.texture = this.getRes();
        this.width = 30;
        this.height = 30;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
    }
    var d = __define,c=BaseSoldier,p=c.prototype;
    p.getRes = function () {
        var random = Math.random();
        var res = "";
        if (random < 0.2) {
            res = "role1";
        }
        else if (random < 0.4) {
            res = "role2";
        }
        else if (random < 0.6) {
            res = "role3";
        }
        else if (random < 0.8) {
            res = "role4";
        }
        else if (random < 0.9) {
            res = "role5";
        }
        else if (random < 1) {
            res = "role6";
        }
        return RES.getRes(res);
    };
    return BaseSoldier;
})(eui.Image);
egret.registerClass(BaseSoldier,'BaseSoldier');
