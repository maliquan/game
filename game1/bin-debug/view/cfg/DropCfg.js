/**
 * Created by maliquan on 16/4/26.
 */
var DropCfg = (function () {
    function DropCfg() {
    }
    var d = __define,c=DropCfg,p=c.prototype;
    //p 掉落概率
    DropCfg.dropList = [
        [{ id: 10000, p: 0.9 }, { id: 20000, p: 0.5 }],
        [{}],
    ];
    return DropCfg;
}());
egret.registerClass(DropCfg,'DropCfg');
