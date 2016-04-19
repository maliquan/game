var ObjVo = (function () {
    function ObjVo() {
        /* image */
        this.src = "";
        /* depth */
        this.depth = 0;
        /* 当前数量 */
        this.curNum = 5;
        /* 生产速度 单位：个／秒*/
        this.makeSpeed = 1;
        /* 移动速度 */
        this.moveSpeed = 1;
        /* 战斗力 */
        this.strength = 1;
        /* 阵营 0是中立 1是自己*/
        this.team = 0;
        /* 生产上限 */
        this.maxNum = 100;
        /* x */
        this.x = 0;
        /* y */
        this.y = 0;
        /* w */
        this.w = 0;
        /* h */
        this.h = 0;
        /* 输出比例 0-1 */
        this.outputP = 0.5;
        /* AI评估值 */
        this.scoreArr = [];
        /* 多于这个值就派出 */
        this.startNum = -1;
    }
    var d = __define,c=ObjVo,p=c.prototype;
    return ObjVo;
}());
egret.registerClass(ObjVo,'ObjVo');
