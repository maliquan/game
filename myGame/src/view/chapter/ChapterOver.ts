class ChapterOver extends ViewCtl {

    private sureBtn: BaseBtn;
    private closeBtn: BaseBtn;
    private resultLab: eui.Label;
    private isWin:boolean = true;
    private chapterId:number = 0;
    private starNum:number = 0;

    public onComplete(): void {
        super.onComplete();
        this.closeBtn.setBkg("closeBtn");
        this.closeBtn.setClkFun(this.closeHandler, this);
        this.sureBtn.setLab("start");
        this.sureBtn.setBkg("button_blue");
        this.sureBtn.setClkFun(this.onButtonClick, this);
    }

    public show():void{
        this.isWin = this.showData.isWin;
        this.starNum = this.showData.starNum;
        this.chapterId = this.showData.chapterId;
        var titleStr:string = this.isWin ? "chapterOver_win" : "chapterOver_lose";
        this.resultLab.text = LangMag.instance.getText(titleStr);
    }

    private onButtonClick(e: egret.TouchEvent) {
        HttpMsg.instance.send(HttpMsgCMD.CHAPTER_OVER, {isWin:this.isWin, chapterId:this.chapterId, starNum:this.starNum}, this.gameOver, this);
    }

    private gameOver(data:any):void{
        var crossId:number = data.crossChapterId;
        var curId:number = data.curChapterId;
        MapMag.instance.updataBtnId(crossId);
        MapMag.instance.updataBtnId(curId);
        this.closeHandler(null);
    }

    private closeHandler(e: egret.TouchEvent) {
        PopUpMag.ins().removeAll();
        PopUpMag.ins().showWin(WinName.MAIN_SCENE, 1);
    }

}