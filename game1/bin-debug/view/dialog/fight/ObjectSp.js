/**
 * Created by maliquan on 16/4/22.
 */
var ObjectSp = (function (_super) {
    __extends(ObjectSp, _super);
    function ObjectSp(hp, name, level) {
        _super.call(this);
        this.maxHp = hp;
        this.hpLab = new eui.Label();
        this.hpLab.textColor = Global.COLOR_FORE;
        this.hpLab.size = 20;
        this.addChild(this.hpLab);
        this.nameLab = new eui.Label();
        this.nameLab.textColor = Global.LEVEL_COLOR_ARR[level];
        this.nameLab.text = name;
        this.nameLab.size = 20;
        this.addChild(this.nameLab);
        this.setHp(hp);
    }
    var d = __define,c=ObjectSp,p=c.prototype;
    p.setHp = function (curHp) {
        this.hpLab.text = curHp + "/" + this.maxHp;
        this.nameLab.x = this.hpLab.width * 0.5 - this.nameLab.width * 0.5;
        this.nameLab.y = this.hpLab.height + 2;
    };
    return ObjectSp;
}(egret.Sprite));
egret.registerClass(ObjectSp,'ObjectSp');
