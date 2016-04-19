class LoginCtl extends ViewCtl {

    private loginBtn: BaseBtn;
    private loginBtn1: BaseBtn;
    private loginLab: eui.Label;

    public onComplete(): void {
        super.onComplete();
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
    }

    private onButtonClick(e: egret.TouchEvent) {
        var userName:string = this.loginLab.text;
        var password:string = this.loginLab.text;
        HttpMsg.instance.send(HttpMsgCMD.LOGIN, {userName:userName, password:password}, this.loginSuccess, this);//请求登陆
    }

    private loginSuccess(data:any):void{
        if(data.ret == 0){
            UserInfo.ins.parserLoginInfo(data);
            LoadMag.instance.load("mainScene",function():void{
                PopUpMag.ins().showWin(WinName.MAIN_SCENE, 1, false, null, PopUpMag.LAYER_SCENE);
                PopUpMag.ins().remove(this.name);
            },this);
        }else{
            //请求失败
            var errorStr:string = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    }

    public close():void{
        super.close();
        this.loginBtn.clean();
    }




}