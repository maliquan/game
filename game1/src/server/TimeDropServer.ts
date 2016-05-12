/**
 * Created by maliquan on 16/5/12.
 */
class TimeDropServer {
    private static _instance:TimeDropServer;

    static get instance():TimeDropServer {
        if (!this._instance) {
            this._instance = new TimeDropServer();
        }
        return this._instance;
    }

    private dropList:any[][] = [
        [{id:10000, p:0.9}, {id:20000, p:0.5}],
    ];

    private delay:number = 60;
    private startObj:any;

    public init(loginTime:number):void{
        var startStr:string = LangMag.instance.getText("timeDrop_0");
        this.startObj = { text:startStr+"\n", style:{"textColor":Global.COLOR_FORE, "size":Global.FS_20}};

        var dropArr:Array<egret.ITextElement> = [this.startObj];
        var nowT:any = new Date().getTime();
        var differ:number = Math.floor((nowT - loginTime)/1000/this.delay);//获得奖励的次数
        console.log(nowT)
        console.log(loginTime)
        console.log(differ)
        var levelArr:number[] = [0,0,0,0,0,0,0,0];
        for(var i:number=0; i<differ; i++){
            this.drop(levelArr);
        }
        var colorNameArr:string[] = LangMag.instance.getText("colorNameArr").split(",");
        var colorArr:number[] = Global.LEVEL_COLOR_ARR;
        for(var m:number=0; m<colorArr.length; m++){
            if(levelArr[m] > 0){
                var str = colorNameArr[m] + "x" + levelArr[m] + " ";
                dropArr.push({ text:str, style:{"textColor":colorArr[m], "size":Global.FS_20} });
            }
        }
        if(dropArr.length > 1){
            dropArr.push({text:"\n"});
            Message.instance.localSend(LocalId.SHOW_MESSAGE_COLOR, dropArr);
        }

        this.start();
    }

    public start():void{
        TimerMag.instance.add(this.drop, this, this.delay*1000);
    }

    private drop(levelArr:number[]=null):void{
        var dropArr:Array<egret.ITextElement> = [this.startObj];
        var dropCfg:any[] = this.dropList[UserInfo.ins.mapIdx];
        var len:number = dropCfg.length;
        for(var j:number=0; j<len; j++){
            var item:any = dropCfg[j];
            var random:number = Math.random();
            if(random < item.p){
                StorageMag.instance.addItem(item.id, 1, true);
                var drowVo:ItemVo = ItemMag.instance.getItemVo(item.id, 1);
                if(levelArr){
                    levelArr[drowVo.level]++;
                }else{
                    var str = " " + drowVo.name + "x" + drowVo.num + "\n";
                    dropArr.push({ text:str, style:{"textColor":drowVo.color, "size":Global.FS_20} });
                }
            }
        }
        if(levelArr==null && dropArr.length > 1){
            Message.instance.localSend(LocalId.SHOW_MESSAGE_COLOR, dropArr);
        }
    }

}