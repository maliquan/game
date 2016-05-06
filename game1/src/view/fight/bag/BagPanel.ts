/**
 * Created by maliquan on 16/5/6.
 */
class BagPanel extends egret.Sprite{

    private bagNameLab:GLabel_bkg;
    private playerHpLab:GLabel_bkg;
    private bagMaxNumLab:GLabel_bkg;
    private labPool:LabPool;
    private itemLabArr:eui.Label[] = [];

    public constructor(){
        super();
        this.width = Global.STAGE_W*0.7;
        this.height = 100;
        this.init();
    }

    public init():void{
        this.labPool = new LabPool();
        this.bagNameLab = new GLabel_bkg(this, 10, 0);
        this.playerHpLab = new GLabel_bkg(this, 120, 0);
        this.bagMaxNumLab = new GLabel_bkg(this, this.width-200, 0);
        this.showItem();
        this.refresh(true);
    }

    private showItem():void{
        while(this.itemLabArr.length>0){
            this.labPool.setLab(this.itemLabArr.pop());
        }
        var list:ItemVo[] = BagMag.instance.itemList;
        var len:number = list.length;
        for(var i:number=0; i<len; i++){
            this.itemLabArr[i] = this.labPool.getLab(this, (i%5)*100, (i/5)*30+30, list[i].name+"x"+list[i].num, list[i].color);
        }
    }

    private drawLine():void{
        this.graphics.clear();
        this.graphics.lineStyle(1, Global.COLOR_FORE);
        this.graphics.beginFill(Global.COLOR_BACK);
        this.graphics.drawRect(0,10,this.width-1, this.height-11);
        this.graphics.endFill();
    }

    //isItem 是否刷新物品列表
    public refresh(isItem:boolean):void{
        this.drawLine();
        this.bagNameLab.text = LangMag.instance.getText("bag_name_"+UserInfo.ins.user_bag_level);
        var userVo:ObjectVo = UserInfo.ins.userData;
        this.playerHpLab.text = LangMag.instance.getText("bag_player_hp",userVo.curHp, userVo.maxHp);
        var bagNum:number = BagMag.instance.itemList.length;
        var bagMaxNum:number = Global.BAG_LIMIT_ARR[UserInfo.ins.user_bag_level];
        this.bagMaxNumLab.text = LangMag.instance.getText("bag_num",bagNum, bagMaxNum);
        if(isItem){
            this.showItem();
        }
    }

}

class LabPool{
    private labArr:eui.Label[] =[];

    public getLab(parent:BagPanel, _x:number, _y:number, txt:string, color:number):eui.Label{
        if(this.labArr.length > 0){
            return this.labArr.pop();
        }else{
            var lab:eui.Label = new eui.Label();
            lab.textColor = color;
            lab.text = txt;
            lab.x = _x;
            lab.y = _y;
            parent.addChild(lab);
            return lab;
        }
    }

    public setLab(lab:eui.Label):void{
        lab.textColor = Global.COLOR_FORE;
        lab.text = "";
        lab.parent.removeChild(lab);
        this.labArr.push(lab);
    }

}