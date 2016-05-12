/**
 * Created by maliquan on 16/4/22.
 */
class FightScene extends egret.Sprite{

    public static curMapLevel:number = 0;

    private bkgSp:egret.Shape;
    private GAP:number = 10;
    private fsCfg:FSCfg;
    private lc:number[] = [];
    private argArr:number[] = [];
    private objArr:eui.Label[] =[];
    private fsMag:FSMag;
    private playerLab:eui.Label;
    private maskSp:egret.Shape;
    private scene:egret.Sprite;

    public constructor(){
        super();

        this.fsMag = new FSMag();
        this.fsCfg = new FSCfg();
        this.lc = Global.LEVEL_COLOR_ARR;
        this.bkgSp = new egret.Shape();
        this.addChild(this.bkgSp);
        this.scene = new egret.Sprite();
        this.addChild(this.scene);
        this.touchChildren = false;
        this.touchEnabled = true;
    }

    public init(sw:number, sh:number, cfgIdx:number):void{
        this.width = sw;
        this.height = sh;
        FightScene.curMapLevel = cfgIdx;
        this.argArr = [sw,sw,cfgIdx];
        var CF:number = Global.COLOR_FORE;
        var BF:number = Global.COLOR_BACK;
        var w:number = (sw/this.GAP)>>0;
        var h:number = (sh/this.GAP)>>0;

        this.bkgSp.graphics.lineStyle(1, CF);
        this.bkgSp.graphics.beginFill(BF);
        this.bkgSp.graphics.drawRect(0, 0, sw-1, sh-1);
        this.bkgSp.graphics.endFill();

        //设置地图
        for(var i:number=0; i<w; i++){
            for(var j:number=0; j<h; j++){
                this.scene.graphics.beginFill(CF);
                this.scene.graphics.drawCircle(i*this.GAP+this.GAP*0.5, j*this.GAP+this.GAP*0.5, 1);
                this.scene.graphics.endFill();
            }
        }
        //设置物体
        var someArr:any[] = this.fsCfg["cfg"+cfgIdx];
        var len:number = someArr.length;
        for(var k:number=0; k<len; k++){
            var cfg:any = someArr[k];
            this.setObj(cfg, CF, BF);
        }
        this.addChild(this.playerLab);

        this.fsMag.init(this, this.playerLab, this.GAP, someArr, this.setMask, this);

        //设置迷雾
        this.maskSp = new egret.Shape();
        this.maskSp.graphics.beginFill(BF);
        this.maskSp.graphics.drawCircle(this.playerLab.x+this.playerLab.width*0.5, this.playerLab.y+this.playerLab.height*0.5, 80);
        this.maskSp.graphics.endFill();
        this.scene.mask = this.maskSp;
        this.maskSp.touchEnabled = false;
        this.scene.addChild(this.maskSp);
    }

    private setObj(cfg:any, CF, BF):void{
        var lab:eui.Label = new eui.Label();
        lab.bold = true;
        lab.textColor = this.lc[cfg.l];
        lab.text = cfg.n;
        lab.background = true;
        lab.backgroundColor = BF;
        lab.size = Global.FS_10;
        lab.x = cfg.x * this.GAP + this.GAP*0.5 - lab.width*0.5;
        lab.y = cfg.y * this.GAP + this.GAP*0.5 - lab.height *0.5;
        this.scene.addChild(lab);
        this.objArr.push(lab);

        if(cfg.n == "H"){
            //设置玩家
            this.playerLab = new eui.Label();
            this.playerLab.bold = true;
            this.playerLab.textColor = CF;
            this.playerLab.text = "@";
            this.playerLab.background = true;
            this.playerLab.backgroundColor = BF;
            this.playerLab.size = Global.FS_10;
            this.playerLab.x = cfg.x * this.GAP + this.GAP*0.5 - lab.width*0.5;
            this.playerLab.y = cfg.y * this.GAP + this.GAP*0.5 - lab.height *0.5;
        }
    }

    public resetColor():void{
        this.bkgSp.graphics.clear();
        this.scene.graphics.clear();
        this.init(this.argArr[0], this.argArr[1], this.argArr[2]);
    }

    public clean():void{
        this.bkgSp.graphics.clear();
        this.scene.graphics.clear();
        this.removeChildren();
        this.fsMag.clean();
    }

    public setMask():void{
        this.maskSp.graphics.beginFill(Global.COLOR_BACK);
        this.maskSp.graphics.drawCircle(this.playerLab.x+this.playerLab.width*0.5, this.playerLab.y+this.playerLab.height*0.5, 30);
        this.maskSp.graphics.endFill();
        this.scene.mask = this.maskSp;
    }

}