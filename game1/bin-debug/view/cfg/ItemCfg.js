/**
 * Created by maliquan on 16/4/26.
 */
var ItemCfg = (function () {
    function ItemCfg() {
    }
    var d = __define,c=ItemCfg,p=c.prototype;
    ItemCfg.getVoById = function (idx, num) {
        var cfg = this.itemList[idx];
        return new ItemVo(cfg.id, num, cfg.level, cfg.name);
    };
    ItemCfg.itemList = [
        { id: 10000, name: "能量", level: 0 },
    ];
    return ItemCfg;
}());
egret.registerClass(ItemCfg,'ItemCfg');
