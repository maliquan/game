class BaseBtn extends eui.Component{

    private label:eui.Label;
    private bkg:eui.Image;
    private fun:Function;
    private thisObj:any;

    public constructor(){
        super();
        this.touchChildren =false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.downHandler,this);
    }

    public setLab(language:string):void{
        this.label.text = LangMag.instance.getText(language);
    }

    public setBkg(bkg:string):void{
        this.bkg.texture = RES.getRes(bkg);
    }

    public createChildren():void{
        super.createChildren();
        GameUtils.setAnchor(this,0.5,0.5);
    }

    public setClkFun(fun:Function, thisObj:any):void{
        this.fun = fun;
        this.thisObj = thisObj;
    }

    private downHandler(e:egret.TouchEvent):void{
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.downHandler,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.clkHandler,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.cancleHandler,this);
        this.scaleX = this.scaleY = 1.2;
    }

    private clkHandler(e:egret.TouchEvent):void{
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.downHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.clkHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.cancleHandler,this);
        this.scaleX = this.scaleY = 1;
        if(this.fun){
            this.fun.call(this.thisObj, e);
        }
    }

    private cancleHandler(e:egret.TouchEvent):void{
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.downHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.clkHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.cancleHandler,this);
        this.scaleX = this.scaleY = 1;
    }

    public clean():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.downHandler,this);
    }

}