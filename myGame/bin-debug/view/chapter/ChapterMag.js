var ChapterMag = (function () {
    function ChapterMag() {
        this.objList = [];
        this.teamList = [];
        this.teamNum = 1; //阵营数量
        this.soldierList = []; //所有士兵存储，用来删除
        this.drawSp = new egret.Sprite();
    }
    var d = __define,c=ChapterMag,p=c.prototype;
    p.show = function (chapterId, scene) {
        this.scene = scene;
        this.scene.addChild(this.drawSp);
        this.parseCfgById(chapterId);
        this.scene.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clkHandler, this);
    };
    p.clkHandler = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                //选中的是物体，并且是自己的,数量在2个以上
                if (e.target instanceof BaseObj && e.target.vo.team == 1 && e.target.vo.curNum > 1) {
                    this.curTouchObj = e.target;
                    this.scene.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clkHandler, this);
                    this.scene.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.clkHandler, this);
                    this.scene.addEventListener(egret.TouchEvent.TOUCH_END, this.clkHandler, this);
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.drawLine(e);
                break;
            case egret.TouchEvent.TOUCH_END:
                if (e.target instanceof BaseObj && e.target != this.curTouchObj) {
                    this.startMove(this.curTouchObj, e.target);
                }
                this.drawSp.graphics.clear();
                this.scene.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clkHandler, this);
                this.scene.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.clkHandler, this);
                this.scene.removeEventListener(egret.TouchEvent.TOUCH_END, this.clkHandler, this);
                break;
        }
    };
    p.startMove = function (obj1, obj2) {
        var soldier = new BaseSoldier();
        this.scene.addChild(soldier);
        soldier.x = obj1.x;
        soldier.y = obj1.y;
        this.soldierList.push(soldier);
        var that = this;
        var outputNum = obj1.vo.curNum * obj1.vo.outputP;
        if (outputNum < 1) {
            return;
        }
        outputNum = outputNum >> 0;
        obj1.vo.curNum -= outputNum; //输出方先扣除
        obj1.updataNum();
        var moveTime = obj1.getTime(obj2.x, obj2.y);
        egret.Tween.get(soldier)
            .to({ x: obj2.x, y: obj2.y }, moveTime)
            .call(this.stopMove, this, [obj1.vo.team, obj1.vo.outputP, obj2, outputNum, soldier]); //开始移动
    };
    /* 第一个参数不用进攻方整体数据是因为，在这之前可能被占领了，阵营变更，所以用个变量 */
    p.stopMove = function (attackTeam, outputP, obj2, outputNum, moveObj) {
        if (attackTeam == obj2.vo.team) {
            //己方支援
            obj2.vo.curNum += outputNum;
        }
        else {
            //敌方战斗
            var lastNum = obj2.vo.curNum - outputNum;
            if (lastNum >= 0) {
                //攻打失败
                obj2.vo.curNum = lastNum;
            }
            else {
                //成功占领
                obj2.vo.curNum = -1 * lastNum;
                obj2.setTeam(attackTeam, outputP);
            }
        }
        obj2.updataNum();
        moveObj.parent.removeChild(moveObj);
        this.checkTeam();
    };
    /* 检查分组 */
    p.checkTeam = function () {
        this.teamList = [];
        var i = 0;
        var list = this.objList;
        var len = this.objList.length;
        for (i = 0; i < len; i++) {
            var obj = list[i];
            var vo = obj.vo;
            //存放所有的阵营，中立不算
            if (this.teamList.indexOf(vo.team) == -1 && vo.team != 0) {
                this.teamList.push(vo.team);
            }
        }
        this.teamNum = this.teamList.length; //不直接用.length是因为，数组是按阵营当的索引，前边的为空，但是长度是阵营
        //如果只剩下一个阵营了，判断胜利失败
        if (this.teamNum <= 1) {
            var result = {};
            if (this.teamList[0] == 1) {
                result = { isWin: true };
            }
            else {
                result = { isWin: false };
            }
            this.ai.stop();
            this.clean();
            Message.instance.send(MsgId.CHAPTER_OVER, result);
            return;
        }
    };
    p.setAllObj = function (isPlay) {
        var list = this.objList;
        var len = this.objList.length;
        for (var i = 0; i < len; i++) {
            var obj = list[i];
            if (isPlay) {
                obj.startMake();
            }
            else {
                obj.stopMake();
            }
        }
    };
    p.clean = function () {
        //清除所有士兵
        var len = this.soldierList.length;
        for (var i = 0; i < len; i++) {
            var solider = this.soldierList[i];
            egret.Tween.removeTweens(solider);
            if (solider.parent) {
                solider.parent.removeChild(solider);
            }
        }
        //清除画板
        this.drawSp.graphics.clear();
        //清除事件
        if (this.scene.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            this.scene.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clkHandler, this);
        }
        if (this.scene.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            this.scene.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.clkHandler, this);
        }
        if (this.scene.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            this.scene.removeEventListener(egret.TouchEvent.TOUCH_END, this.clkHandler, this);
        }
        //清除所有细胞
        var list = this.objList;
        var len = this.objList.length;
        for (var i = 0; i < len; i++) {
            var obj = list[i];
            this.scene.removeChild(obj);
            obj.clean();
        }
    };
    p.drawLine = function (e) {
        this.drawSp.graphics.clear();
        this.drawSp.graphics.lineStyle(10, 0xffffff, 0.6);
        this.drawSp.graphics.moveTo(this.curTouchObj.x, this.curTouchObj.y);
        var endP = this.scene.globalToLocal(e.stageX, e.stageY);
        this.drawSp.graphics.lineTo(endP.x, endP.y);
    };
    /* 解析配置 */
    p.parseCfgById = function (chapterId) {
        var mapCfg = RES.getRes("map" + chapterId).list;
        var len = mapCfg.length;
        for (var i = 0; i < len; i++) {
            var vo = new ObjVo();
            vo.src = mapCfg[i].src;
            vo.depth = parseFloat(mapCfg[i].depth);
            vo.curNum = parseFloat(mapCfg[i].curNum);
            vo.makeSpeed = parseFloat(mapCfg[i].makeSpeed);
            vo.moveSpeed = parseFloat(mapCfg[i].moveSpeed);
            vo.strength = parseFloat(mapCfg[i].strength);
            vo.team = parseFloat(mapCfg[i].team);
            vo.maxNum = parseFloat(mapCfg[i].maxNum);
            vo.x = parseFloat(mapCfg[i].x);
            vo.y = parseFloat(mapCfg[i].y);
            vo.w = parseFloat(mapCfg[i].w);
            vo.h = parseFloat(mapCfg[i].h);
            //类首字母要大写
            var clsName = vo.src.replace(/(\w)/, function (v) { return v.toUpperCase(); });
            var cls = egret.getDefinitionByName(clsName);
            this.objList[i] = new cls(vo);
            this.scene.addChild(this.objList[i]);
        }
        this.parseComplete();
    };
    p.parseComplete = function () {
        this.ai = new BaseAI(this, 1);
    };
    /* 单位移动距离 */
    ChapterMag.MOVE_NUM = 200;
    return ChapterMag;
})();
egret.registerClass(ChapterMag,'ChapterMag');
