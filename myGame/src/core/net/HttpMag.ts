class HttpMag {
    private static _instance:HttpMag;

    //md5加密
    private encrypt:md5 = null;

    constructor() {
        this.encrypt = new md5();
    }

    static get instance():HttpMag {
        if (!this._instance) {
            this._instance = new HttpMag();
        }
        return this._instance;
    }

    /**
     * 发送请求
     * @param url
     * @param data
     * @param success
     * @param error
     * @param thisObject
     * @param method
     */
    send(url:string, data:any, success:Function, error:Function, thisObject:any, method:string = "post"):void {
        var xhr:any = null;
        if (window["XMLHttpRequest"]) {
            xhr = new window["XMLHttpRequest"]();
        } else {
            xhr = new ActiveXObject("MSXML2.XMLHTTP");
        }
        xhr.onreadystatechange = onReadyStateChange;

        var param:string = GameUtils.objectToUrlParam(data);
        param += "&encrypt=" + this.encryptData(param, data);

        xhr.open(method, method == "get" ? url + "?" + param : url, true);
        xhr.responseType = "text";
        if (method == "post") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(param);
        } else {
            xhr.send();
        }

        var time = setTimeout(function ():void {
            if (error) {
                error.call(thisObject, null, "timeout");
            }
            removeXHR();
        }, 10000);

        function onReadyStateChange():void {
            if (xhr.readyState == 4) {
                if (xhr.status >= 400 || xhr.status == 0) {
                    if (error) {
                        error.call(thisObject, null, "error");
                        removeXHR();
                    }
                } else {
                    if (success) {
                        success.call(thisObject, JSON.parse(xhr.responseText));
                        removeXHR();
                    }
                }
            }
        }

        function removeXHR():void {
            success = null;
            error = null;
            thisObject = null;
            clearTimeout(time);
            if (xhr) {
                xhr.abort();
                xhr = null;
            }
        }
    }

    /**
     * 加密数据
     * @param param
     * @param data
     */
    private encryptData(param:string, data:any):string {
        var keys:string[] = [];
        var params:string[] = param.split("&");
        var len:number = params.length;
        var temp:string;
        for (var i = 0; i < len; i++) {
            temp = params[i];
            keys[i] = temp.substring(0, temp.indexOf("="));
        }
        keys = keys.sort();
        var retStr:string = "";//HttpMessage.instance.key;
        var value:any;
        for (var j = 0; j < len; j++) {
            value = data[keys[j]];
            if (value != null && (value.constructor == Array || value.constructor == Object)) {
                retStr += JSON.stringify(value);
                continue;
            }
            retStr += value;
        }
        return this.encrypt.hex_md5(retStr);
    }
}