/**
 * Created by maliquan on 16/4/26.
 */
class ItemCfg{

    public static itemList:any[] = [
        {id:10000, name:"能量", level:0},
    ];

    public static getVoById(idx:number, num:number):ItemVo{
        var cfg:any = this.itemList[idx];
        return new ItemVo(cfg.id, num, cfg.level, cfg.name);
    }
}
