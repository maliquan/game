/**
 * Created by maliquan on 16/4/22.
 */
class FSMag implements IMessage{

    public static mapLevel

    private scene:egret.Sprite;
    private player:eui.Label;
    private GAP:number;
    private objArr:any[] =[];
    private setMaskFun:Function;
    private thisObj:any;
    public static myKeyFun:Function;
    public static myThisObj:any;

    public init(scene:egret.Sprite, player:eui.Label, gap:number, objArr:any[], setMaskFun:Function, thisObj:any):void{
        this.scene = scene;
        this.player = player;
        this.GAP = gap;
        this.objArr = objArr;
        this.setMaskFun = setMaskFun;
        this.thisObj = thisObj;
        FSMag.myKeyFun = this.keyDownHandler;
        FSMag.myThisObj = this;
        this.scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        document.addEventListener("keydown",FSMag.keyDown);
        Message.instance.add(LocalId.FIGHT_OVER, this);
    }

    public static keyDown(e:any):void{
        FSMag.myKeyFun.call(FSMag.myThisObj, e);
    }

    private keyDownHandler(e:any):void{
        var movex:number = this.player.x;
        var movey:number = this.player.y;
        switch(e.code){
            case "ArrowUp":
                movey -= this.GAP;
                break;
            case "ArrowDown":
                movey += this.GAP;
                break;
            case "ArrowLeft":
                movex -= this.GAP;
                break;
            case "ArrowRight":
                movex += this.GAP;
                break;
        }
        this.movePlayer(movex, movey);
        this.setMaskFun.call(this.thisObj);
        this.checkHit();
    }

    private tapHandler(e:egret.TouchEvent):void{
//        var time:number = egret.getTimer();
        this.movePlayer(e.localX, e.localY);
        this.setMaskFun.call(this.thisObj);
        this.checkHit();
//        console.log(egret.getTimer()-time);
    }

    //检查是否碰到什么
    private checkHit():void{
        var len = this.objArr.length;
        var px:number = (this.player.x/this.GAP)>>0;
        var py:number = (this.player.y/this.GAP)>>0;
        for(var i:number=0; i<len; i++){
            var obj = this.objArr[i];
            if(obj.x==px && obj.y==py){
                this.goEvent(obj.e, obj.d);
            }
        }
    }

    //触发事件
    private goEvent(eventNum:number, dropIdx:number):void{
        this.scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        document.removeEventListener("keydown",FSMag.keyDown);
        switch (eventNum){
            case FSCfg.E_GO_HOME:
                Message.instance.localSend(LocalId.GO_HOME);
                this.eventOver();
                break;
            case FSCfg.E_GO_FIGHT:
                PopUpMag.ins().showWin(WinName.FIGHT_DIALOG, 5, false);
                break;
        }
    }

    public recvMsg(cmd:number, data:any):void{
        switch (cmd){
            case LocalId.FIGHT_OVER:
                this.eventOver();
                break;
        }
    }

    private eventOver():void{
        this.scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        document.addEventListener("keydown",FSMag.keyDown);
    }

    private movePlayer(tapx:number, tapy:number):void{
        var tapx:number = (tapx/this.GAP)>>0;
        var tapy:number = (tapy/this.GAP)>>0;
        var px:number = (this.player.x/this.GAP)>>0;
        var py:number = (this.player.y/this.GAP)>>0;
        if(tapx > px){
            this.player.x += this.GAP;
            this.movePlayerY(tapy, py);
        }else if(tapx < px){
            this.player.x -= this.GAP;
            this.movePlayerY(tapy, py);
        }else{
            this.movePlayerY(tapy, py);
        }
        this.player.x = Math.min(this.player.x, this.scene.width-(this.scene.width%this.GAP)-this.GAP);
        this.player.y = Math.min(this.player.y, this.scene.height-(this.scene.height%this.GAP)-this.GAP);
        this.player.x = Math.max(this.player.x, 0);
        this.player.y = Math.max(this.player.y, 0);
    }

    private movePlayerY(tapy:number, py:number):void{
        if(tapy > py){
            this.player.y += this.GAP;
        }else if(tapy < py){
            this.player.y -= this.GAP;
        }
    }

    public clean():void{
        this.scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    }
}