var ParserMapVo = (function () {
    function ParserMapVo() {
        this.depth = 0;
        this.dataId = 0;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.lineX = 0;
        this.lineY = 0;
        this.lineR = 0;
        this.bottom = 0;
        this.nextId = 0; //下一关的id，用来给锁记录关联关卡的id
    }
    var d = __define,c=ParserMapVo,p=c.prototype;
    return ParserMapVo;
}());
egret.registerClass(ParserMapVo,'ParserMapVo');
