/**
 * Created by maliquan on 16/5/6.
 */
var BagPanel = (function (_super) {
    __extends(BagPanel, _super);
    function BagPanel() {
        _super.call(this);
        this.itemLabArr = [];
        this.width = Global.STAGE_W * 0.7;
        this.height = 100;
        this.init();
    }
    var d = __define,c=BagPanel,p=c.prototype;
    p.init = function () {
        this.labPool = new LabPool();
        this.bagNameLab = new GLabel_bkg(this, 10, 0);
        this.playerHpLab = new GLabel_bkg(this, 120, 0);
        this.bagMaxNumLab = new GLabel_bkg(this, this.width - 200, 0);
        this.showItem();
        this.refresh(true);
    };
    p.showItem = function () {
        while (this.itemLabArr.length > 0) {
            this.labPool.setLab(this.itemLabArr.pop());
        }
        var list = BagMag.instance.itemList;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            this.itemLabArr[i] = this.labPool.getLab(this, (i % 5) * 100, (i / 5) * 30 + 30, list[i].name + "x" + list[i].num, list[i].color);
        }
    };
    p.drawLine = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, Global.COLOR_FORE);
        this.graphics.beginFill(Global.COLOR_BACK);
        this.graphics.drawRect(0, 10, this.width - 1, this.height - 11);
        this.graphics.endFill();
    };
    //isItem 是否刷新物品列表
    p.refresh = function (isItem) {
        this.drawLine();
        this.bagNameLab.text = LangMag.instance.getText("bag_name_" + UserInfo.ins.user_bag_level);
        var userVo = UserInfo.ins.userData;
        this.playerHpLab.text = LangMag.instance.getText("bag_player_hp", userVo.curHp, userVo.maxHp);
        var bagNum = BagMag.instance.itemList.length;
        var bagMaxNum = Global.BAG_LIMIT_ARR[UserInfo.ins.user_bag_level];
        this.bagMaxNumLab.text = LangMag.instance.getText("bag_num", bagNum, bagMaxNum);
        if (isItem) {
            this.showItem();
        }
    };
    return BagPanel;
}(egret.Sprite));
egret.registerClass(BagPanel,'BagPanel');
var LabPool = (function () {
    function LabPool() {
        this.labArr = [];
    }
    var d = __define,c=LabPool,p=c.prototype;
    p.getLab = function (parent, _x, _y, txt, color) {
        if (this.labArr.length > 0) {
            return this.labArr.pop();
        }
        else {
            var lab = new eui.Label();
            lab.textColor = color;
            lab.text = txt;
            lab.x = _x;
            lab.y = _y;
            parent.addChild(lab);
            return lab;
        }
    };
    p.setLab = function (lab) {
        lab.textColor = Global.COLOR_FORE;
        lab.text = "";
        lab.parent.removeChild(lab);
        this.labArr.push(lab);
    };
    return LabPool;
}());
egret.registerClass(LabPool,'LabPool');
