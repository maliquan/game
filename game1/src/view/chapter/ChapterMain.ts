class ChapterMain extends ViewCtl implements IMessage{

    private chapterMag:ChapterMag;
    private chapterId:number = 0;

    public onComplete(): void {
        super.onComplete();
    }

    public show():void{
        super.show();
        Message.instance.add(LocalId.CHAPTER_OVER, this);

        this.chapterId = this.showData;
        this.chapterMag = new ChapterMag();
        this.chapterMag.show(this.chapterId, this);
    }

    public close():void{
        super.close();
        Message.instance.remove(LocalId.CHAPTER_OVER, this);
    }

    recvMsg(cmd:number, data:any):void {
        switch (cmd){
            case LocalId.CHAPTER_OVER:
                PopUpMag.ins().showWin(WinName.CHAPTER_OVER, 5, true, {isWin:data.isWin,starNum:3,chapterId:this.chapterId});
                break;
        }
    }


}