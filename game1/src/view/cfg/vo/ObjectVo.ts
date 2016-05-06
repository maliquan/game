/**
 * Created by maliquan on 16/4/22.
 */
class ObjectVo{

    public curHp:number = 0;
    public maxHp:number = 0;
    public minAtt:number = 0;
    public maxAtt:number = 0;
    public def:number = 0;
    public speed:number = 0;
    public nameStr:string = "";

    public constructor(name:string, data:number[]){
        this.nameStr = name;
        this.maxHp = data[0];
        this.minAtt = data[1];
        this.maxAtt = data[2];
        this.def = data[3];
        this.speed = data[4];
    }


}
