var LocalId = (function () {
    function LocalId() {
    }
    var d = __define,c=LocalId,p=c.prototype;
    LocalId.GO_HOME = 0; //回家
    LocalId.MAIN_BTN_CLK_IDX = 1; //主界面按钮点击
    LocalId.SHOW_MESSAGE = 2; //显示消息
    LocalId.FIGHT_OVER = 3; //战斗结束
    LocalId.SHOW_MESSAGE_COLOR = 4; //显示消息2，支持多颜色
    return LocalId;
}());
egret.registerClass(LocalId,'LocalId');
