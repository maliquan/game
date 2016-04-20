var LoginCtl = (function (_super) {
    __extends(LoginCtl, _super);
    function LoginCtl() {
        _super.call(this);
        this.sayPanel = new SayPanel();
        this.addChild(this.sayPanel);
        this.sayPanel.startSay(this.sayOverHandler, this);
    }
    var d = __define,c=LoginCtl,p=c.prototype;
    p.sayOverHandler = function () {
        var titleStr = LangMag.instance.getText("loginTitile");
        var content = LangMag.instance.getText("loginContent");
        var btnLabel1 = LangMag.instance.getText("shi");
        var btnLabel2 = LangMag.instance.getText("fou");
        PopUpMag.ins().showWin(WinName.TIP_DIALOG, 5, true, [titleStr, content, btnLabel1, btnLabel2]);
    };
    p.onButtonClick = function (e) {
        //        HttpMsg.instance.send(HttpMsgCMD.LOGIN, {userName:userName, password:password}, this.loginSuccess, this);//请求登陆
    };
    p.loginSuccess = function (data) {
        if (data.ret == 0) {
            UserInfo.ins.parserLoginInfo(data);
            LoadMag.instance.load("mainScene", function () {
                //                PopUpMag.ins().shoe(this.name);
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
