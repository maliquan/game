/**
 * Created by maliquan on 16/4/26.
 */
var DropCfg = (function () {
    function DropCfg() {
    }
    var d = __define,c=DropCfg,p=c.prototype;
    DropCfg.dropList = [
        [{ id: 10000, num: 1, level: 2 }, { id: 20000, num: 2, level: 2 }],
        [{}],
    ];
    return DropCfg;
}());
egret.registerClass(DropCfg,'DropCfg');
