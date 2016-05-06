class GBtn extends egret.Sprite {

    private lab:eui.Label;
    private clkFun:Function;
    private thisObj:any;
    private isTap:boolean = false;
    private progressSp:egret.Shape;

    public constructor(clkFun:Function, thisObj:any) {
        super();
        this.clkFun = clkFun;
        this.thisObj = thisObj;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);

        this.lab = new eui.Label();
        this.lab.textColor = Global.COLOR_FORE;
        this.lab.background = true;
        this.lab.backgroundColor = Global.COLOR_BACK;
        this.lab.border = true;
        this.lab.borderColor = Global.COLOR_FORE;
        this.lab.textAlign = egret.HorizontalAlign.CENTER;
        this.lab.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.lab.minWidth = 80;
        this.lab.minHeight = 35;
        this.addChild(this.lab);
    }

    public setTxt(str:string):void{
        this.lab.text = str;
    }

    public get width():number{
        return this.lab.width;
    }

    //设置进度条时间，秒为单位
    public playProgress(time:number):void{
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        if(this.progressSp == null){
            this.progressSp = new egret.Shape();
            this.progressSp.graphics.beginFill(0xcccccc, 0.8);
            this.progressSp.graphics.drawRect(0,0,this.lab.width,this.lab.height);
            this.progressSp.graphics.endFill();
            this.addChild(this.progressSp);
        }
        this.progressSp.scaleX = 1;
        var that = this;
        egret.Tween.get(this.progressSp).to({scaleX:0}, time*1000).call(function():void{
            that.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.beginHandler, that);
        }, this);
    }

    private beginHandler(e:egret.TouchEvent):void{
        if(this.isTap){
            return;
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
        this.isTap = true;
        this.lab.textColor = Global.COLOR_BACK;
        this.lab.backgroundColor = Global.COLOR_FORE;
        this.lab.borderColor = Global.COLOR_BACK;
    }

    private endHandler(e:egret.TouchEvent):void{
        console.log("end");
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        var that = this;
        TimerMag.instance.add(function():void{
            that.isTap = false;
            that.lab.textColor = Global.COLOR_FORE;
            that.lab.backgroundColor = Global.COLOR_BACK;
            that.lab.borderColor = Global.COLOR_FORE;
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
        this.lab.textColor = Global.COLOR_FORE;
        this.lab.backgroundColor = Global.COLOR_BACK;
        this.lab.borderColor = Global.COLOR_FORE;
    }

    public clean():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    }

}
