var ChapterStart = (function (_super) {
    __extends(ChapterStart, _super);
    function ChapterStart() {
        _super.apply(this, arguments);
        this.chapterId = 0;
    }
    var d = __define,c=ChapterStart,p=c.prototype;
    p.onComplete = function () {
        _super.prototype.onComplete.call(this);
        this.closeBtn.setBkg("closeBtn");
        this.closeBtn.setClkFun(this.closeHandler, this);
        this.startBtn.setLab("start");
        this.startBtn.setBkg("button_green");
        this.startBtn.setClkFun(this.onButtonClick, this);
    };
    p.show = function () {
        _super.prototype.show.call(this);
        this.chapterId = this.showData;
        this.titleLab.text = LangMag.instance.getText("chapterStartTitle", [this.chapterId]);
        this.tipLab.text = LangMag.instance.getText("chapterStartTip");
    };
    p.onButtonClick = function (e) {
        HttpMsg.instance.send(HttpMsgCMD.START_CHAPTER, { id: this.chapterId }, this.loginSuccess, this); //开始关卡
    };
    p.loginSuccess = function (data) {
        if (data.ret == 0) {
            UserInfo.ins.parserLoginInfo(data);
            var that = this;
            LoadMag.instance.load("mainChapter", function () {
                RES.getResAsync("map" + that.chapterId, function () {
                    PopUpMag.ins().removeAll();
                    PopUpMag.ins().showWin(WinName.CHAPTER_MAIN, 1, false, that.chapterId, PopUpMag.LAYER_SCENE);
                }, this);
            }, this);
        }
        else {
            //请求失败
            var errorStr = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    };
    p.closeHandler = function (e) {
        PopUpMag.ins().remove(this.name);
    };
    return ChapterStart;
}(ViewCtl));
egret.registerClass(ChapterStart,'ChapterStart');
