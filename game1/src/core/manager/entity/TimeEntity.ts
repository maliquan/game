class TimeEntity {

    delay:number = 0;
    oldTime:number = 0;
    maxCount:number = 0;
    callBack:Function = null;
    thisObject:any = null;
    isRemove:boolean = false;

    constructor(delay:number, callBack:Function, thisObject:any, maxCount:number) {
        this.delay = delay;
        this.callBack = callBack;
        this.thisObject = thisObject;
        this.maxCount = maxCount;
        this.oldTime = egret.getTimer();
    }
}