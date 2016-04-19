var HttpMsgCMD = (function () {
    function HttpMsgCMD() {
    }
    var d = __define,c=HttpMsgCMD,p=c.prototype;
    //用户登陆
    HttpMsgCMD.LOGIN = "/game/login";
    //进入关卡
    HttpMsgCMD.START_CHAPTER = "/game/startChapter";
    //关卡胜利
    HttpMsgCMD.CHAPTER_OVER = "/game/chapterOver";
    return HttpMsgCMD;
}());
egret.registerClass(HttpMsgCMD,'HttpMsgCMD');
