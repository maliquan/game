/**
 * Created by maliquan on 16/4/22.
 */
class FSCfg{
    public static E_GO_HOME:number = 0;//回家
    public static E_GO_FIGHT:number = 1;//战斗

    //n=name l=level e=event
    public cfg1:any[] = [
        {n:"H", x:5, y:5, l:1, e:0},
        {n:"?", x:10, y:10, l:1, e:1},
        {n:"!", x:11, y:10, l:2, e:1},
        {n:"?", x:12, y:10, l:3, e:1},
        {n:"!", x:10, y:11, l:4, e:1},
        {n:"?", x:11, y:11, l:5, e:1},
        {n:"?", x:12, y:11, l:6, e:1},
        {n:"!", x:10, y:12, l:4, e:1},
        {n:"?", x:11, y:12, l:5, e:1},
        {n:"?", x:12, y:12, l:6, e:1},
    ];
}