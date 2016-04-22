var LoginCtl = (function (_super) {
    __extends(LoginCtl, _super);
    function LoginCtl() {
        _super.call(this);
        this.showStr = "";
        //--------------------------------------------
        var fs = new FightScene();
        this.addChild(fs);
        fs.init(Global.STAGE_W * 0.2, Global.STAGE_H * 0.3, 1);
        fs.x = Global.STAGE_W * 0.5 - fs.width * 0.5;
        fs.y = Global.STAGE_H * 0.5 - fs.height * 0.5;
        return;
        //--------------------------------------------
        var sayPanel = new SayPanel();
        this.addChild(sayPanel);
        sayPanel.startSay(this.sayOverHandler, this);
    }
    var d = __define,c=LoginCtl,p=c.prototype;
    p.sayOverHandler = function () {
        var titleStr = LangMag.instance.getText("loginTitile");
        var content = LangMag.instance.getText("loginContent");
        var btnLabel1 = LangMag.instance.getText("shi");
        var btnLabel2 = LangMag.instance.getText("fou");
        PopUpMag.ins().showWin(WinName.TIP_DIALOG, 5, true, [titleStr, content, btnLabel1, btnLabel2, this.clkHandler, this]);
    };
    p.clkHandler = function (str) {
        this.showStr = str;
        this.startBlack();
        PopUpMag.ins().remove(WinName.TIP_DIALOG);
    };
    p.startBlack = function () {
        var circleSp = new egret.Shape();
        circleSp.graphics.beginFill(0x000000);
        circleSp.graphics.drawCircle(0, 0, 1);
        circleSp.graphics.endFill();
        this.addChild(circleSp);
        var that = this;
        circleSp.x = Global.STAGE_W * 0.5;
        circleSp.y = Global.STAGE_H * 0.5;
        circleSp.alpha = 0;
        var scaleNum = Math.max(Global.STAGE_W, Global.STAGE_H) * 0.6;
        egret.Tween.get(circleSp).to({ scaleX: scaleNum, scaleY: scaleNum, alpha: 1 }, 1000, egret.Ease.sineOut)
            .call(function () {
            that.startWrite();
        }, this);
    };
    p.startWrite = function () {
        this.writeCircleSp = new egret.Shape();
        this.writeCircleSp.graphics.beginFill(0xffffff);
        this.writeCircleSp.graphics.drawCircle(0, 0, 1);
        this.writeCircleSp.graphics.endFill();
        this.addChild(this.writeCircleSp);
        var that = this;
        this.writeCircleSp.x = Global.STAGE_W * 0.5;
        this.writeCircleSp.y = Global.STAGE_H * 0.5;
        this.writeCircleSp.alpha = 0;
        var scaleNum = Math.max(Global.STAGE_W, Global.STAGE_H) * 0.2;
        egret.Tween.get(this.writeCircleSp).to({ scaleX: scaleNum, scaleY: scaleNum, alpha: 1 }, 500, egret.Ease.sineIn)
            .call(function () {
            var titleStr = LangMag.instance.getText("loginTitle2");
            var content = that.showStr;
            var btnLabel = LangMag.instance.getText("sure");
            PopUpMag.ins().showWin(WinName.LOGIN_DIALOG, 5, false, [titleStr, content, btnLabel, that.regiestHandler, that]);
        }, this);
    };
    p.regiestHandler = function (userName, password) {
        HttpMsg.instance.send(HttpMsgCMD.LOGIN, { userName: userName, password: password }, this.loginSuccess, this); //请求登陆
    };
    p.loginSuccess = function (data) {
        if (data.ret == 0) {
            console.log("login success");
            PopUpMag.ins().remove(WinName.LOGIN_DIALOG);
            var that = this;
            var scaleNum = Math.max(Global.STAGE_W, Global.STAGE_H) * 0.6;
            egret.Tween.get(this.writeCircleSp).to({ scaleX: scaleNum, scaleY: scaleNum, alpha: 1 }, 500, egret.Ease.sineIn)
                .call(function () {
                that.removeChildren();
                PopUpMag.ins().remove(WinName.LOGIN);
                PopUpMag.ins().showWin(WinName.MAIN_SCENE);
            }, this);
        }
        else {
            //请求失败
            var errorStr = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    };
    return LoginCtl;
}(ViewCtl));
egret.registerClass(LoginCtl,'LoginCtl');
