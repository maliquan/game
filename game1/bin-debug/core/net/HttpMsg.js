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
    p.send = function (url, params, callBack, thisObject) {
        //        //-------------------debug----------------------
        //        callBack.call(thisObject, Server.request(url, params));
        //        return;
        //        //-------------------debug----------------------
        var index = this.reqsList[0] * 5;
        this.reqsList[index + 1] = url;
        this.reqsList[index + 2] = params;
        this.reqsList[index + 3] = callBack;
        this.reqsList[index + 4] = thisObject;
        this.reqsList[0]++;
        this.checkData();
    };
    /**
     * 检测数据
     */
    p.checkData = function () {
        if (!this.isReqs && this.reqsList[0] > 0) {
            this.reqsList[0]--;
            var nowList = this.reqsList.splice(1, 4);
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
        //请求唯一ID
        params.reqsId = ++this.reqsId;
        var thatObjects = this;
        var errCount = 0;
        function success(event) {
            var loader = event.target;
            var data = loader.data;
            console.log(data);
            thatObjects.isReqs = false;
            if (data) {
                //请求成功
                if (callBack) {
                    callBack.call(thisObject, JSON.parse(data + ""));
                }
            }
            thatObjects.checkData();
        }
        function error(xhr, errorType, err) {
            console.log("net error");
            thatObjects.isReqs = false;
            thatObjects.checkData();
        }
        thatObjects.isReqs = true;
        var urls = Global.BASE_URL + url;
        var loader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, success, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        var request = new egret.URLRequest(urls);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables(GameUtils.objectToUrlParam(params));
        loader.load(request);
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
}());
egret.registerClass(HttpMsg,'HttpMsg');
