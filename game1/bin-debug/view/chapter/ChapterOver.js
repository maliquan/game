var ChapterOver = (function (_super) {
    __extends(ChapterOver, _super);
    function ChapterOver() {
        _super.apply(this, arguments);
        this.isWin = true;
        this.chapterId = 0;
        this.starNum = 0;
    }
    var d = __define,c=ChapterOver,p=c.prototype;
    p.onComplete = function () {
        _super.prototype.onComplete.call(this);
        this.closeBtn.setBkg("closeBtn");
        this.closeBtn.setClkFun(this.closeHandler, this);
        this.sureBtn.setLab("start");
        this.sureBtn.setBkg("button_blue");
        this.sureBtn.setClkFun(this.onButtonClick, this);
    };
    p.show = function () {
        this.isWin = this.showData.isWin;
        this.starNum = this.showData.starNum;
        this.chapterId = this.showData.chapterId;
        var titleStr = this.isWin ? "chapterOver_win" : "chapterOver_lose";
        this.resultLab.text = LangMag.instance.getText(titleStr);
    };
    p.onButtonClick = function (e) {
        HttpMsg.instance.send(HttpMsgCMD.CHAPTER_OVER, { isWin: this.isWin, chapterId: this.chapterId, starNum: this.starNum }, this.gameOver, this);
    };
    p.gameOver = function (data) {
        var crossId = data.crossChapterId;
        var curId = data.curChapterId;
        MapMag.instance.updataBtnId(crossId);
        MapMag.instance.updataBtnId(curId);
        this.closeHandler(null);
    };
    p.closeHandler = function (e) {
        PopUpMag.ins().removeAll();
        PopUpMag.ins().showWin(WinName.MAIN_SCENE, 1);
    };
    return ChapterOver;
}(ViewCtl));
egret.registerClass(ChapterOver,'ChapterOver');
