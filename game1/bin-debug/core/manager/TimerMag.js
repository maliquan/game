var TimerMag = (function () {
    function TimerMag() {
        this.timeList = [];
        this.minDelay = 10;
        this.timer = new egret.Timer(this.minDelay);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.tickHandler, this);
        this.timer.start();
    }
    var d = __define,c=TimerMag,p=c.prototype;
    d(TimerMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new TimerMag();
            }
            return this._instance;
        }
    );
    /**
     * 添加一个时钟
     * @param callBack
     * @param thisObject
     * @param delay 10的整数倍
     * @param maxCount
     * @param immediate
     */
    p.add = function (callBack, thisObject, delay, maxCount) {
        if (delay === void 0) { delay = 1000; }
        if (maxCount === void 0) { maxCount = Number.MAX_VALUE; }
        var timeEntity = new TimeEntity(delay, callBack, thisObject, maxCount);
        this.timeList.push(timeEntity);
    };
    /**
     * 移除该时钟
     * @param code
     */
    p.remove = function (obj) {
        var timeList = this.timeList;
        var len = timeList.length;
        for (var i = 0; i < len; i++) {
            if (timeList[i].thisObject == obj) {
                timeList[i].isRemove = true;
            }
        }
    };
    /* 是否已经存在 */
    p.has = function (obj) {
        var timeList = this.timeList;
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
     * return 当其返回值为true时会忽略帧频强制刷新屏幕，false时不会
     */
    p.tickHandler = function (e) {
        var len = this.timeList.length;
        if (len > 0) {
            var timeEntity;
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
    };
    /**
     * 移出时钟对象
     * @param timeEntity
     * @param index
     */
    p.removeTime = function (timeEntity, index) {
        timeEntity.callBack = null;
        timeEntity.thisObject = null;
        this.timeList.splice(index, 1);
    };
    return TimerMag;
}());
egret.registerClass(TimerMag,'TimerMag');
