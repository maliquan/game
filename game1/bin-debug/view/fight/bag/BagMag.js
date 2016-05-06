var BagMag = (function () {
    function BagMag() {
        this._itemList = [];
    }
    var d = __define,c=BagMag,p=c.prototype;
    d(BagMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new BagMag();
            }
            return this._instance;
        }
    );
    p.addItem = function (id, num, level) {
        for (var i = 0; i < this._itemList.length; i++) {
            var curItemVo = this._itemList[i];
            if (curItemVo.id == id) {
                curItemVo.num += num;
                this.lastAddItemVo = curItemVo;
                num = 0;
                break;
            }
        }
        if (num > 0) {
            this.lastAddItemVo = ItemMag.instance.getItemVo(id, num, level);
            this.itemList.push(this.lastAddItemVo);
        }
        this.saveData();
    };
    p.cleanAll = function () {
        this._itemList = [];
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
        HttpMsg.instance.send(HttpMsgCMD.SAVE_BAG, saveList);
    };
    return BagMag;
}());
egret.registerClass(BagMag,'BagMag');
