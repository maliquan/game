/**
 * Created by maliquan on 16/4/26.
 */
class ItemCfg{

    public static itemList:any[] = [
        {id:10000, name:"肉"},
    ];

    public static getVoById(idx:number, num:number, level:number):ItemVo{
        var cfg:any = this.itemList[idx];
        return new ItemVo(cfg.id, num, level, cfg.name);
    }
}
