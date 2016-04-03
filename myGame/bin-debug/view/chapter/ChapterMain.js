var ChapterMain = (function (_super) {
    __extends(ChapterMain, _super);
    function ChapterMain() {
        _super.apply(this, arguments);
        this.chapterId = 0;
    }
    var d = __define,c=ChapterMain,p=c.prototype;
    p.onComplete = function () {
        _super.prototype.onComplete.call(this);
    };
    p.show = function () {
        _super.prototype.show.call(this);
        Message.instance.add(LocalId.CHAPTER_OVER, this);
        this.chapterId = this.showData;
        this.chapterMag = new ChapterMag();
        this.chapterMag.show(this.chapterId, this);
    };
    p.close = function () {
        _super.prototype.close.call(this);
        Message.instance.remove(LocalId.CHAPTER_OVER, this);
    };
    p.recvMsg = function (cmd, data) {
        switch (cmd) {
            case LocalId.CHAPTER_OVER:
                PopUpMag.ins().showWin(WinName.CHAPTER_OVER, 5, true, { isWin: data.isWin, starNum: 3, chapterId: this.chapterId });
                break;
        }
    };
    return ChapterMain;
})(ViewCtl);
egret.registerClass(ChapterMain,'ChapterMain',["IMessage"]);
