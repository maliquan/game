class GLabel_bkg extends eui.Label {

    public constructor(parent:egret.DisplayObjectContainer, posx:number, posy:number) {
        super();
        this.size = Global.FS_20;
        this.textColor = Global.COLOR_FORE;
        this.background = true;
        this.backgroundColor = Global.COLOR_BACK;
        this.x = posx;
        this.y = posy;
        parent.addChild(this);
    }
}
