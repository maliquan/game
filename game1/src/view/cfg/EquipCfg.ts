/**
 * Created by maliquan on 16/4/26.
 */
class EquipCfg{

    public static itemList:any[] = [
        {id:20000, name:"砍刀", level:1, att:0, def:0, hp:0, speed:0},
    ];

    public static getVoById(idx:number, num:number):ItemVo{
        var cfg:any = EquipCfg.itemList[idx];
        var vo:EquipVo = new EquipVo(cfg.id, num, cfg.level, cfg.name, cfg.att, cfg.def, cfg.hp, cfg.speed);
        return vo;
    }
}
