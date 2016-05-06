var LocalId = (function () {
    function LocalId() {
    }
    var d = __define,c=LocalId,p=c.prototype;
    LocalId.GO_HOME = 0; //回家
    LocalId.LEAVE_HOME = 1; //去郊外
    LocalId.SHOW_MESSAGE = 2; //显示消息
    LocalId.FIGHT_OVER = 3; //战斗结束
    return LocalId;
}());
egret.registerClass(LocalId,'LocalId');
