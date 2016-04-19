var MainTop = (function (_super) {
    __extends(MainTop, _super);
    function MainTop() {
        _super.call(this);
    }
    var d = __define,c=MainTop,p=c.prototype;
    p.init = function () {
        this.foodBtn.iconImg.texture = RES.getRes("food_btn");
        this.goldBtn.iconImg.texture = RES.getRes("gold_btn");
        this.diamondBtn.iconImg.texture = RES.getRes("diamond_btn");
    };
    p.show = function () {
        var userInfo = UserInfo.ins;
        this.foodBtn.lab.text = userInfo.foodNum + "";
        this.goldBtn.lab.text = userInfo.goldNum + "";
        this.diamondBtn.lab.text = userInfo.diamondNum + "";
    };
    return MainTop;
}(eui.Component));
egret.registerClass(MainTop,'MainTop');
