var LoadMag = (function () {
    function LoadMag() {
    }
    var d = __define,c=LoadMag,p=c.prototype;
    d(LoadMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new LoadMag();
            }
            return this._instance;
        }
    );
    /**
     * 加载资源组
     * @param groupName
     * @param callBack
     * @param thisObject
     * @param isLoading
     */
    p.load = function (groupName, callBack, thisObject, isLoading) {
        if (isLoading === void 0) { isLoading = true; }
        this.groupName = groupName;
        this.callBack = callBack;
        this.thisObject = thisObject;
        if (RES.isGroupLoaded(this.groupName)) {
            this.loadCallBack();
            return;
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupLoadError, this);
        if (isLoading) {
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
        }
        RES.loadGroup(this.groupName);
    };
    /**
     * 设置外部连接图片
     * @param display
     * @param url
     */
    p.imageByURL = function (display, url) {
        RES.getResByUrl(url, function (texture) {
            display.texture = texture;
        }, this, "image");
    };
    /**
     * 添加资源到该资源组
     * @param groupName
     * @param list
     */
    p.addToGroup = function (groupName, list) {
        var config = RES["configInstance"];
        var groups = config.getRawGroupByName(groupName);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            groups.push(config.getRawResourceItem(list[i]));
        }
    };
    /**
     * 资源加载完成回调
     */
    p.loadCallBack = function () {
        if (this.thisObject && this.callBack) {
            this.callBack.call(this.thisObject);
        }
        this.groupName = "";
        this.thisObject = null;
        this.callBack = null;
    };
    /**
     * 资源组加载完成
     */
    p.onGroupComplete = function (e) {
        if (e.groupName == this.groupName) {
            //                Message.instance.send(MsgCMD.LOAD_RES, "complete");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            this.loadCallBack();
        }
    };
    /**
     * 资源组加载进度
     */
    p.onGroupProgress = function (e) {
        if (e.groupName == this.groupName) {
        }
    };
    /**
     * 资源组加载错误
     */
    p.onGroupLoadError = function (e) {
        //            Message.instance.send(MsgCMD.SHOW_TIP_TEXT, {tipText: LangManager.instance.getText("@LoadResError")});
        //            Message.instance.send(MsgCMD.MODULE_CLOSE, WindowName.LOADING);
    };
    return LoadMag;
})();
egret.registerClass(LoadMag,'LoadMag');
