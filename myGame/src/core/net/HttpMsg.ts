class HttpMsg {
    private static _instance:HttpMsg;

    //请求数据队列
    private reqsList:any[] = null;
    //请求数据ID
    private reqsId:number = 0;
    //是否请求数据中
    private isReqs:boolean = false;
    //服务器时间
    private sTime:number = 0;
    //请求key
    key:string = "";

    constructor() {
        this.reqsList = [0];
    }

    static get instance():HttpMsg {
        if (!this._instance) {
            this._instance = new HttpMsg();
        }
        return this._instance;
    }

    /**
     * 发送消息
     * @param url
     * @param params
     * @param callBack
     * @param thisObject
     * @param isWait 是否等待消息返回
     */
    send(url:string, params:any, callBack:Function, thisObject:any, isWait:boolean = true):void {
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
        } else {
            this.sendData([url, params, callBack, thisObject, isWait]);
        }
    }

    /**
     * 检测数据
     */
    private checkData():void {
        if (!this.isReqs && this.reqsList[0] > 0) {
            this.reqsList[0]--;
            var nowList:any[] = this.reqsList.splice(1, 5);
            this.sendData(nowList);
        }
    }

    /**
     * 发送数据
     * @param data
     */
    private sendData(data:any[]):void {
        var url:string = data[0];
        var params:any = data[1] || {};
        var callBack:Function = data[2];
        var thisObject:any = data[3];
        var isWait:boolean = data[4];
        //请求唯一ID
        params.reqsId = ++this.reqsId;
        var thatObjects = this;
        var errCount:number = 0;

        function success(data):void {
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

        function error(xhr:XMLHttpRequest, errorType:string, err:Error):void {
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
    }

    /**
     * 获得系统时间
     */
    get serverTime():number {
        return this.sTime + Math.floor(egret.getTimer() / 1000);
    }
}