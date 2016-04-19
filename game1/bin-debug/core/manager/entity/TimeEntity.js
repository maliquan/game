var TimeEntity = (function () {
    function TimeEntity(delay, callBack, thisObject, maxCount) {
        this.delay = 0;
        this.oldTime = 0;
        this.maxCount = 0;
        this.callBack = null;
        this.thisObject = null;
        this.isRemove = false;
        this.delay = delay;
        this.callBack = callBack;
        this.thisObject = thisObject;
        this.maxCount = maxCount;
        this.oldTime = egret.getTimer();
    }
    var d = __define,c=TimeEntity,p=c.prototype;
    return TimeEntity;
}());
egret.registerClass(TimeEntity,'TimeEntity');
