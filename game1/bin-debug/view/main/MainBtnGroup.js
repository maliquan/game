/**
 * Created by maliquan on 16/4/23.
 */
var MainBtnGroup = (function (_super) {
    __extends(MainBtnGroup, _super);
    function MainBtnGroup() {
        _super.call(this);
        this.labArr = [];
        this.width = Global.STAGE_W * 0.7;
        this.height = 100;
        var w = 0;
        var btnNameArr = LangMag.instance.getText("btnGroup").split(",");
        for (var i = 0; i < btnNameArr.length; i++) {
            var lab = new eui.Label();
            lab.text = btnNameArr[i];
            lab.textColor = Global.COLOR_FORE;
            lab["index"] = i;
            this.labArr.push(lab);
            this.addChild(lab);
            lab.x = 60 + w;
            lab.y = 30;
            w += lab.width + 30;
        }
        this.setCurBtn(0);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.graphics.lineStyle(1, Global.COLOR_FORE);
        this.graphics.moveTo(0, this.height - 1);
        this.graphics.lineTo(this.width, this.height - 1);
    }
    var d = __define,c=MainBtnGroup,p=c.prototype;
    p.tapHandler = function (e) {
        Message.instance.localSend(LocalId.MAIN_BTN_CLK_IDX, e.target.index);
    };
    p.setCurBtn = function (idx) {
        for (var i = 0; i < this.labArr.length; i++) {
            if (i == idx) {
                this.labArr[i].bold = true;
                this.labArr[i].size = Global.FS_30;
            }
            else {
                this.labArr[i].bold = false;
                this.labArr[i].size = Global.FS_20;
            }
        }
    };
    return MainBtnGroup;
}(egret.Sprite));
egret.registerClass(MainBtnGroup,'MainBtnGroup');
