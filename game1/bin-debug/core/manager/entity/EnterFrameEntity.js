var EnterFrameEntity = (function () {
    function EnterFrameEntity(callBack, thisObject) {
        this.callBack = null;
        this.thisObject = null;
        this.isRemove = false;
        this.callBack = callBack;
        this.thisObject = thisObject;
    }
    var d = __define,c=EnterFrameEntity,p=c.prototype;
    return EnterFrameEntity;
}());
egret.registerClass(EnterFrameEntity,'EnterFrameEntity');
