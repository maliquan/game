class GBtn extends eui.Label {

    private clkFun:Function;
    private thisObj:any;
    private isTap:boolean = false;

    public constructor(clkFun:Function, thisObj:any) {
        super();
        this.clkFun = clkFun;
        this.thisObj = thisObj;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);

        this.textColor = Global.COLOR_FORE;
        this.background = true;
        this.backgroundColor = Global.COLOR_BACK;
        this.border = true;
        this.borderColor = Global.COLOR_FORE;
        this.textAlign = egret.HorizontalAlign.CENTER;
        this.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.minWidth = 80;
        this.minHeight = 35;
    }

    private tapHandler(e:egret.TouchEvent):void{

    }

    private beginHandler(e:egret.TouchEvent):void{
        if(this.isTap){
            return;
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
        this.isTap = true;
        this.textColor = Global.COLOR_BACK;
        this.backgroundColor = Global.COLOR_FORE;
        this.borderColor = Global.COLOR_BACK;
    }

    private endHandler(e:egret.TouchEvent):void{
        console.log("end");
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        var that = this;
        TimerMag.instance.add(function():void{
            that.isTap = false;
            that.textColor = Global.COLOR_FORE;
            that.backgroundColor = Global.COLOR_BACK;
            that.borderColor = Global.COLOR_FORE;
            if(that.clkFun){
                that.clkFun.call(that.thisObj);
            }
        }, this, 100, 1);
    }

    private outSideHandler(e:egret.TouchEvent):void{
        console.log("outside");
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.isTap = false;
        this.textColor = Global.COLOR_FORE;
        this.backgroundColor = Global.COLOR_BACK;
        this.borderColor = Global.COLOR_FORE;
    }

    public clean():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    }

}
