var Server = (function () {
    function Server() {
    }
    var d = __define,c=Server,p=c.prototype;
    Server.request = function (url, param) {
        var data;
        var cfg = egret.localStorage.getItem(url);
        if (cfg) {
            data = JSON.parse(cfg);
        }
        switch (url) {
            case HttpMsgCMD.LOGIN:
                data = data || {
                    "ret": 0,
                    "user_bag_level": 0,
                    "nameStr": "@",
                    "maxHp": 500,
                    "minAtt": 1000,
                    "maxAtt": 1500,
                    "def": 5,
                    "speed": 1,
                    "storageList": [],
                    "bagList": []
                };
                break;
            case HttpMsgCMD.SAVE_STORAGE:
                url = HttpMsgCMD.LOGIN;
                data = this.localData;
                data.storageList = data.storageList.concat(param);
                break;
            case HttpMsgCMD.SAVE_BAG:
                url = HttpMsgCMD.LOGIN;
                data = this.localData;
                data.bagList = data.bagList.concat(param);
                break;
        }
        this.saveData(url, data);
        return data;
    };
    Server.clean = function () {
        egret.localStorage.clear();
    };
    /* 保存数据到本地 */
    Server.saveData = function (url, data) {
        this.localData = data;
        egret.localStorage.clear();
        egret.localStorage.setItem(url, JSON.stringify(data));
        console.log(JSON.stringify(url + " --- " + JSON.stringify(data)));
    };
    Server.localData = {};
    return Server;
}());
egret.registerClass(Server,'Server');
