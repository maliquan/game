class MapBtn extends eui.Component {

    public id:number = 0;
    public idLab:eui.BitmapLabel;
    public btnImg:eui.Image;
    public starLevel:number = 0;
    public starImg_1:eui.Image;
    public starImg_2:eui.Image;
    public starImg_3:eui.Image;

    public createChildren(): void {
        super.createChildren();
        this.touchChildren = false;
        this.touchEnabled = true;
    }

    private clkHandler(e: egret.TouchEvent) {
        var that = this;
        LoadMag.instance.load("startChapter",function():void{
            PopUpMag.ins().showWin(WinName.CHAPTER_START, 5, true, that.id);
        },this);
    }

    public setId(id:number,list:any):void{
        this.id = id;
        this.idLab.text = id + "";
        var curId:number = UserInfo.ins.curChapterId;
        if(id < curId){
            this.setEnalbe(true);
            this.btnImg.texture = RES.getRes("fightBtn0");
        }else if(id == curId){
            this.setEnalbe(false);
            this.btnImg.texture = RES.getRes("fightBtn0");
        }else{
            this.setEnalbe(false);
            this.btnImg.texture = RES.getRes("fightBtn");
        }
        this.setStarLevel(this.getLevel(list));

        var hasEvent:boolean = this.hasEventListener(egret.TouchEvent.TOUCH_TAP);
        if(!hasEvent && this.id <= curId){
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clkHandler,this);
        }else if(hasEvent && this.id > curId){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clkHandler,this);
        }
    }

    private getLevel(chapterList:any[]):number{
        var obj:any = chapterList[this.id];
        var level:string = obj ? obj.starNum : 0;
        return parseFloat(level);
    }

    public setEnalbe(enable:boolean):void{
        this.starImg_1.visible = enable;
        this.starImg_2.visible = enable;
        this.starImg_3.visible = enable;
    }

    public setStarLevel(level:number):void{
        if(this.starLevel == level){
            return;
        }
        this.starLevel = level;
        switch (level){
            case 0:
                this.starImg_1.texture = RES.getRes("ui_main_12");
                this.starImg_2.texture = RES.getRes("ui_main_13");
                this.starImg_3.texture = RES.getRes("ui_main_14");
                break;
            case 1:
                this.starImg_1.texture = RES.getRes("ui_main_09");
                this.starImg_2.texture = RES.getRes("ui_main_13");
                this.starImg_3.texture = RES.getRes("ui_main_14");
                break;
            case 2:
                this.starImg_1.texture = RES.getRes("ui_main_09");
                this.starImg_2.texture = RES.getRes("ui_main_10");
                this.starImg_3.texture = RES.getRes("ui_main_14");
                break;
            case 3:
                this.starImg_1.texture = RES.getRes("ui_main_09");
                this.starImg_2.texture = RES.getRes("ui_main_10");
                this.starImg_3.texture = RES.getRes("ui_main_11");
                break;
        }
    }

}