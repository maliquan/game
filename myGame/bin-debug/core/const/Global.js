var Global = (function () {
    function Global() {
    }
    var d = __define,c=Global,p=c.prototype;
    /**
     * gameWH 游戏中的设计宽高
     * stageWH 舞台的实际宽高
     */
    Global.GAME_W = 640;
    Global.GAME_H = 960;
    Global.STAGE_W = 0;
    Global.STAGE_H = 0;
    Global.BASE_URL = "";
    return Global;
})();
egret.registerClass(Global,'Global');
