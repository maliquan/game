class Global {
    
	/**
	 * gameWH 游戏中的设计宽高
	 * stageWH 舞台的实际宽高
	 */
	public static GAME_W:number = 640;
	public static GAME_H:number = 960;
	public static STAGE_W:number = 0;
	public static STAGE_H:number = 0;

    public static STAGE:egret.Stage;

    public static BASE_URL:string = "http://localhost:3004"
    public static COLOR_FORE:number = 0x222222;
    public static COLOR_BACK:number = 0xdddddd;

    //级别颜色
    public static LEVEL_COLOR_ARR:number[] = [
        Global.COLOR_FORE,//第一个是前景色，所以这里没用，为了索引方便加一个占位置
        0x008000,//绿色
        0x0000FF,//蓝色
        0xCD00CD,//紫色
        0xCFB53B,//黄色
        0xCC0000,//红色
        0xFF7F00,//橙色
    ];
	
}
