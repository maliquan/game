var HttpMsg = (function () {
    function HttpMsg() {
        //请求数据队列
        this.reqsList = null;
        //请求数据ID
        this.reqsId = 0;
        //是否请求数据中
        this.isReqs = false;
        //服务器时间
        this.sTime = 0;
        //请求key
        this.key = "";
        this.reqsList = [0];
    }
    var d = __define,c=HttpMsg,p=c.prototype;
    d(HttpMsg, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new HttpMsg();
            }
            return this._instance;
        }
    );
    /**
     * 发送消息
     * @param url
     * @param params
     * @param callBack
     * @param thisObject
     * @param isWait 是否等待消息返回
     */
    p.send = function (url, params, callBack, thisObject, isWait) {
        if (isWait === void 0) { isWait = true; }
        //-------------------debug----------------------
        callBack.call(thisObject, Server.request(url, params));
        return;
        //-------------------debug----------------------
        if (isWait) {
            var index = this.reqsList[0] * 5;
            this.reqsList[index + 1] = url;
            this.reqsList[index + 2] = params;
            this.reqsList[index + 3] = callBack;
            this.reqsList[index + 4] = thisObject;
            this.reqsList[index + 5] = isWait;
            this.reqsList[0]++;
            this.checkData();
        }
        else {
            this.sendData([url, params, callBack, thisObject, isWait]);
        }
    };
    /**
     * 检测数据
     */
    p.checkData = function () {
        if (!this.isReqs && this.reqsList[0] > 0) {
            this.reqsList[0]--;
            var nowList = this.reqsList.splice(1, 5);
            this.sendData(nowList);
        }
    };
    /**
     * 发送数据
     * @param data
     */
    p.sendData = function (data) {
        var url = data[0];
        var params = data[1] || {};
        var callBack = data[2];
        var thisObject = data[3];
        var isWait = data[4];
        //请求唯一ID
        params.reqsId = ++this.reqsId;
        var thatObjects = this;
        var errCount = 0;
        function success(data) {
            console.log(data);
            if (isWait) {
                thatObjects.isReqs = false;
            }
            if (data) {
                //请求成功
                if (callBack) {
                    callBack.call(thisObject, data);
                }
            }
            thatObjects.checkData();
        }
        function error(xhr, errorType, err) {
            console.log("net error");
            if (isWait) {
                thatObjects.isReqs = false;
            }
            thatObjects.checkData();
        }
        if (isWait) {
            thatObjects.isReqs = true;
        }
        GameUtils.httpReqs(Global.BASE_URL + url, params, success, error, this);
    };
    d(p, "serverTime"
        /**
         * 获得系统时间
         */
        ,function () {
            return this.sTime + Math.floor(egret.getTimer() / 1000);
        }
    );
    return HttpMsg;
})();
egret.registerClass(HttpMsg,'HttpMsg');
