/**
 * Created by maliquan on 16/4/26.
 */
class EquipVo extends  ItemVo{

    public att:number = 0;
    public def:number = 0;
    public hp:number = 0;
    public speed:number = 0;

    public constructor(id:number, num:number, level:number, name:string,
                       att:number, def:number, hp:number, speed:number){
        super(id, num, level, name);
        this.att = att;
        this.def = def;
        this.hp = hp;
        this.speed = speed;
    }


}