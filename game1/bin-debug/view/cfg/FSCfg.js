/**
 * Created by maliquan on 16/4/22.
 */
var FSCfg = (function () {
    function FSCfg() {
        //n=name l=level e=event d=掉落
        this.cfg0 = [
            { n: "H", x: 5, y: 5, l: 1, e: 0 },
            { n: "?", x: 5, y: 6, l: 2, e: 1, d: 0 },
        ];
    }
    var d = __define,c=FSCfg,p=c.prototype;
    FSCfg.E_GO_HOME = 0; //回家
    FSCfg.E_GO_FIGHT = 1; //战斗
    return FSCfg;
}());
egret.registerClass(FSCfg,'FSCfg');
