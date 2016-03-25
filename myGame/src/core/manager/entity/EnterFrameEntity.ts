class EnterFrameEntity {
    callBack:Function = null;
    thisObject:any = null;
    isRemove:boolean = false;

    constructor(callBack:Function, thisObject:any) {
        this.callBack = callBack;
        this.thisObject = thisObject;
    }
}