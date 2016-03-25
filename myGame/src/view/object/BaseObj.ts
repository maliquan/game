class BaseObj extends egret.Sprite{

    public numLab:eui.Label;
    public bkgImg:eui.Image;
    public vo:ObjVo;


    public constructor(vo:ObjVo){
        super();
        this.vo = vo;
        this.init();
    }

    private init():void{
        this.anchorOffsetX = this.vo.w*0.5;
        this.anchorOffsetY = this.vo.h*0.5;
        this.x = this.vo.x;
        this.y = this.vo.y;
        this.touchChildren = false;
        this.touchEnabled = true;

        this.bkgImg = new eui.Image();
        this.bkgImg.texture = RES.getRes(this.vo.src);
        this.addChild(this.bkgImg);
        this.bkgImg.width = this.vo.w;
        this.bkgImg.height = this.vo.h;
        this.numLab = new eui.Label();
        this.numLab.textColor = this.getColorByTeam(this.vo.team);
        this.numLab.size = 18;
        this.addChild(this.numLab);

        this.updata();
        this.startMake();
    }

    /* 根据距离计算移动时间 单位：毫秒*/
    public getTime(x2:number,y2:number):number{
        var xDif:number = x2-this.x;
        var yDif:number = y2-this.y;
        var dis:number = Math.sqrt(xDif*xDif + yDif*yDif);
        var time:number = dis / this.vo.moveSpeed / 200 * 1000;// 200是单位移动距离 1000是单位时间毫秒变成秒
        return time>>0;
    }

    private updata():void{
        this.updataNum();
    }

    public startMake():void{
        var timerMag:TimerMag = TimerMag.instance;
        if(!timerMag.has(this) && this.vo.team != 0){
            timerMag.add(this.addNum, this, 1000);
        }
    }

    public setTeam(team:number, outputP:number):void{
        this.vo.outputP = outputP;
        this.vo.team = team;
        this.updata();
        this.numLab.textColor = this.getColorByTeam(this.vo.team);
        this.startMake();
    }

    public stopMake():void{
        TimerMag.instance.remove(this);
    }

    private addNum():void{
        this.updataNum();
        this.vo.curNum += this.vo.makeSpeed;
    }

    public updataNum():void{
        if(this.vo.curNum >= this.vo.maxNum){
            this.vo.curNum = this.vo.maxNum;
        }
        this.numLab.text = this.vo.curNum + "";
        this.numLab.x = this.bkgImg.width*0.5 - this.numLab.width*0.5;
        this.numLab.y = this.bkgImg.height*0.5 - this.numLab.height*0.5;
    }

    public clean():void{
        this.stopMake();
        this.bkgImg = null;
        this.vo = null;
    }

    private getColorByTeam(type:number):number{
        var color:number = 0xcccccc;
        switch (type){
            case 0:
                color = 0xcccccc;
                break;
            case 1:
                color = 0x0000ff;
                break;
            case 2:
                color = 0xff0000;
                break;
            case 3:
                color = 0x00ff00;
                break;
            case 4:
                color = 0xffff55;
                break;
            case 5:
                color = 0x00ffff;
                break;
            case 6:
                color = 0xff00ff;
                break;
        }
        return color;
    }

}