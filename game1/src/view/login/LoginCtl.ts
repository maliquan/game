class LoginCtl extends ViewCtl {

    private showStr:string = "";
    private writeCircleSp:egret.Shape;
    private sayPanel:SayPanel;

    public constructor(){
        super();

        this.sayPanel = new SayPanel();
        this.addChild(this.sayPanel);
        this.startBlack();
    }

//    private sayOverHandler():void{
//        var titleStr:string = LangMag.instance.getText("loginTitile");
//        var content:string = LangMag.instance.getText("loginContent");
//        var btnLabel1:string = LangMag.instance.getText("shi");
//        var btnLabel2:string = LangMag.instance.getText("fou");
//        PopUpMag.ins().showWin(WinName.TIP_DIALOG, 5, true, [titleStr, content, btnLabel1, btnLabel2, this.clkHandler, this]);
//    }

//    private clkHandler(str:string):void{
//        this.showStr = str;
//        this.startBlack();
//        PopUpMag.ins().remove(WinName.TIP_DIALOG);
//    }

    private startBlack():void{
        var circleSp:egret.Shape = new egret.Shape();
        circleSp.graphics.beginFill(0x000000);
        circleSp.graphics.drawCircle(0,0, 1);
        circleSp.graphics.endFill();
        this.addChild(circleSp);

        var that = this;
        circleSp.x = Global.STAGE_W*0.5;
        circleSp.y = Global.STAGE_H*0.5;
        circleSp.alpha = 0;
        var scaleNum:number = Math.max(Global.STAGE_W, Global.STAGE_H) * 0.6;
        egret.Tween.get(circleSp).to({scaleX:scaleNum, scaleY:scaleNum, alpha:1}, 1000, egret.Ease.sineOut)
            .call(function(){
                that.startWrite();
            }, this);
    }

    private startWrite():void{
        this.writeCircleSp = new egret.Shape();
        this.writeCircleSp.graphics.beginFill(0xffffff);
        this.writeCircleSp.graphics.drawCircle(0,0, 1);
        this.writeCircleSp.graphics.endFill();
        this.addChild(this.writeCircleSp);

        var that = this;
        this.writeCircleSp.x = Global.STAGE_W*0.5;
        this.writeCircleSp.y = Global.STAGE_H*0.5;
        this.writeCircleSp.alpha = 0;
        var scaleNum:number = Math.max(Global.STAGE_W, Global.STAGE_H) * 0.2;
        egret.Tween.get(this.writeCircleSp).to({scaleX:scaleNum, scaleY:scaleNum, alpha:1}, 500, egret.Ease.sineIn)
            .call(function(){
                that.sayPanel.startSay(function():void{
                    var titleStr:string = LangMag.instance.getText("loginTitle2");
                    var content:string = that.showStr;
                    var btnLabel:string = LangMag.instance.getText("sure");
                    PopUpMag.ins().showWin(WinName.LOGIN_DIALOG, 5, false, [titleStr, content, btnLabel, that.regiestHandler, that]);
                }, this);
            }, this);
    }

    private regiestHandler(userName:string, password:string):void{
        HttpMsg.instance.send(HttpMsgCMD.LOGIN, {userName:userName, password:password}, this.loginSuccess, this);//请求登陆
//        this.loginSuccess({ret:0});
    }

    private loginSuccess(data:any):void{
        if(data.ret == 0){
            UserInfo.ins.equipArr = data.equipArr;
            UserInfo.ins.user_bag_level = data.user_bag_level;
            UserInfo.ins.userData = new ObjectVo(data.nameStr,[
                data.maxHp, data.minAtt, data.maxAtt, data.def, data.speed
            ]);
            StorageMag.instance.initItems(data.storageList);
            UserInfo.ins.lastLoginTime = data.lastLoginTime;

            PopUpMag.ins().remove(WinName.LOGIN_DIALOG);
            var that = this;
            var scaleNum:number = Math.max(Global.STAGE_W, Global.STAGE_H) * 0.6;
            egret.Tween.get(this.writeCircleSp).to({scaleX:scaleNum, scaleY:scaleNum, alpha:1}, 500, egret.Ease.sineIn)
                .call(function(){
                    that.removeChildren();
                    PopUpMag.ins().remove(WinName.LOGIN);
                    PopUpMag.ins().showWin(WinName.MAIN_SCENE);
                }, this);
        }else{
            //请求失败
            var errorStr:string = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    }




}