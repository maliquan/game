/**
 * Created by maliquan on 16/5/11.
 */
var HomePanel = (function (_super) {
    __extends(HomePanel, _super);
    function HomePanel() {
        _super.call(this);
        this.heroLabArr = [];
        this.equipLabArr = [];
        this.leftW = 100;
        this.width = Global.STAGE_W * 0.7;
        this.height = Global.STAGE_H - 100;
        this.init();
    }
    var d = __define,c=HomePanel,p=c.prototype;
    p.init = function () {
        this.showP = new ItemShowPanel();
        this.showP.x = this.leftW + 100;
        this.addChild(this.showP);
        this.initHeroPanel();
        this.initEquipPanel();
        this.update();
    };
    p.update = function () {
        var heroPropertyStr = LangMag.instance.getText("heroProperty").split(",");
        for (var i = 0; i < 6; i++) {
            var lab = this.heroLabArr[i];
            lab.text = heroPropertyStr[i];
            lab = this.equipLabArr[i];
            if (lab["itemVo"]) {
                lab.text = lab["itemVo"].name;
            }
            else {
                lab.text = LangMag.instance.getText("empty");
            }
        }
    };
    p.initHeroPanel = function () {
        this.heroPanel = new egret.Sprite();
        this.heroPanel.x = 10;
        this.heroPanel.y = 20;
        this.heroPanel.width = this.leftW;
        this.heroPanel.height = 200;
        this.addChild(this.heroPanel);
        this.heroPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroTapHandler, this);
        //draw hero
        this.heroPanel.graphics.lineStyle(1, Global.COLOR_FORE);
        this.heroPanel.graphics.moveTo(0, 10);
        this.heroPanel.graphics.lineTo(this.heroPanel.width, 10);
        //        this.heroPanel.graphics.beginFill(Global.COLOR_BACK);
        //        this.heroPanel.graphics.drawRect(0,10,this.heroPanel.width, this.heroPanel.height);
        //        this.heroPanel.graphics.endFill();
        var heroTitleLab = new GLabel_bkg(this.heroPanel, 10, 0);
        heroTitleLab.text = LangMag.instance.getText("heroTitleLab");
        for (var i = 0; i < 6; i++) {
            var lab = new GLabel();
            lab["idx"] = i;
            this.heroPanel.addChild(lab);
            lab.y = 30 + 25 * i;
            this.heroLabArr[i] = lab;
        }
    };
    p.initEquipPanel = function () {
        this.equipPanel = new egret.Sprite();
        this.equipPanel.x = 10;
        this.equipPanel.y = this.heroPanel.y + this.heroPanel.height + 30;
        this.equipPanel.width = this.leftW;
        this.equipPanel.height = 200;
        this.addChild(this.equipPanel);
        this.equipPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipTapHandler, this);
        //draw equip
        this.equipPanel.graphics.lineStyle(1, Global.COLOR_FORE);
        this.equipPanel.graphics.moveTo(0, 10);
        this.equipPanel.graphics.lineTo(this.equipPanel.width, 10);
        //        this.equipPanel.graphics.beginFill(Global.COLOR_BACK);
        //        this.equipPanel.graphics.drawRect(0,10,this.equipPanel.width, this.equipPanel.height);
        //        this.equipPanel.graphics.endFill();
        var equipTitleLab = new GLabel_bkg(this.equipPanel, 10, 0);
        equipTitleLab.text = LangMag.instance.getText("equipTitleLab");
        var equipArr = UserInfo.ins.equipArr;
        for (var i = 0; i < 6; i++) {
            var lab = new GLabel();
            lab["itemVo"] = equipArr[i] || null;
            this.equipPanel.addChild(lab);
            lab.y = 30 + 25 * i;
            this.equipLabArr[i] = lab;
        }
    };
    p.heroTapHandler = function (e) {
        if (e.target && e.target.idx) {
        }
    };
    p.equipTapHandler = function (e) {
        if (e.target && e.target.itemVo) {
            this.showP.showItem(e.target.itemVo);
        }
    };
    return HomePanel;
}(egret.Sprite));
egret.registerClass(HomePanel,'HomePanel');
