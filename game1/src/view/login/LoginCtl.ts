class LoginCtl extends ViewCtl {

    private sayPanel:SayPanel;

    public constructor(){
        super();

        this.sayPanel = new SayPanel();
        this.addChild(this.sayPanel);
        this.sayPanel.startSay(this.sayOverHandler, this);
    }

    private sayOverHandler():void{
        var titleStr:string = LangMag.instance.getText("loginTitile");
        var content:string = LangMag.instance.getText("loginContent");
        var btnLabel1:string = LangMag.instance.getText("shi");
        var btnLabel2:string = LangMag.instance.getText("fou");
        PopUpMag.ins().showWin(WinName.TIP_DIALOG, 5, true, [titleStr, content, btnLabel1, btnLabel2]);
    }

    private onButtonClick(e: egret.TouchEvent) {
//        HttpMsg.instance.send(HttpMsgCMD.LOGIN, {userName:userName, password:password}, this.loginSuccess, this);//请求登陆
    }

    private loginSuccess(data:any):void{
        if(data.ret == 0){
            UserInfo.ins.parserLoginInfo(data);
            LoadMag.instance.load("mainScene",function():void{
//                PopUpMag.ins().shoe(this.name);
            },this);
        }else{
            //请求失败
            var errorStr:string = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    }




}