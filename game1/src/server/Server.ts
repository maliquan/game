class Server{

    private static localData:any = {}

    public static request(url:string, param:any):any{
        var data:any;
        var cfg:string = egret.localStorage.getItem(url);
        if(cfg){
            data = JSON.parse(cfg);
        }

        switch (url){
            case HttpMsgCMD.LOGIN:
                data = data || {
                    "ret":0,
                    "user_bag_level":0,
                    "nameStr":"@",
                    "maxHp":500,
                    "minAtt":1000,
                    "maxAtt":1500,
                    "def":5,
                    "speed":1,
                    "storageList":[],
                    "bagList":[]
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
    }

    public static clean():void{
        egret.localStorage.clear();
    }

    /* 保存数据到本地 */
    public static saveData(url:string, data:any):void{
        this.localData = data;
        egret.localStorage.clear();
        egret.localStorage.setItem(url, JSON.stringify(data));
        console.log(JSON.stringify(url+" --- " + JSON.stringify(data)));
    }
}