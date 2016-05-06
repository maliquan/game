var StorageMag = (function () {
    function StorageMag() {
        this._itemList = []; //仓库所有物品
    }
    var d = __define,c=StorageMag,p=c.prototype;
    d(StorageMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new StorageMag();
            }
            return this._instance;
        }
    );
    p.addItem = function (id, num, level, isSave) {
        if (isSave === void 0) { isSave = true; }
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i].id == id) {
                this._itemList[i].num += num;
                num = 0;
                break;
            }
        }
        if (num > 0) {
            this.itemList.push(ItemMag.instance.getItemVo(id, num, level));
        }
        if (isSave) {
            this.saveData();
        }
    };
    p.initItems = function (list) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            this.addItem(item[0], item[1], item[2], false);
        }
    };
    p.addBag = function (itemList) {
        var len = itemList.length;
        for (var j = 0; j < len; j++) {
            var addItem = itemList[j];
            for (var i = 0; i < this._itemList.length; i++) {
                var curItemVo = this._itemList[i];
                if (curItemVo.id == addItem.id) {
                    curItemVo.num += addItem.num;
                    addItem.num = 0;
                    break;
                }
            }
            if (addItem.num > 0) {
                this.itemList.push(addItem);
            }
        }
        this.saveData();
    };
    p.removeItem = function (id, num) {
        var len = this._itemList.length;
        for (var i = 0; i < len; i++) {
            if (this._itemList[i].id == id) {
                this._itemList[i].num -= num;
                if (this._itemList[i].num <= 0) {
                    this._itemList.splice(i, 1);
                }
                return;
            }
        }
        this.saveData();
    };
    d(p, "itemList"
        ,function () {
            return this._itemList;
        }
    );
    p.saveData = function () {
        var saveList = [];
        var itemList = this._itemList;
        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            saveList[i] = [item.id, item.num, item.level];
        }
        HttpMsg.instance.send(HttpMsgCMD.SAVE_STORAGE, saveList);
    };
    return StorageMag;
}());
egret.registerClass(StorageMag,'StorageMag');
