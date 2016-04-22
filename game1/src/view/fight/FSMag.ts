/**
 * Created by maliquan on 16/4/22.
 */
class FSMag{

    private scene:egret.Sprite;
    private player:eui.Label;
    private GAP:number;
    private objArr:any[] =[];
    private setMaskFun:Function;
    private thisObj:any;

    public init(scene:egret.Sprite, player:eui.Label, gap:number, objArr:any[], setMaskFun:Function, thisObj:any):void{
        this.scene = scene;
        this.player = player;
        this.GAP = gap;
        this.objArr = objArr;
        this.setMaskFun = setMaskFun;
        this.thisObj = thisObj;
        this.scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    }

    private tapHandler(e:egret.TouchEvent):void{
        var time:number = egret.getTimer();
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
                this.goEvent(obj.e);
            }
        }
    }

    //触发事件
    private goEvent(eventNum:number):void{
        switch (eventNum){
            case FSCfg.E_GO_HOME:
                console.log("go home");
                break;
            case FSCfg.E_GO_FIGHT:
                console.log("go fight");
                PopUpMag.ins().showWin(WinName.FIGHT_DIALOG);
                break;
        }
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