class SayPanel extends egret.Sprite{
    public sayLab:GLabel;
    public sayArr:string[] = [];
    public sayOverFun:Function;
    public sayOverThisObject:any;

    public constructor(){
        super();
        this.sayLab = new GLabel();
        this.sayLab.width = Global.STAGE_W*0.8;
        this.sayLab.height = Global.STAGE_H*0.6;
        this.sayLab.x = Global.STAGE_W*0.5 - this.sayLab.width*0.5;
        this.sayLab.y = Global.STAGE_H*0.5 - this.sayLab.height*0.5;
        this.sayLab.textColor = Global.COLOR_FORE;
        this.addChild(this.sayLab);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    }

    public startSay(sayOverFun:Function, thisObject:any):void{
        this.sayOverFun = sayOverFun;
        this.sayOverThisObject = thisObject;
        var sayStr:string = LangMag.instance.getText("loginSay");
        this.sayArr = sayStr.split("");
        this.sayArr.reverse();
        TimerMag.instance.add(this.saying, this, 100);
    }

    public saying():void{
        this.sayLab.scrollV = this.sayLab.numLines-10;
        if(this.sayArr.length > 0){
            this.sayLab.text += this.sayArr.pop();
        }else{
            this.stopSay();
        }
    }

    private stopSay():void{
        if(this.sayOverFun){
            TimerMag.instance.remove(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
            this.sayOverFun.call(this.sayOverThisObject);
            this.sayOverFun = null;
        }
    }

    private tapHandler(e:egret.TouchEvent):void{
        for(var i:number=0; i<10; i++){
            this.saying();
        }
    }

}