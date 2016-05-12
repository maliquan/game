/**
 * Created by maliquan on 16/5/11.
 */
class HomePanel extends egret.Sprite{

    private heroPanel:egret.Sprite;
    private equipPanel:egret.Sprite;
    private heroLabArr:GLabel[] = [];
    private equipLabArr:GLabel[] = [];
    private leftW:number = 100;
    private showP:ItemShowPanel;

    public constructor(){
        super();
        this.width = Global.STAGE_W * 0.7;
        this.height = Global.STAGE_H - 100;
        this.init();
    }

    private init():void{
        this.showP = new ItemShowPanel();
        this.showP.x = this.leftW + 100;
        this.addChild(this.showP);

        this.initHeroPanel();
        this.initEquipPanel();
        this.update();
    }

    public update():void{
        var heroPropertyStr:string[] = LangMag.instance.getText("heroProperty").split(",");
        for(var i:number=0; i<6; i++){
            var lab:GLabel = this.heroLabArr[i];
            lab.text = heroPropertyStr[i];

            lab = this.equipLabArr[i];
            if(lab["itemVo"]){
                lab.text = lab["itemVo"].name;
            }else{
                lab.text = LangMag.instance.getText("empty");
            }
        }
    }

    private initHeroPanel():void{
        this.heroPanel = new egret.Sprite();
        this.heroPanel.x = 10;
        this.heroPanel.y = 20;
        this.heroPanel.width = this.leftW;
        this.heroPanel.height = 200;
        this.addChild(this.heroPanel);
        this.heroPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroTapHandler, this);

        //draw hero
        this.heroPanel.graphics.lineStyle(1, Global.COLOR_FORE);
        this.heroPanel.graphics.moveTo(0, 10);
        this.heroPanel.graphics.lineTo(this.heroPanel.width, 10);
//        this.heroPanel.graphics.beginFill(Global.COLOR_BACK);
//        this.heroPanel.graphics.drawRect(0,10,this.heroPanel.width, this.heroPanel.height);
//        this.heroPanel.graphics.endFill();
        var heroTitleLab:GLabel_bkg = new GLabel_bkg(this.heroPanel, 10, 0);
        heroTitleLab.text = LangMag.instance.getText("heroTitleLab");

        for(var i:number=0; i<6; i++){
            var lab:GLabel = new GLabel();
            lab["idx"] = i;
            this.heroPanel.addChild(lab);
            lab.y = 30 + 25 * i;
            this.heroLabArr[i] = lab;
        }
    }

    private initEquipPanel():void{
        this.equipPanel = new egret.Sprite();
        this.equipPanel.x = 10;
        this.equipPanel.y = this.heroPanel.y + this.heroPanel.height + 30;
        this.equipPanel.width = this.leftW;
        this.equipPanel.height = 200;
        this.addChild(this.equipPanel);
        this.equipPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipTapHandler, this);

        //draw equip
        this.equipPanel.graphics.lineStyle(1, Global.COLOR_FORE);
        this.equipPanel.graphics.moveTo(0, 10);
        this.equipPanel.graphics.lineTo(this.equipPanel.width, 10);
//        this.equipPanel.graphics.beginFill(Global.COLOR_BACK);
//        this.equipPanel.graphics.drawRect(0,10,this.equipPanel.width, this.equipPanel.height);
//        this.equipPanel.graphics.endFill();
        var equipTitleLab:GLabel_bkg = new GLabel_bkg(this.equipPanel, 10, 0);
        equipTitleLab.text = LangMag.instance.getText("equipTitleLab");

        var equipArr:ItemVo[] = UserInfo.ins.equipArr;
        for(var i:number=0; i<6; i++){
            var lab:GLabel = new GLabel();
            lab["itemVo"] = equipArr[i] || null;
            this.equipPanel.addChild(lab);
            lab.y = 30 + 25 * i;
            this.equipLabArr[i] = lab;
        }
    }

    private heroTapHandler(e:egret.TouchEvent):void{
        if(e.target && e.target.idx){
//            this.showP.showItem(e.target.itemVo);
        }
    }

    private equipTapHandler(e:egret.TouchEvent):void{
        if(e.target && e.target.itemVo){
            this.showP.showItem(e.target.itemVo);
        }
    }

}