var HttpMsgCMD = (function () {
    function HttpMsgCMD() {
    }
    var d = __define,c=HttpMsgCMD,p=c.prototype;
    //用户登陆
    HttpMsgCMD.LOGIN = "/account/login";
    //进入关卡
    HttpMsgCMD.START_CHAPTER = "/account/startChapter";
    //关卡胜利
    HttpMsgCMD.CHAPTER_OVER = "/account/chapterOver";
    return HttpMsgCMD;
})();
egret.registerClass(HttpMsgCMD,'HttpMsgCMD');
