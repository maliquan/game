var ParserMap = (function () {
    function ParserMap() {
        /* 所有数据缓存 */
        this._allData = [];
        this.lieH = 100; //列间距
    }
    var d = __define,c=ParserMap,p=c.prototype;
    d(ParserMap, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new ParserMap();
            }
            return this._instance;
        }
    );
    /** 加载数据 */
    p.loadConfig = function () {
        this.conver();
    };
    /* 根据id获取位置 */
    p.getYById = function (id) {
        var maxChaperNum = UserInfo.ins.maxChapterId;
        var maxMapH = maxChaperNum * this.lieH;
        MapMag.instance.totalMapH = maxMapH + 400;
        var startHangX = 50; //每行起始位置
        var hangNum = 6; //每行数量
        var objW = 160; //行间距
        var idx = id % hangNum;
        if (idx == 4) {
            idx = 2;
        }
        else if (idx == 5) {
            idx = 1;
        }
        var x = idx * objW + startHangX;
        var y = maxMapH - id * this.lieH + 200;
        return [x, y];
    };
    p.conver = function () {
        var len = UserInfo.ins.maxChapterId;
        for (var i = 1; i < len + 1; i++) {
            var vo = new ParserMapVo();
            vo.depth = 10000 + i;
            vo.dataId = i;
            vo.nextId = i + 1 > len ? len : i + 1;
            var posArr = this.getYById(vo.dataId);
            vo.x = posArr[0];
            vo.y = posArr[1];
            vo.w = 110;
            vo.h = 120;
            vo.bottom = vo.y + vo.h;
            this._allData.push(vo);
            //增加一个线
            var newVo = new ParserMapVo();
            var nextPosArr = this.getYById(vo.nextId);
            newVo.dataId = MapMag.TYPE_LINE;
            newVo.depth = i;
            newVo.h = 100;
            newVo.x = this.getPos(vo.x + vo.w / 2, nextPosArr[0] + vo.w / 2);
            newVo.y = this.getPos(vo.y + vo.h / 2, nextPosArr[1] + vo.h / 2);
            newVo.bottom = newVo.y + newVo.h;
            newVo.lineR = GameUtils.getAngle(vo.x, vo.y, nextPosArr[0], nextPosArr[1]);
            newVo.w = 80;
            newVo.h = 50;
            this._allData.push(newVo);
        }
        MapMag.instance.mapDataList = this._allData;
    };
    /*返回两个点的中点*/
    p.getPos = function (pos1, pos2) {
        var startPos = Math.min(pos1, pos2); //拿到最左边的点作为起始点
        return startPos + Math.abs(pos1 - pos2) / 2;
    };
    return ParserMap;
})();
egret.registerClass(ParserMap,'ParserMap');
