var HttpMag = (function () {
    function HttpMag() {
        //md5加密
        this.encrypt = null;
        this.encrypt = new md5();
    }
    var d = __define,c=HttpMag,p=c.prototype;
    d(HttpMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new HttpMag();
            }
            return this._instance;
        }
    );
    /**
     * 发送请求
     * @param url
     * @param data
     * @param success
     * @param error
     * @param thisObject
     * @param method
     */
    p.send = function (url, data, success, error, thisObject, method) {
        if (method === void 0) { method = "post"; }
        var xhr = null;
        if (window["XMLHttpRequest"]) {
            xhr = new window["XMLHttpRequest"]();
        }
        else {
            xhr = new ActiveXObject("MSXML2.XMLHTTP");
        }
        xhr.onreadystatechange = onReadyStateChange;
        var param = GameUtils.objectToUrlParam(data);
        param += "&encrypt=" + this.encryptData(param, data);
        xhr.open(method, method == "get" ? url + "?" + param : url, true);
        xhr.responseType = "text";
        if (method == "post") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(param);
        }
        else {
            xhr.send();
        }
        var time = setTimeout(function () {
            if (error) {
                error.call(thisObject, null, "timeout");
            }
            removeXHR();
        }, 10000);
        function onReadyStateChange() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 400 || xhr.status == 0) {
                    if (error) {
                        error.call(thisObject, null, "error");
                        removeXHR();
                    }
                }
                else {
                    if (success) {
                        success.call(thisObject, JSON.parse(xhr.responseText));
                        removeXHR();
                    }
                }
            }
        }
        function removeXHR() {
            success = null;
            error = null;
            thisObject = null;
            clearTimeout(time);
            if (xhr) {
                xhr.abort();
                xhr = null;
            }
        }
    };
    /**
     * 加密数据
     * @param param
     * @param data
     */
    p.encryptData = function (param, data) {
        var keys = [];
        var params = param.split("&");
        var len = params.length;
        var temp;
        for (var i = 0; i < len; i++) {
            temp = params[i];
            keys[i] = temp.substring(0, temp.indexOf("="));
        }
        keys = keys.sort();
        var retStr = ""; //HttpMessage.instance.key;
        var value;
        for (var j = 0; j < len; j++) {
            value = data[keys[j]];
            if (value != null && (value.constructor == Array || value.constructor == Object)) {
                retStr += JSON.stringify(value);
                continue;
            }
            retStr += value;
        }
        return this.encrypt.hex_md5(retStr);
    };
    return HttpMag;
})();
egret.registerClass(HttpMag,'HttpMag');
