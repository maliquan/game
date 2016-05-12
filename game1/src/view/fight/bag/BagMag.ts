class BagMag {
    private static _instance:BagMag;
    
    private _itemList:ItemVo[] = [];

    static get instance():BagMag {
        if (!this._instance) {
            this._instance = new BagMag();
        }
        return this._instance;
    }

    public addItem(id:number, num:number):void{
        for(var i:number=0; i<this._itemList.length; i++){
            var curItemVo:ItemVo = this._itemList[i];
            if(curItemVo.id == id){
                curItemVo.num += num;
                num = 0;
                break
            }
        }
        if(num > 0){
            this.itemList.push(ItemMag.instance.getItemVo(id, num));
        }
        this.saveData();
    }

    public cleanAll():void{
        this._itemList = [];
        this.saveData();
    }

    public removeItem(id:number, num:number):void{
        var len:number = this._itemList.length;
        for(var i:number=0; i<len; i++){
            if(this._itemList[i].id == id){
                this._itemList[i].num -= num;
                if(this._itemList[i].num <= 0){
                    this._itemList.splice(i, 1);
                }
                return;
            }
        }
        this.saveData();
    }

    public get itemList():ItemVo[]{
        return this._itemList;
    }

    private saveData():void{
        var saveList:number[][] = [];
        var itemList:ItemVo[] = this._itemList;
        for(var i:number=0; i<itemList.length; i++){
            var item:ItemVo = itemList[i];
            saveList[i] = [item.id, item.num, item.level];
        }
        HttpMsg.instance.send(HttpMsgCMD.SAVE_BAG, saveList);
    }

}