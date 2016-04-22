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
        this.scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    };
    p.tapHandler = function (e) {
        var time = egret.getTimer();
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
                this.goEvent(obj.e);
            }
        }
    };
    //触发事件
    p.goEvent = function (eventNum) {
        switch (eventNum) {
            case FSCfg.E_GO_HOME:
                console.log("go home");
                break;
            case FSCfg.E_GO_FIGHT:
                console.log("go fight");
                PopUpMag.ins().showWin(WinName.FIGHT_DIALOG);
                break;
        }
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
egret.registerClass(FSMag,'FSMag');
