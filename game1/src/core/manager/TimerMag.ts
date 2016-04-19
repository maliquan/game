class TimerMag {
    private static _instance:TimerMag;

    private timeList:TimeEntity[] = [];
    private loopNum:number = 0;

    constructor() {
        egret.startTick(this.tickHandler, this);
    }

    static get instance():TimerMag {
        if (!this._instance) {
            this._instance = new TimerMag();
        }
        return this._instance;
    }

    /**
     * 添加一个时钟
     * @param callBack
     * @param thisObject
     * @param delay 最小值20
     * @param maxCount
     * @param immediate
     */
    public add(callBack:Function, thisObject:any, delay:number = 1000, maxCount:number = Number.MAX_VALUE):void {
        var timeEntity = new TimeEntity(delay, callBack, thisObject, maxCount);
        this.timeList.push(timeEntity);
    }

    /**
     * 移除该时钟
     * @param code
     */
    public remove(obj:any):void {
        var timeList = this.timeList;
        var len:number = timeList.length;
        for (var i = 0; i < len; i++) {
            if (timeList[i].thisObject == obj) {
                timeList[i].isRemove = true;
            }
        }
    }

    /* 是否已经存在 */
    public has(obj:any):boolean{
        var timeList = this.timeList;
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
     * return 当其返回值为true时会忽略帧频强制刷新屏幕，false时不会
     */
    private tickHandler(time:number):boolean {
        this.loopNum++;
        if(this.loopNum < 20){
            return false;
        }else{
            this.loopNum = 0;
        }
        var len:number = this.timeList.length;
        if (len > 0) {
            var timeEntity:TimeEntity;
            var num:number = 0;
            var timeList = this.timeList;
            for (var i = 0; i < len; i++) {
                timeEntity = timeList[i];
                if (timeEntity.isRemove) {
                    this.removeTime(timeEntity, i);
                    i--;
                    len--;
                    continue;
                }
                num = ((time - timeEntity.oldTime) / timeEntity.delay)>>0;
                if (num > 0) {
                    timeEntity.maxCount -= num;
                    timeEntity.oldTime += num * timeEntity.delay;
                    timeEntity.callBack.call(timeEntity.thisObject, num);
                    if (timeEntity.maxCount <= 0) {
                        this.removeTime(timeEntity, i);
                        i--;
                        len--;
                        continue;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 移出时钟对象
     * @param timeEntity
     * @param index
     */
    private removeTime(timeEntity:TimeEntity,index:number):void {
        timeEntity.callBack = null;
        timeEntity.thisObject = null;
        this.timeList.splice(index, 1);
    }
}