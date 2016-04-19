var BaseObj = (function (_super) {
    __extends(BaseObj, _super);
    function BaseObj(vo) {
        _super.call(this);
        this.vo = vo;
        this.init();
    }
    var d = __define,c=BaseObj,p=c.prototype;
    p.init = function () {
        this.anchorOffsetX = this.vo.w * 0.5;
        this.anchorOffsetY = this.vo.h * 0.5;
        this.x = this.vo.x;
        this.y = this.vo.y;
        this.touchChildren = false;
        this.touchEnabled = true;
        this.bkgImg = new eui.Image();
        this.bkgImg.texture = RES.getRes(this.vo.src);
        this.addChild(this.bkgImg);
        this.bkgImg.width = this.vo.w;
        this.bkgImg.height = this.vo.h;
        this.numLab = new eui.Label();
        this.numLab.textColor = this.getColorByTeam(this.vo.team);
        this.numLab.size = 18;
        this.addChild(this.numLab);
        this.updata();
        this.startMake();
    };
    /* 根据距离计算移动时间 单位：毫秒*/
    p.getTime = function (x2, y2) {
        var xDif = x2 - this.x;
        var yDif = y2 - this.y;
        var dis = Math.sqrt(xDif * xDif + yDif * yDif);
        var time = dis / this.vo.moveSpeed / 200 * 1000; // 200是单位移动距离 1000是单位时间毫秒变成秒
        return time >> 0;
    };
    p.updata = function () {
        this.updataNum();
    };
    p.startMake = function () {
        var timerMag = TimerMag.instance;
        if (!timerMag.has(this) && this.vo.team != 0) {
            timerMag.add(this.addNum, this, 1000);
        }
    };
    p.setTeam = function (team, outputP) {
        this.vo.outputP = outputP;
        this.vo.team = team;
        this.updata();
        this.numLab.textColor = this.getColorByTeam(this.vo.team);
        this.startMake();
    };
    p.stopMake = function () {
        TimerMag.instance.remove(this);
    };
    p.addNum = function () {
        this.updataNum();
        this.vo.curNum += this.vo.makeSpeed;
    };
    p.updataNum = function () {
        if (this.vo.curNum >= this.vo.maxNum) {
            this.vo.curNum = this.vo.maxNum;
        }
        this.numLab.text = this.vo.curNum + "";
        this.numLab.x = this.bkgImg.width * 0.5 - this.numLab.width * 0.5;
        this.numLab.y = this.bkgImg.height * 0.5 - this.numLab.height * 0.5;
    };
    p.clean = function () {
        this.stopMake();
        this.bkgImg = null;
        this.vo = null;
    };
    p.getColorByTeam = function (type) {
        var color = 0xcccccc;
        switch (type) {
            case 0:
                color = 0xcccccc;
                break;
            case 1:
                color = 0x0000ff;
                break;
            case 2:
                color = 0xff0000;
                break;
            case 3:
                color = 0x00ff00;
                break;
            case 4:
                color = 0xffff55;
                break;
            case 5:
                color = 0x00ffff;
                break;
            case 6:
                color = 0xff00ff;
                break;
        }
        return color;
    };
    return BaseObj;
}(egret.Sprite));
egret.registerClass(BaseObj,'BaseObj');
