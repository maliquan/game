class TimerMag {
    private static _instance:TimerMag;

    private timeList:TimeEntity[] = [];
    private timer: egret.Timer;
    private minDelay:number = 10;

    constructor() {
        this.timer = new egret.Timer(this.minDelay);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.tickHandler, this);
        this.timer.start();
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
     * @param delay 10的整数倍
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
    private tickHandler(e:egret.TimerEvent):boolean {
        var len:number = this.timeList.length;
        if (len > 0) {
            var timeEntity:TimeEntity;
            var timeList = this.timeList;
            for (var i = 0; i < len; i++) {
                timeEntity = timeList[i];
                if (timeEntity.isRemove) {
                    this.removeTime(timeEntity, i);
                    i--;
                    len--;
                    continue;
                }
                timeEntity.oldTime += this.minDelay;
                if (timeEntity.oldTime == timeEntity.delay) {
                    timeEntity.oldTime = 0;
                    timeEntity.maxCount -= 1;
                    timeEntity.callBack.call(timeEntity.thisObject);
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