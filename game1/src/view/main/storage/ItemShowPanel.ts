/**
 * Created by maliquan on 16/4/26.
 */
class ItemShowPanel extends egret.Sprite{

    private nameLab:eui.Label;

    public constructor(){
        super();

        this.nameLab = new eui.Label();
        this.addChild(this.nameLab);
    }

    public showItem(vo:ItemVo):void{
        this.nameLab.text = vo.name + " x" + vo.num;
        this.nameLab.textColor = vo.color;
    }

}
