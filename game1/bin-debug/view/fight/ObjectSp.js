/**
 * Created by maliquan on 16/4/22.
 */
var ObjectSp = (function (_super) {
    __extends(ObjectSp, _super);
    function ObjectSp() {
        _super.call(this);
        this.hpLab = new eui.Label();
        this.hpLab.size = Global.FS_20;
        this.addChild(this.hpLab);
        this.nameLab = new eui.Label();
        this.nameLab.size = Global.FS_20;
        this.addChild(this.nameLab);
        this.loseHpLab = new eui.Label();
        this.loseHpLab.textColor = Global.COLOR_FORE;
        this.loseHpLab.size = Global.FS_20;
        this.addChild(this.loseHpLab);
    }
    var d = __define,c=ObjectSp,p=c.prototype;
    p.init = function (nameStr, level, dieFun, thisObj) {
        if (nameStr == "@") {
            this.data = UserInfo.ins.userData;
        }
        else {
            this.data = ObjCfg.getObjCfg(nameStr);
        }
        this.dieFun = dieFun;
        this.dieThisObj = thisObj;
        this.hpLab.textColor = Global.LEVEL_COLOR_ARR[level];
        this.nameLab.textColor = Global.LEVEL_COLOR_ARR[level];
        this.nameLab.text = nameStr;
        this.loseHpLab.text = "";
        this.setHp(this.data.maxHp);
    };
    p.setHp = function (curHp) {
        curHp = Math.max(0, curHp);
        curHp = Math.min(curHp, this.data.maxHp);
        this.data.curHp = curHp;
        this.hpLab.text = curHp + "/" + this.data.maxHp;
        this.nameLab.x = this.hpLab.width * 0.5 - this.nameLab.width * 0.5;
        this.nameLab.y = this.hpLab.height + 2;
        if (this.data.curHp <= 0) {
            this.die();
        }
    };
    p.startAtt = function (callFun, thisObj) {
        this.attFun = callFun;
        this.attThisObj = thisObj;
        if (this.data.nameStr == "@") {
            this.attack();
        }
        else {
            TimerMag.instance.add(this.attack, this, this.data.speed * 1000);
        }
    };
    p.attack = function () {
        var thisx = this.x;
        var moveNum = this.data.nameStr == "@" ? 100 : -100;
        egret.Tween.get(this)
            .to({ x: thisx + moveNum }, 200)
            .call(this.attFun, this.attThisObj, [this.data.minAtt])
            .to({ x: thisx }, 200);
    };
    p.defense = function (att) {
        var loseHpNum = att - this.data.def;
        loseHpNum = Math.max(0, loseHpNum);
        this.setHp(this.data.curHp - loseHpNum);
        if (loseHpNum == 0) {
            this.loseHpLab.text = LangMag.instance.getText("attackSoLow");
        }
        else {
            this.loseHpLab.text = "-" + loseHpNum;
        }
        this.loseHpLab.x = this.hpLab.width * 0.5 - this.loseHpLab.width * 0.5;
        this.loseHpLab.y = this.hpLab.y - this.loseHpLab.height;
        var that = this;
        egret.Tween.get(this.loseHpLab).to({ y: this.loseHpLab.y - 50, alpha: 0 }, 500).call(function () {
            that.loseHpLab.text = "";
            that.loseHpLab.alpha = 1;
        }, this);
    };
    p.die = function () {
        this.clean();
        if (this.dieFun) {
            this.dieFun.call(this.dieThisObj);
        }
    };
    p.clean = function () {
        egret.Tween.removeTweens(this);
        TimerMag.instance.remove(this);
    };
    return ObjectSp;
}(egret.Sprite));
egret.registerClass(ObjectSp,'ObjectSp');
