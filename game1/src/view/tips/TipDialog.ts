/**
 * Created by maliquan on 16/4/20.
 */
class TipDialog extends ViewCtl{

    private bkgShape:egret.Shape;
    private titleLab:GLabel;
    private contentLab:GLabel;
    private btn1:GBtn;
    private btn2:GBtn;
    private callFun:Function;
    private thisObject:any;

    public constructor(){
        super();
        this.width = 350;
        this.height = 200 + 15;

        this.bkgShape = new egret.Shape();
        this.bkgShape.graphics.lineStyle(2, Global.COLOR_FORE, 0.8);
        this.bkgShape.graphics.beginFill(Global.COLOR_BACK);
        this.bkgShape.graphics.drawRect(0, 0, this.width, this.height);
        this.bkgShape.graphics.endFill();
        this.bkgShape.y = 15;
        this.addChild(this.bkgShape);

        this.titleLab = new GLabel();
        this.titleLab.bold = true;
        this.titleLab.background = true;
        this.titleLab.backgroundColor = Global.COLOR_BACK;
        this.titleLab.x = 20;
        this.titleLab.y = 0;
        this.addChild(this.titleLab);

        this.contentLab = new GLabel();
        this.contentLab.width = this.width - 20;
        this.contentLab.x = 10;
        this.contentLab.y = 50;
        this.addChild(this.contentLab);

        this.btn1 = new GBtn(this.yesHandler, this);
        this.btn1.x = this.width*0.25 - this.btn1.width*0.5;
        this.btn1.y = this.height - 50;
        this.addChild(this.btn1);

        this.btn2 = new GBtn(this.noHandler, this);
        this.btn2.x = this.width*0.75 - this.btn2.width*0.5;
        this.btn2.y = this.height - 50;
        this.addChild(this.btn2);
    }

    private yesHandler():void{
        var str:string = LangMag.instance.getText("loginYes");
        this.clean();
        this.onComplete(str);
    }

    private noHandler():void{
        var str:string = LangMag.instance.getText("loginNo");
        this.clean();
        this.onComplete(str);
    }

   private onComplete(str:string):void{
        if(this.callFun){
            this.callFun.call(this.thisObject, str);
        }
   }

    private clean():void{
        this.btn1.clean();
        this.btn2.clean();
    }

    public show():void{
        super.show();
        this.titleLab.text = this.showData[0];
        this.contentLab.text = this.showData[1];
        this.btn1.text = this.showData[2];
        this.btn2.text = this.showData[3];
        this.callFun = this.showData[4];
        this.thisObject = this.showData[5];
    }

}
