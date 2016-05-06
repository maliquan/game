/**
 * Created by maliquan on 16/4/22.
 */
class FSCfg{
    public static E_GO_HOME:number = 0;//回家
    public static E_GO_FIGHT:number = 1;//战斗

    //n=name l=level e=event d=掉落
    public cfg0:any[] = [
        {n:"H", x:5, y:5, l:1, e:0},
        {n:"?", x:5, y:6, l:2, e:1, d:0},
    ];
}