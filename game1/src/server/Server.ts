class Server{

    private static userName:string = "";
    private static localData:any;

    public static request(url:string, param:any):any{
        //如果没有本地数据
        if(!this.localData){
            this.userName = param.userName;
            var cfg:string = egret.localStorage.getItem(this.userName);
            if(cfg){
                this.localData = JSON.parse(cfg);
            }else{
                this.localData = {
                    "name":this.userName,
                    "foodNum":100,
                    "goldNum":100,
                    "diamondNum":0,
                    "curChapterId":1,
                    "maxChapterId":UserInfo.ins.maxChapterId,
                    "chapterList":[]//[{id:1,starNum:3},{}]
                }
            }
        }

        var data:any = {};

        switch (url){
            case HttpMsgCMD.LOGIN:
                data = {
                    "ret":0,
                    "name":this.localData.name,
                    "foodNum":this.localData.foodNum,
                    "goldNum":this.localData.goldNum,
                    "diamondNum":this.localData.diamondNum,
                    "curChapterId":this.localData.curChapterId,
                    "maxChapterId":UserInfo.ins.maxChapterId,
                    "chapterList":this.localData.chapterList
                };
                break;
            case HttpMsgCMD.START_CHAPTER:
                this.localData.foodNum -= 1;
                data = {
                    "ret":0,
                    "foodNum":this.localData.foodNum,
                    "goldNum":this.localData.goldNum
                };
                break;
            case HttpMsgCMD.CHAPTER_OVER:
                var isWin:boolean = param.isWin;
                var chapterId:number = param.chapterId;
                if(isWin){
                    var starNum:number = param.starNum;
                    var list:any[] = this.localData.chapterList;
                    if(!list[chapterId]){
                        this.localData.chapterList[chapterId] = {id:chapterId, starNum:starNum};
                    }else{
                        //星星数量取最大的
                        starNum = Math.max(starNum, this.localData.chapterList[chapterId].starNum);
                        this.localData.chapterList[chapterId].starNum = starNum;
                    }
                    if(chapterId == this.localData.curChapterId){
                        this.localData.curChapterId = Math.min(this.localData.curChapterId+1, this.localData.maxChapterId);
                    }
                }
                data = {
                    "curChapterId":this.localData.curChapterId,
                    "crossChapterId":chapterId
                };
                break;
        }
        UserInfo.ins.parserLoginInfo(data);
        this.saveData();
        return data;
    }

    public static clean():void{
        egret.localStorage.clear();
    }

    /* 保存数据到本地 */
    public static saveData():void{
        egret.localStorage.clear();
        egret.localStorage.setItem(this.userName, JSON.stringify(this.localData));
        console.log(JSON.stringify(this.localData));
    }
}