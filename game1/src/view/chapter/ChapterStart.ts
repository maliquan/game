class ChapterStart extends ViewCtl {

    private startBtn: BaseBtn;
    private closeBtn: BaseBtn;
    private titleLab: eui.Label;
    private tipLab: eui.Label;
    private chapterId:number = 0;

    public onComplete(): void {
        super.onComplete();
        this.closeBtn.setBkg("closeBtn");
        this.closeBtn.setClkFun(this.closeHandler, this);
        this.startBtn.setLab("start");
        this.startBtn.setBkg("button_green");
        this.startBtn.setClkFun(this.onButtonClick, this);
    }

    public show():void{
        super.show();
        this.chapterId = this.showData;
        this.titleLab.text = LangMag.instance.getText("chapterStartTitle", [this.chapterId]);
        this.tipLab.text = LangMag.instance.getText("chapterStartTip");
    }

    private onButtonClick(e: egret.TouchEvent) {
        HttpMsg.instance.send(HttpMsgCMD.START_CHAPTER, {id:this.chapterId}, this.loginSuccess, this);//开始关卡
    }

    private loginSuccess(data:any):void{
        if(data.ret == 0){
            UserInfo.ins.parserLoginInfo(data);
            var that = this;
            LoadMag.instance.load("mainChapter",function():void{
                RES.getResAsync("map"+that.chapterId, function(){
                    PopUpMag.ins().removeAll();
                    PopUpMag.ins().showWin(WinName.CHAPTER_MAIN, 1, false, that.chapterId, PopUpMag.LAYER_SCENE);
                },this);
            },this);
        }else{
            //请求失败
            var errorStr:string = LangMag.instance.getText(data.ret);
            console.log(errorStr);
        }
    }

    private closeHandler(e: egret.TouchEvent) {
        PopUpMag.ins().remove(this.name);
    }

}