/**
 * Created by maliquan on 16/4/22.
 */
var ObjectVo = (function () {
    function ObjectVo(name, data) {
        this.curHp = 0;
        this.maxHp = 0;
        this.minAtt = 0;
        this.maxAtt = 0;
        this.def = 0;
        this.speed = 0;
        this.nameStr = "";
        this.nameStr = name;
        this.maxHp = data[0];
        this.minAtt = data[1];
        this.maxAtt = data[2];
        this.def = data[3];
        this.speed = data[4];
    }
    var d = __define,c=ObjectVo,p=c.prototype;
    return ObjectVo;
}());
egret.registerClass(ObjectVo,'ObjectVo');
