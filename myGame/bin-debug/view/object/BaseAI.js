var BaseAI = (function () {
    /* obj 控制对象  level AI等级 */
    function BaseAI(mag, level) {
        this.objList = [];
        this.objList = mag.objList;
        this.mag = mag;
        this.initAI();
    }
    var d = __define,c=BaseAI,p=c.prototype;
    p.initAI = function () {
        TimerMag.instance.add(this.run, this, 2000);
    };
    p.stop = function () {
        TimerMag.instance.remove(this);
    };
    p.run = function () {
        var i = 0;
        var list = this.objList;
        var len = this.objList.length;
        for (i = 0; i < len; i++) {
            var obj = list[i];
            var vo = obj.vo;
            if (vo.team == 0 || vo.team == 1) {
                continue;
            }
            //计算评估值（距离，生产速度，当前值）
            vo.scoreArr = [];
            for (var j = 0; j < len; j++) {
                var defObj = this.objList[j];
                //todo 暂时只计算地方阵营的，类型，强度，支援等情况忽略
                if (vo.team != defObj.vo.team) {
                    var time = obj.getTime(defObj.x, defObj.y) / 1000;
                    //距离分数 距离*生产速度*6  x6是因为距离不优先考虑的延后系数
                    var timeScore = time * defObj.vo.makeSpeed * 6;
                    //当前值分数
                    var curScore = defObj.vo.curNum;
                    //中立的分数值减半，优先中立
                    if (vo.team == 0) {
                        curScore = 0;
                    }
                    //总分数
                    var totalScore = timeScore + curScore;
                    vo.scoreArr.push({ obj: defObj, score: totalScore });
                }
            }
            //按分值排序
            vo.scoreArr.sort(function (a, b) {
                if (a.score > b.score) {
                    return 1;
                }
            });
            console.log("+++");
            if (vo.startNum == -1) {
                vo.startNum = this.getStartNum();
                vo.outputP = Math.random() < 0.5 ? 0.4 : 0.8;
                console.log(vo.depth + " 评估完成 " + vo.startNum);
            }
            if (vo.scoreArr[0] && vo.curNum > vo.startNum && vo.team != 0 && vo.team != 1) {
                this.mag.startMove(obj, vo.scoreArr[0].obj);
                vo.startNum = -1;
            }
        }
    };
    /** 起始出兵（大于多少兵就派出）*/
    p.getStartNum = function () {
        var num = 0;
        var random = Math.random();
        if (random < 0.05) {
            //5%
            num = 2;
        }
        else if (random < 0.1) {
            //5%
            num = 40;
        }
        else if (random < 0.2) {
            //10%
            num = 10;
        }
        else if (random < 0.4) {
            //20%
            num = 15;
        }
        else if (random < 0.6) {
            //20%
            num = 30;
        }
        else {
            //40%
            num = 20;
        }
        return num;
    };
    return BaseAI;
})();
egret.registerClass(BaseAI,'BaseAI');
