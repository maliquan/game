class StorageMag {
    private static _instance:StorageMag;
    
    private _itemList:ItemVo[] = [];//仓库所有物品

    static get instance():StorageMag {
        if (!this._instance) {
            this._instance = new StorageMag();
        }
        return this._instance;
    }

    public addItem(id:number, num:number, isSave:boolean=true):void{
        for(var i:number=0; i<this._itemList.length; i++){
            if(this._itemList[i].id == id){
                this._itemList[i].num += num;
                num = 0;
                break
            }
        }
        if(num > 0){
            this.itemList.push( ItemMag.instance.getItemVo(id, num) );
        }
        if(isSave){
            this.saveData();
        }
    }

    public initItems(list:number[][]):void{
        for(var i:number=0; i<list.length; i++){
            var item:any = list[i];
            this.addItem(item[0], item[1], false);
        }
    }

    public addBag(itemList:ItemVo[]):void{
        var len:number = itemList.length;
        for(var j:number=0; j<len; j++){
            var addItem:ItemVo = itemList[j];
            for(var i:number=0; i<this._itemList.length; i++){
                var curItemVo:ItemVo = this._itemList[i];
                if(curItemVo.id == addItem.id){
                    curItemVo.num += addItem.num;
                    addItem.num = 0;
                    break
                }
            }
            if(addItem.num > 0){
                this.itemList.push(addItem);
            }
        }
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
        HttpMsg.instance.send(HttpMsgCMD.SAVE_STORAGE, saveList);
    }

}