class HashMap {
    //HashMap计数
    static HASH_COUNT:number = 0;
    //当前数量
    hashCode:number = 0;

    constructor() {
        this.hashCode = HashMap.HASH_COUNT++;
    }

    /**
     * 加入数据
     * @param key 键
     * @param value 值
     */
    put(key:any, value:any):void {
        this[key] = value;
    }

    /**
     * 获得数据
     * @param key 键
     */
    get(key:any):any {
        return this[key];
    }

    /**
     * 移除数据
     * @param key 键
     */
    remove(key:any):any {
        var value = this[key];
        if (value != null) {
            delete this[key];
        }
        return value;
    }

    /**
     * 是否存在
     * @param key 键
     */
    contains(key:any):boolean {
        return this[key] != null;
    }

    /**
     * 获得所有键值
     */
    keys():string[] {
        var keys = Object.keys(this);
        var index = keys.indexOf("hashCode");
        if (index > -1) {
            keys.splice(index, 1);
        }
        return keys;
    }

    /**
     * 清空数据
     */
    clear():void {
        var keys = this.keys();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            this.remove(keys[i]);
        }
    }
}