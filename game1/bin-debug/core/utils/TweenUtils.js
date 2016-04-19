var TweenUtils = (function () {
    function TweenUtils() {
    }
    var d = __define,c=TweenUtils,p=c.prototype;
    /*界面出现效果，移动到目标位置反弹一下*/
    TweenUtils.moveTweenShow = function (type, endX, endY, obj, callFun, ower) {
        var startX = endX;
        var startY = endY;
        switch (type) {
            case TweenUtils.LEFT_TO_RIGHT:
                startX = -obj.width;
                break;
            case TweenUtils.RIGHT_TO_LEFT:
                startX = Global.STAGE_W;
                break;
            case TweenUtils.BOTTOM_TO_TOP:
                startY = Global.STAGE_H;
                break;
            case TweenUtils.TOP_TO_BOTTOM:
                startY = -obj.height;
                break;
            default:
                break;
        }
        if (startX == endX && startY == endY) {
            if (callFun) {
                callFun.call(ower);
            }
        }
        obj.x = startX;
        obj.y = startY;
        var moveX = startX == endX ? 0 : 60;
        var moveY = startY == endY ? 0 : 60;
        egret.Tween.get(obj)
            .to({ x: endX + moveX, y: endY + moveY }, 200)
            .to({ x: endX - moveX / 2, y: endY - moveY / 2 }, 100)
            .to({ x: endX, y: endY }, 100)
            .call(function () {
            if (callFun) {
                callFun.call(ower);
            }
        }, this);
    };
    /*界面出现效果，移动到目标位置反弹一下*/
    TweenUtils.moveTweenHide = function (type, windowName, obj, callFun, ower) {
        if (callFun === void 0) { callFun = null; }
        if (ower === void 0) { ower = null; }
        var endX = obj.x;
        var endY = obj.y;
        switch (type) {
            case TweenUtils.LEFT_TO_RIGHT:
                endX = Global.STAGE_W;
                break;
            case TweenUtils.RIGHT_TO_LEFT:
                endX = -obj.width;
                break;
            case TweenUtils.BOTTOM_TO_TOP:
                endY = -obj.height;
                break;
            case TweenUtils.TOP_TO_BOTTOM:
                endY = Global.STAGE_H;
                break;
            default:
                break;
        }
        egret.Tween.get(obj)
            .to({ x: endX, y: endY }, 200, egret.Ease.backIn)
            .call(function () {
            if (callFun) {
                callFun.call(ower);
            }
            else {
                PopUpMag.ins().remove(windowName);
            }
        }, this);
    };
    TweenUtils.NONE = 0;
    TweenUtils.LEFT_TO_RIGHT = 1;
    TweenUtils.RIGHT_TO_LEFT = 2;
    TweenUtils.TOP_TO_BOTTOM = 3;
    TweenUtils.BOTTOM_TO_TOP = 4;
    return TweenUtils;
}());
egret.registerClass(TweenUtils,'TweenUtils');
