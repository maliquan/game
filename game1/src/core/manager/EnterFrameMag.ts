class EnterFrameMag {
    private static _instance:EnterFrameMag;

    private enterList:EnterFrameEntity[] = [];

    constructor() {
        Global.STAGE.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    static get instance():EnterFrameMag {
        if (!this._instance) {
            this._instance = new EnterFrameMag();
        }
        return this._instance;
    }

    /**
     * 添加一个时钟
     * @param callBack
     * @param thisObject
     * @param delay
     * @param maxCount
     * @param immediate
     */
    public add(callBack:Function, thisObject:any):void {
        this.enterList.push(new EnterFrameEntity(callBack, thisObject));
    }

    /**
     * 移除该时钟
     * @param code
     */
    public remove(obj:any):void {
        var timeList = this.enterList;
        var len:number = timeList.length;
        for (var i = 0; i < len; i++) {
            if (timeList[i].thisObject == obj) {
                timeList[i].isRemove = true;
            }
        }
    }

    /* 是否已经存在 */
    public has(obj:any):boolean{
        var timeList = this.enterList;
        var len:number = timeList.length;
        for (var i = 0; i < len; i++) {
            if (timeList[i].thisObject == obj) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检测时钟
     */
    private enterFrameHandler(e:egret.Event):void {
        var timeList = this.enterList;
        var len:number = timeList.length;
        for (var i = 0; i < len; i++) {
            var entity:EnterFrameEntity = timeList[i];
            if (entity.isRemove) {
                this.removeTime(entity, i);
                i--;
                len--;
                continue;
            }
            entity.callBack.call(entity.thisObject);
        }
    }

    /**
     * 移出时钟对象
     * @param timeEntity
     * @param index
     */
    private removeTime(timeEntity:EnterFrameEntity,index:number):void {
        timeEntity.callBack = null;
        timeEntity.thisObject = null;
        this.enterList.splice(index, 1);
    }
}