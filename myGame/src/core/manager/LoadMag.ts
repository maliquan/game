class LoadMag {
    private static _instance:LoadMag;

    //当前加载资源组
    private groupName:string;
    //加载完成回调
    private callBack:Function;
    //回调对象
    private thisObject:any;

    constructor() {
    }

    static get instance():LoadMag {
        if (!this._instance) {
            this._instance = new LoadMag();
        }
        return this._instance;
    }

    /**
     * 加载资源组
     * @param groupName
     * @param callBack
     * @param thisObject
     * @param isLoading
     */
    load(groupName:string, callBack:Function, thisObject:any, isLoading:boolean = true):void {
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
//                Message.instance.send(MsgCMD.MODULE_SHOW, WindowName.LOADING);
        }
        RES.loadGroup(this.groupName);
    }

    /**
     * 设置外部连接图片
     * @param display
     * @param url
     */
    imageByURL(display:eui.Image, url:string):void {RES.getResByUrl(url, function(texture:any):void {
        display.texture = texture;
    }, this, "image");
    }

    /**
     * 添加资源到该资源组
     * @param groupName
     * @param list
     */
    addToGroup(groupName:string, list:string[]):void {
        var config = RES["configInstance"];
        var groups = config.getRawGroupByName(groupName);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            groups.push(config.getRawResourceItem(list[i]));
        }
    }

    /**
     * 资源加载完成回调
     */
    private loadCallBack():void {
        if (this.thisObject && this.callBack) {
            this.callBack.call(this.thisObject);
        }

        this.groupName = "";
        this.thisObject = null;
        this.callBack = null;
    }

    /**
     * 资源组加载完成
     */
    private onGroupComplete(e:RES.ResourceEvent):void {
        if (e.groupName == this.groupName) {
//                Message.instance.send(MsgCMD.LOAD_RES, "complete");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            this.loadCallBack();
//                Message.instance.send(MsgCMD.MODULE_CLOSE, WindowName.LOADING);
        }
    }

    /**
     * 资源组加载进度
     */
    private onGroupProgress(e:RES.ResourceEvent):void {
        if (e.groupName == this.groupName) {
//                Message.instance.send(MsgCMD.LOAD_RES, e);
        }
    }

    /**
     * 资源组加载错误
     */
    private onGroupLoadError(e:RES.ResourceEvent):void {
//            Message.instance.send(MsgCMD.SHOW_TIP_TEXT, {tipText: LangManager.instance.getText("@LoadResError")});
//            Message.instance.send(MsgCMD.MODULE_CLOSE, WindowName.LOADING);
    }


}