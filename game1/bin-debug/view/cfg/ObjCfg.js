/**
 * Created by maliquan on 16/4/22.
 */
var ObjCfg = (function () {
    function ObjCfg() {
    }
    var d = __define,c=ObjCfg,p=c.prototype;
    //    public static objCfg:number[][] = [
    //        //[maxHp, minAtt, maxAtt, def, speed]
    //        [100, 10, 20, 1, 1]
    //    ];
    ObjCfg.getObjCfg = function (name) {
        var level = (Math.random() * 10 + 1 + 10 * FightScene.curMapLevel) >> 0;
        var vo = new ObjectVo(name, [
            50 + level * 50,
            10 + level * 10,
            15 + level * 15,
            5 + level * 5,
            1 //速度
        ]);
        return vo;
    };
    return ObjCfg;
}());
egret.registerClass(ObjCfg,'ObjCfg');
