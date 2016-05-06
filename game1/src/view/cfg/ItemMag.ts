class ItemMag {

    public static ITEM_TYPE_ITEM:number = 1;
    public static ITEM_TYPE_EQUIP:number = 2;

    private static _instance:ItemMag;

    static get instance():ItemMag {
        if (!this._instance) {
            this._instance = new ItemMag();
        }
        return this._instance;
    }

    public getItemVo(id:number, num:number, level:number):ItemVo{
        var vo:ItemVo;
        var type:number = (id/10000)>>0;
        var idx:number = id % 10000;
        switch (type){
            case ItemMag.ITEM_TYPE_ITEM:
                vo = ItemCfg.getVoById(idx, num, level);
                break;
            case ItemMag.ITEM_TYPE_EQUIP:
                vo = EquipCfg.getVoById(idx, num, level);
                break;
        }
        return vo;
    }

}