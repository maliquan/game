/**
 * Created by maliquan on 16/4/26.
 */
var ItemCfg = (function () {
    function ItemCfg() {
    }
    var d = __define,c=ItemCfg,p=c.prototype;
    ItemCfg.getVoById = function (idx, num, level) {
        var cfg = this.itemList[idx];
        return new ItemVo(cfg.id, num, level, cfg.name);
    };
    ItemCfg.itemList = [
        { id: 10000, name: "肉" },
    ];
    return ItemCfg;
}());
egret.registerClass(ItemCfg,'ItemCfg');
