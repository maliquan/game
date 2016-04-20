var SayPanel = (function (_super) {
    __extends(SayPanel, _super);
    function SayPanel() {
        _super.call(this);
        this.sayArr = [];
        this.sayLab = new GLabel();
        this.sayLab.width = Global.STAGE_W * 0.8;
        this.sayLab.height = Global.STAGE_H * 0.6;
        this.sayLab.x = Global.STAGE_W * 0.5 - this.sayLab.width * 0.5;
        this.sayLab.y = Global.STAGE_H * 0.5 - this.sayLab.height * 0.5;
        this.sayLab.textColor = Global.COLOR_FORE;
        this.addChild(this.sayLab);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    }
    var d = __define,c=SayPanel,p=c.prototype;
    p.startSay = function (sayOverFun, thisObject) {
        this.sayOverFun = sayOverFun;
        this.sayOverThisObject = thisObject;
        var sayStr = LangMag.instance.getText("loginSay");
        this.sayArr = sayStr.split("");
        this.sayArr.reverse();
        TimerMag.instance.add(this.saying, this, 100);
    };
    p.saying = function () {
        this.sayLab.scrollV = this.sayLab.numLines - 10;
        if (this.sayArr.length > 0) {
            this.sayLab.text += this.sayArr.pop();
        }
        else {
            this.stopSay();
        }
    };
    p.stopSay = function () {
        if (this.sayOverFun) {
            TimerMag.instance.remove(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
            this.sayOverFun.call(this.sayOverThisObject);
            this.sayOverFun = null;
        }
    };
    p.tapHandler = function (e) {
        for (var i = 0; i < 10; i++) {
            this.saying();
        }
    };
    return SayPanel;
}(egret.Sprite));
egret.registerClass(SayPanel,'SayPanel');
