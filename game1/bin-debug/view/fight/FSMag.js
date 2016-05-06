/**
 * Created by maliquan on 16/4/22.
 */
var FSMag = (function () {
    function FSMag() {
        this.objArr = [];
    }
    var d = __define,c=FSMag,p=c.prototype;
    p.init = function (scene, player, gap, objArr, setMaskFun, thisObj) {
        this.scene = scene;
        this.player = player;
        this.GAP = gap;
        this.objArr = objArr;
        this.setMaskFun = setMaskFun;
        this.thisObj = thisObj;
        FSMag.myKeyFun = this.keyDownHandler;
        FSMag.myThisObj = this;
        this.scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        document.addEventListener("keydown", FSMag.keyDown);
        Message.instance.add(LocalId.FIGHT_OVER, this);
    };
    FSMag.keyDown = function (e) {
        FSMag.myKeyFun.call(FSMag.myThisObj, e);
    };
    p.keyDownHandler = function (e) {
        var movex = this.player.x;
        var movey = this.player.y;
        switch (e.code) {
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
    };
    p.tapHandler = function (e) {
        //        var time:number = egret.getTimer();
        this.movePlayer(e.localX, e.localY);
        this.setMaskFun.call(this.thisObj);
        this.checkHit();
        //        console.log(egret.getTimer()-time);
    };
    //检查是否碰到什么
    p.checkHit = function () {
        var len = this.objArr.length;
        var px = (this.player.x / this.GAP) >> 0;
        var py = (this.player.y / this.GAP) >> 0;
        for (var i = 0; i < len; i++) {
            var obj = this.objArr[i];
            if (obj.x == px && obj.y == py) {
                this.goEvent(obj.e, obj.d);
            }
        }
    };
    //触发事件
    p.goEvent = function (eventNum, dropIdx) {
        this.scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        document.removeEventListener("keydown", FSMag.keyDown);
        switch (eventNum) {
            case FSCfg.E_GO_HOME:
                Message.instance.localSend(LocalId.GO_HOME);
                this.eventOver();
                break;
            case FSCfg.E_GO_FIGHT:
                Message.instance.localSend(LocalId.SHOW_MESSAGE, ["go fight"]);
                PopUpMag.ins().showWin(WinName.FIGHT_DIALOG, 5, false, [dropIdx]);
                break;
        }
    };
    p.recvMsg = function (cmd, data) {
        switch (cmd) {
            case LocalId.FIGHT_OVER:
                this.eventOver();
                break;
        }
    };
    p.eventOver = function () {
        this.scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        document.addEventListener("keydown", FSMag.keyDown);
    };
    p.movePlayer = function (tapx, tapy) {
        var tapx = (tapx / this.GAP) >> 0;
        var tapy = (tapy / this.GAP) >> 0;
        var px = (this.player.x / this.GAP) >> 0;
        var py = (this.player.y / this.GAP) >> 0;
        if (tapx > px) {
            this.player.x += this.GAP;
            this.movePlayerY(tapy, py);
        }
        else if (tapx < px) {
            this.player.x -= this.GAP;
            this.movePlayerY(tapy, py);
        }
        else {
            this.movePlayerY(tapy, py);
        }
        this.player.x = Math.min(this.player.x, this.scene.width - (this.scene.width % this.GAP) - this.GAP);
        this.player.y = Math.min(this.player.y, this.scene.height - (this.scene.height % this.GAP) - this.GAP);
        this.player.x = Math.max(this.player.x, 0);
        this.player.y = Math.max(this.player.y, 0);
    };
    p.movePlayerY = function (tapy, py) {
        if (tapy > py) {
            this.player.y += this.GAP;
        }
        else if (tapy < py) {
            this.player.y -= this.GAP;
        }
    };
    p.clean = function () {
        this.scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    };
    return FSMag;
}());
egret.registerClass(FSMag,'FSMag',["IMessage"]);
