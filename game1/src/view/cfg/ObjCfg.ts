/**
 * Created by maliquan on 16/4/22.
 */
class ObjCfg{

//    public static objCfg:number[][] = [
//        //[maxHp, minAtt, maxAtt, def, speed]
//        [100, 10, 20, 1, 1]
//    ];

    public static getObjCfg(name:string):ObjectVo{
        var level:number = (Math.random()*10 +1 +  10 * FightScene.curMapLevel)>>0;
        var vo:ObjectVo = new ObjectVo(name,[
            50 + level*50,//血
            10 + level*10,//最小攻击
            15 + level*15,//最大攻击
            5 + level*5,//防御
            1//速度
        ]);
        return vo;
    }

}
