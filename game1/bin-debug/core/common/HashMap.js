var HashMap = (function () {
    function HashMap() {
        //当前数量
        this.hashCode = 0;
        this.hashCode = HashMap.HASH_COUNT++;
    }
    var d = __define,c=HashMap,p=c.prototype;
    /**
     * 加入数据
     * @param key 键
     * @param value 值
     */
    p.put = function (key, value) {
        this[key] = value;
    };
    /**
     * 获得数据
     * @param key 键
     */
    p.get = function (key) {
        return this[key];
    };
    /**
     * 移除数据
     * @param key 键
     */
    p.remove = function (key) {
        var value = this[key];
        if (value != null) {
            delete this[key];
        }
        return value;
    };
    /**
     * 是否存在
     * @param key 键
     */
    p.contains = function (key) {
        return this[key] != null;
    };
    /**
     * 获得所有键值
     */
    p.keys = function () {
        var keys = Object.keys(this);
        var index = keys.indexOf("hashCode");
        if (index > -1) {
            keys.splice(index, 1);
        }
        return keys;
    };
    /**
     * 清空数据
     */
    p.clear = function () {
        var keys = this.keys();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            this.remove(keys[i]);
        }
    };
    //HashMap计数
    HashMap.HASH_COUNT = 0;
    return HashMap;
}());
egret.registerClass(HashMap,'HashMap');
