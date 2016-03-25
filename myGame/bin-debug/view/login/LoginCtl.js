var LoginCtl = (function (_super) {
    __extends(LoginCtl, _super);
    function LoginCtl() {
        _super.apply(this, arguments);
    }
    var d = __define,c=LoginCtl,p=c.prototype;
    p.onComplete = function () {
        _super.prototype.onComplete.call(this);
        this.loginBtn.setLab("login");
        this.loginBtn.setBkg("button_green");
        this.loginBtn.setClkFun(this.onButtonClick, this);
        this.loginBtn1.setLab("login");
        this.loginBtn1.setBkg("button_blue");
        this.loginBtn1.setClkFun(Server.clean, this);
        //        nest.user.checkLogin({},function(data:any){
        //            if(data.token){
        //                console.log(data.token);
        //            }else{
        //                console.log("登陆失败")
        //            }
        //        });
    };
    p.onButtonClick = function (e) {
        var userName = this.loginLab.text;
        HttpMsg.instance.send(HttpMsgCMD.LOGIN, { userName: userName }, this.loginSuccess, this); //请求登陆
    };
    p.loginSuccess = function (data) {
        if (data.ret == 0) {
            UserInfo.ins.parserLoginInfo(data);
            LoadMag.instance.load("mainScene", function () {
                PopUpMag.ins().showWin(WinName.MAIN_SCENE, 1, false, null, PopUpMag.LAYER_SCENE);
                PopUpMag.ins().remove(this.name);
            }, this);
        }
        else {
            //请求失败
            var errorStr = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    };
    p.close = function () {
        _super.prototype.close.call(this);
        this.loginBtn.clean();
    };
    return LoginCtl;
})(ViewCtl);
egret.registerClass(LoginCtl,'LoginCtl');
