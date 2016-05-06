/**
 * Created by maliquan on 16/4/26.
 */
class ItemVo {
    public id:number = 0;
    public num:number = 0;
    public level:number = 0;
    public name:string = "";

    public constructor(id:number, num:number, level:number, name:string){
        this.id = id;
        this.num = num;
        this.level = level;
        this.name = name;
    }

    public get color():number{
        return Global.LEVEL_COLOR_ARR[this.level];
    }

}