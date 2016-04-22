/**
 * Created by maliquan on 16/4/22.
 */
var FSCfg = (function () {
    function FSCfg() {
        //n=name l=level e=event
        this.cfg1 = [
            { n: "H", x: 5, y: 5, l: 1, e: 0 },
            { n: "?", x: 10, y: 10, l: 1, e: 1 },
            { n: "!", x: 11, y: 10, l: 2, e: 1 },
            { n: "?", x: 12, y: 10, l: 3, e: 1 },
            { n: "!", x: 10, y: 11, l: 4, e: 1 },
            { n: "?", x: 11, y: 11, l: 5, e: 1 },
            { n: "?", x: 12, y: 11, l: 6, e: 1 },
            { n: "!", x: 10, y: 12, l: 4, e: 1 },
            { n: "?", x: 11, y: 12, l: 5, e: 1 },
            { n: "?", x: 12, y: 12, l: 6, e: 1 },
        ];
    }
    var d = __define,c=FSCfg,p=c.prototype;
    FSCfg.E_GO_HOME = 0; //回家
    FSCfg.E_GO_FIGHT = 1; //战斗
    return FSCfg;
}());
egret.registerClass(FSCfg,'FSCfg');
