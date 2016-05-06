var HttpMsgCMD = (function () {
    function HttpMsgCMD() {
    }
    var d = __define,c=HttpMsgCMD,p=c.prototype;
    //用户登陆
    HttpMsgCMD.LOGIN = "/game/login";
    //保存仓库数据
    HttpMsgCMD.SAVE_STORAGE = "/game/save_storage";
    //保存临时背包数据
    HttpMsgCMD.SAVE_BAG = "/game/save_bag";
    return HttpMsgCMD;
}());
egret.registerClass(HttpMsgCMD,'HttpMsgCMD');
