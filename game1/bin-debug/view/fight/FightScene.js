/**
 * Created by maliquan on 16/4/22.
 */
var FightScene = (function (_super) {
    __extends(FightScene, _super);
    function FightScene() {
        _super.call(this);
        this.GAP = 10;
        this.lc = [];
        this.argArr = [];
        this.objArr = [];
        this.fsMag = new FSMag();
        this.fsCfg = new FSCfg();
        this.lc = Global.LEVEL_COLOR_ARR;
        this.bkgSp = new egret.Shape();
        this.addChild(this.bkgSp);
        this.scene = new egret.Sprite();
        this.addChild(this.scene);
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    var d = __define,c=FightScene,p=c.prototype;
    p.init = function (sw, sh, cfgIdx) {
        this.argArr = [w, h, cfgIdx];
        var CF = Global.COLOR_FORE;
        var BF = Global.COLOR_BACK;
        var w = (sw / this.GAP) >> 0;
        var h = (sh / this.GAP) >> 0;
        this.bkgSp.graphics.lineStyle(1, CF);
        this.bkgSp.graphics.beginFill(BF);
        this.bkgSp.graphics.drawRect(0, 0, sw, sh);
        this.bkgSp.graphics.endFill();
        //设置地图
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                this.scene.graphics.beginFill(CF);
                this.scene.graphics.drawCircle(i * this.GAP + this.GAP * 0.5, j * this.GAP + this.GAP * 0.5, 1);
                this.scene.graphics.endFill();
            }
        }
        //设置物体
        var someArr = this.fsCfg["cfg" + cfgIdx];
        var len = someArr.length;
        for (var k = 0; k < len; k++) {
            var cfg = someArr[k];
            this.setObj(cfg, CF, BF);
        }
        this.addChild(this.playerLab);
        this.fsMag.init(this, this.playerLab, this.GAP, someArr, this.setMask, this);
        //设置迷雾
        this.maskSp = new egret.Shape();
        this.maskSp.graphics.beginFill(BF);
        this.maskSp.graphics.drawCircle(this.playerLab.x + this.playerLab.width * 0.5, this.playerLab.y + this.playerLab.height * 0.5, 50);
        this.maskSp.graphics.endFill();
        this.scene.mask = this.maskSp;
        this.maskSp.touchEnabled = false;
        this.scene.addChild(this.maskSp);
    };
    p.setObj = function (cfg, CF, BF) {
        var lab = new eui.Label();
        lab.bold = true;
        lab.textColor = this.lc[cfg.l];
        lab.text = cfg.n;
        lab.background = true;
        lab.backgroundColor = BF;
        lab.size = 10;
        lab.x = cfg.x * this.GAP + this.GAP * 0.5 - lab.width * 0.5;
        lab.y = cfg.y * this.GAP + this.GAP * 0.5 - lab.height * 0.5;
        this.scene.addChild(lab);
        this.objArr.push(lab);
        if (cfg.n == "H") {
            //设置玩家
            this.playerLab = new eui.Label();
            this.playerLab.bold = true;
            this.playerLab.textColor = CF;
            this.playerLab.text = "@";
            this.playerLab.background = true;
            this.playerLab.backgroundColor = BF;
            this.playerLab.size = 10;
            this.playerLab.x = cfg.x * this.GAP + this.GAP * 0.5 - lab.width * 0.5;
            this.playerLab.y = cfg.y * this.GAP + this.GAP * 0.5 - lab.height * 0.5;
        }
    };
    p.resetColor = function () {
        this.bkgSp.graphics.clear();
        this.scene.graphics.clear();
        this.init(this.argArr[0], this.argArr[1], this.argArr[2]);
    };
    p.clean = function () {
        this.bkgSp.graphics.clear();
        this.scene.graphics.clear();
        this.removeChildren();
        this.fsMag.clean();
    };
    p.setMask = function () {
        this.maskSp.graphics.beginFill(Global.COLOR_BACK);
        this.maskSp.graphics.drawCircle(this.playerLab.x + this.playerLab.width * 0.5, this.playerLab.y + this.playerLab.height * 0.5, 10);
        this.maskSp.graphics.endFill();
        this.scene.mask = this.maskSp;
    };
    return FightScene;
}(egret.Sprite));
egret.registerClass(FightScene,'FightScene');
