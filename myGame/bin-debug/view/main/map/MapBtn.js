var MapBtn = (function (_super) {
    __extends(MapBtn, _super);
    function MapBtn() {
        _super.apply(this, arguments);
        this.id = 0;
        this.starLevel = 0;
    }
    var d = __define,c=MapBtn,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchChildren = false;
        this.touchEnabled = true;
    };
    p.clkHandler = function (e) {
        var that = this;
        LoadMag.instance.load("startChapter", function () {
            PopUpMag.ins().showWin(WinName.CHAPTER_START, 5, true, that.id);
        }, this);
    };
    p.setId = function (id, list) {
        this.id = id;
        this.idLab.text = id + "";
        var curId = UserInfo.ins.curChapterId;
        if (id < curId) {
            this.setEnalbe(true);
            this.btnImg.texture = RES.getRes("fightBtn0");
        }
        else if (id == curId) {
            this.setEnalbe(false);
            this.btnImg.texture = RES.getRes("fightBtn0");
        }
        else {
            this.setEnalbe(false);
            this.btnImg.texture = RES.getRes("fightBtn");
        }
        this.setStarLevel(this.getLevel(list));
        var hasEvent = this.hasEventListener(egret.TouchEvent.TOUCH_TAP);
        if (!hasEvent && this.id <= curId) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clkHandler, this);
        }
        else if (hasEvent && this.id > curId) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clkHandler, this);
        }
    };
    p.getLevel = function (chapterList) {
        var obj = chapterList[this.id];
        var level = obj ? obj.starNum : 0;
        return parseFloat(level);
    };
    p.setEnalbe = function (enable) {
        this.starImg_1.visible = enable;
        this.starImg_2.visible = enable;
        this.starImg_3.visible = enable;
    };
    p.setStarLevel = function (level) {
        if (this.starLevel == level) {
            return;
        }
        this.starLevel = level;
        switch (level) {
            case 0:
                this.starImg_1.texture = RES.getRes("ui_main_12");
                this.starImg_2.texture = RES.getRes("ui_main_13");
                this.starImg_3.texture = RES.getRes("ui_main_14");
                break;
            case 1:
                this.starImg_1.texture = RES.getRes("ui_main_09");
                this.starImg_2.texture = RES.getRes("ui_main_13");
                this.starImg_3.texture = RES.getRes("ui_main_14");
                break;
            case 2:
                this.starImg_1.texture = RES.getRes("ui_main_09");
                this.starImg_2.texture = RES.getRes("ui_main_10");
                this.starImg_3.texture = RES.getRes("ui_main_14");
                break;
            case 3:
                this.starImg_1.texture = RES.getRes("ui_main_09");
                this.starImg_2.texture = RES.getRes("ui_main_10");
                this.starImg_3.texture = RES.getRes("ui_main_11");
                break;
        }
    };
    return MapBtn;
})(eui.Component);
egret.registerClass(MapBtn,'MapBtn');
