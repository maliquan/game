var ItemMag = (function () {
    function ItemMag() {
    }
    var d = __define,c=ItemMag,p=c.prototype;
    d(ItemMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new ItemMag();
            }
            return this._instance;
        }
    );
    p.getItemVo = function (id, num, level) {
        var vo;
        var type = (id / 10000) >> 0;
        var idx = id % 10000;
        switch (type) {
            case ItemMag.ITEM_TYPE_ITEM:
                vo = ItemCfg.getVoById(idx, num, level);
                break;
            case ItemMag.ITEM_TYPE_EQUIP:
                vo = EquipCfg.getVoById(idx, num, level);
                break;
        }
        return vo;
    };
    ItemMag.ITEM_TYPE_ITEM = 1;
    ItemMag.ITEM_TYPE_EQUIP = 2;
    return ItemMag;
}());
egret.registerClass(ItemMag,'ItemMag');
