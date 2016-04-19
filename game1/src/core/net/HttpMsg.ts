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
    send(url:string, params:any, callBack:Function, thisObject:any):void {
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
    }

    /**
     * 检测数据
     */
    private checkData():void {
        if (!this.isReqs && this.reqsList[0] > 0) {
            this.reqsList[0]--;
            var nowList:any[] = this.reqsList.splice(1, 4);
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
        //请求唯一ID
        params.reqsId = ++this.reqsId;
        var thatObjects = this;
        var errCount:number = 0;

        function success(event: egret.Event):void {
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            var data: egret.URLVariables = loader.data;
            console.log(data);
            thatObjects.isReqs = false;
            if (data) {
                //请求成功
                if (callBack) {
                    callBack.call(thisObject, JSON.parse(data+""));
                }
            }
            thatObjects.checkData();
        }

        function error(xhr:XMLHttpRequest, errorType:string, err:Error):void {
            console.log("net error");
            thatObjects.isReqs = false;
            thatObjects.checkData();
        }

        thatObjects.isReqs = true;

        var urls: string = Global.BASE_URL + url;
        var loader: egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,success,this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        var request: egret.URLRequest = new egret.URLRequest(urls);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables(GameUtils.objectToUrlParam(params));
        loader.load(request);
    }

    /**
     * 获得系统时间
     */
    get serverTime():number {
        return this.sTime + Math.floor(egret.getTimer() / 1000);
    }
}