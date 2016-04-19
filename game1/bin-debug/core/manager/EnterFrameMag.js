var EnterFrameMag = (function () {
    function EnterFrameMag() {
        this.enterList = [];
        Global.STAGE.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }
    var d = __define,c=EnterFrameMag,p=c.prototype;
    d(EnterFrameMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new EnterFrameMag();
            }
            return this._instance;
        }
    );
    /**
     * 添加一个时钟
     * @param callBack
     * @param thisObject
     * @param delay
     * @param maxCount
     * @param immediate
     */
    p.add = function (callBack, thisObject) {
        this.enterList.push(new EnterFrameEntity(callBack, thisObject));
    };
    /**
     * 移除该时钟
     * @param code
     */
    p.remove = function (obj) {
        var timeList = this.enterList;
        var len = timeList.length;
        for (var i = 0; i < len; i++) {
            if (timeList[i].thisObject == obj) {
                timeList[i].isRemove = true;
            }
        }
    };
    /* 是否已经存在 */
    p.has = function (obj) {
        var timeList = this.enterList;
        var len = timeList.length;
        for (var i = 0; i < len; i++) {
            if (timeList[i].thisObject == obj) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检测时钟
     */
    p.enterFrameHandler = function (e) {
        var timeList = this.enterList;
        var len = timeList.length;
        for (var i = 0; i < len; i++) {
            var entity = timeList[i];
            if (entity.isRemove) {
                this.removeTime(entity, i);
                i--;
                len--;
                continue;
            }
            entity.callBack.call(entity.thisObject);
        }
    };
    /**
     * 移出时钟对象
     * @param timeEntity
     * @param index
     */
    p.removeTime = function (timeEntity, index) {
        timeEntity.callBack = null;
        timeEntity.thisObject = null;
        this.enterList.splice(index, 1);
    };
    return EnterFrameMag;
}());
egret.registerClass(EnterFrameMag,'EnterFrameMag');
