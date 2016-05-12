/**
 * Created by maliquan on 16/4/26.
 */
var EquipCfg = (function () {
    function EquipCfg() {
    }
    var d = __define,c=EquipCfg,p=c.prototype;
    EquipCfg.getVoById = function (idx, num) {
        var cfg = EquipCfg.itemList[idx];
        var vo = new EquipVo(cfg.id, num, cfg.level, cfg.name, cfg.att, cfg.def, cfg.hp, cfg.speed);
        return vo;
    };
    EquipCfg.itemList = [
        { id: 20000, name: "砍刀", level: 1, att: 0, def: 0, hp: 0, speed: 0 },
    ];
    return EquipCfg;
}());
egret.registerClass(EquipCfg,'EquipCfg');
