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
    Global.BASE_URL = "http://localhost:3004";
    Global.COLOR_FORE = 0x111111;
    Global.COLOR_BACK = 0xeeeeee;
    Global.BAG_LIMIT_ARR = [10, 20, 30, 40, 50, 60];
    Global.FS_10 = 10;
    Global.FS_20 = 20;
    Global.FS_30 = 30;
    //级别颜色
    Global.LEVEL_COLOR_ARR = [
        Global.COLOR_FORE,
        0x008000,
        0x0000FF,
        0xCD00CD,
        0xCFB53B,
        0xCC0000,
        0xFF7F00,
    ];
    return Global;
}());
egret.registerClass(Global,'Global');
