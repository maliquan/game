var BaseBtn = (function (_super) {
    __extends(BaseBtn, _super);
    function BaseBtn() {
        _super.call(this);
        this.touchChildren = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
    }
    var d = __define,c=BaseBtn,p=c.prototype;
    p.setLab = function (language) {
        this.label.text = LangMag.instance.getText(language);
    };
    p.setBkg = function (bkg) {
        this.bkg.texture = RES.getRes(bkg);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameUtils.setAnchor(this, 0.5, 0.5);
    };
    p.setClkFun = function (fun, thisObj) {
        this.fun = fun;
        this.thisObj = thisObj;
    };
    p.downHandler = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.clkHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancleHandler, this);
        this.scaleX = this.scaleY = 1.2;
    };
    p.clkHandler = function (e) {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.clkHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancleHandler, this);
        this.scaleX = this.scaleY = 1;
        if (this.fun) {
            this.fun.call(this.thisObj, e);
        }
    };
    p.cancleHandler = function (e) {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.clkHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancleHandler, this);
        this.scaleX = this.scaleY = 1;
    };
    p.clean = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
    };
    return BaseBtn;
})(eui.Component);
egret.registerClass(BaseBtn,'BaseBtn');
