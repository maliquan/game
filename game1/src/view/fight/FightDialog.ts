/**
 * Created by maliquan on 16/4/20.
 */
class FightDialog extends ViewCtl{

    private bkgShape:egret.Shape;
    private titleLab:GLabel;
    private contentLab:GLabel;
    private btn1:GBtn;
    private callFun:Function;
    private thisObject:any;
    private myObj:ObjectSp;
    private monsterObj:ObjectSp;
    private isOver:boolean = false;
    private startObj:any;

    public constructor(){
        super();
    }

    public createChildren():void{
        super.createChildren();

        this.width = 350;
        this.height = 200 + 15;

        var startStr:string = LangMag.instance.getText("fight_get_item");
        this.startObj = { text:startStr+"\n", style:{"textColor":Global.COLOR_FORE, "size":Global.FS_20}};

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

        this.myObj = new ObjectSp();
        this.myObj.x = this.width*0.25 - this.myObj.width;
        this.myObj.y = this.contentLab.y + this.contentLab.height + 10;
        this.addChild(this.myObj);

        this.monsterObj = new ObjectSp();
        this.monsterObj.x = this.width*0.75 - this.monsterObj.width;
        this.monsterObj.y = this.contentLab.y + this.contentLab.height + 10;
        this.addChild(this.monsterObj);

        if(this.isFirst==true){
            this.isFirst = false;
            this.show();
        }
    }

    public show():void{
        if(this.isFirst == true){
            return;
        }
        super.show();
        this.init();
    }

    private init():void{
        this.titleLab.text = "";
        this.contentLab.text = "";
        this.callFun = this.close;
        this.thisObject = this;

        this.myObj.init("@", 1, this.playerDie, this);
        this.monsterObj.init("M", 3, this.monsterDie, this);

        this.isOver = false;
        this.btn1.setTxt(LangMag.instance.getText("fight"));

        var that = this;
        this.monsterObj.startAtt(function(att:number){
            that.myObj.defense(att);
        }, this);
    }

    private yesHandler():void{
        if(this.isOver){
            this.close();
        }else{
            var that = this;
            this.myObj.startAtt(function(att:number){
                that.monsterObj.defense(att);
            }, this);
            this.btn1.playProgress(this.myObj.data.speed);
        }
    }

    private playerDie():void{
        Message.instance.localSend(LocalId.SHOW_MESSAGE, ["die"]);
        PopUpMag.ins().remove(this.name);
        //回家
        BagMag.instance.cleanAll();
        Message.instance.localSend(LocalId.GO_HOME);
    }

    private monsterDie():void{
        //过关
        var dropArr:Array<egret.ITextElement> = [this.startObj];
        var dropCfg:any[] = DropCfg.dropList[UserInfo.ins.mapIdx];
        var len:number = dropCfg.length;
        for(var i:number=0; i<len; i++){
            var item:any = dropCfg[i];
            var random:number = Math.random();
            if(random < item.p){
                BagMag.instance.addItem(item.id, 1);
                var drowVo:ItemVo = ItemMag.instance.getItemVo(item.id, 1);
                var str = " " + drowVo.name + "x" + drowVo.num;
                dropArr.push({ text:str+"\n", style:{"textColor":drowVo.color, "size":Global.FS_20}});
            }
        }
        if(dropArr.length > 1){
            Message.instance.localSend(LocalId.SHOW_MESSAGE_COLOR, dropArr);
        }
        this.isOver = true;
        this.btn1.setTxt(LangMag.instance.getText("close"));
    }

    public close():void{
        super.close();
        this.clean();
        Message.instance.localSend(LocalId.FIGHT_OVER);
    }

    private clean():void{
        this.myObj.clean();
        this.monsterObj.clean();
    }


}
