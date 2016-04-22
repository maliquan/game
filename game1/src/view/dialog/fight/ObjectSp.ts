/**
 * Created by maliquan on 16/4/22.
 */
class ObjectSp extends egret.Sprite{

    private maxHp:number;
    private hpLab:eui.Label;
    private nameLab:eui.Label;

    public constructor(hp:number, name:string, level:number){
        super();
        this.maxHp = hp;

        this.hpLab = new eui.Label();
        this.hpLab.textColor = Global.COLOR_FORE;
        this.hpLab.size = 20;
        this.addChild(this.hpLab);

        this.nameLab = new eui.Label();
        this.nameLab.textColor = Global.LEVEL_COLOR_ARR[level];
        this.nameLab.text = name;
        this.nameLab.size = 20;
        this.addChild(this.nameLab);

        this.setHp(hp);
    }

    public setHp(curHp:number):void{
        this.hpLab.text = curHp + "/" + this.maxHp;
        this.nameLab.x = this.hpLab.width*0.5 - this.nameLab.width*0.5;
        this.nameLab.y = this.hpLab.height + 2;
    }
}