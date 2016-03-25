class MainScene extends ViewCtl {

   public mainTop:MainTop;

    public onComplete(): void {
        super.onComplete();
        this.mainTop.init();
    }

    public show():void{
        super.show();
        this.mainTop.show();
        MapMag.instance.init(this);
    }

    public close():void{
        super.close();
    }

}