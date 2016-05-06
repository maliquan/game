/**
 * Created by maliquan on 16/4/23.
 */
class StoragePanel extends egret.Sprite{

    private group:eui.Group;
    private scroller:eui.Scroller;
    private labArr:eui.Label[] = [];
    private showP:ItemShowPanel;

    public constructor(){
        super();

        this.width = Global.STAGE_W * 0.7;
        this.height = Global.STAGE_H - 100;

        this.group = new eui.Group();
        this.group.width = 200;
        this.group.height = 20;
        this.scroller = new eui.Scroller();
        this.scroller.width = 200;
        this.scroller.height = this.height;
        this.scroller.viewport = this.group;
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;//不可以横向滚动
        this.addChild(this.scroller);

        this.refresh();
        this.showP = new ItemShowPanel();
        this.showP.x = 200;
        this.addChild(this.showP);

        this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    }

    public refresh():void{
        while(this.group.numChildren>0){
            this.labArr.push(<eui.Label>this.group.removeChildAt(0));
        }
        var list:ItemVo[] = StorageMag.instance.itemList;
        var len:number = list.length;
        for(var i:number=0; i<len; i++) {
            var lab:eui.Label;
            var vo:ItemVo = list[i];
            if(this.labArr.length < 1){
                lab = new eui.Label();
            }else{
                lab = this.labArr.pop();
            }
            lab.text = vo.name + " x" + vo.num;
            lab["itemVo"] = vo;
            lab.width = 200;
            lab.textColor = vo.color;
            lab.y = i * (lab.height + 10);
            this.group.addChild(lab);
        }
    }

    private tapHandler(e:egret.TouchEvent):void{
        if(e.target && e.target.itemVo){
            this.showP.showItem(e.target.itemVo);
        }
    }

}
