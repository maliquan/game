class UserInfo{
    private static _ins:UserInfo;

    static get ins():UserInfo {
        if (!this._ins) {
            this._ins = new UserInfo();
        }
        return this._ins;
    }

    public name:string = "";
    public foodNum:number = 0;
    public goldNum:number = 0;
    public diamondNum:number = 0;
    public curChapterId:number = 1;
    public chapterDataList:any[] = [];
    public maxChapterId:number = 1000;//最大关卡数，地图根据这个值生成的关卡

    public parserLoginInfo(data:any):void{
        this.name = data.name || this.name;
        this.foodNum = data.foodNum || this.foodNum;
        this.goldNum = data.goldNum || this.goldNum;
        this.diamondNum = data.diamondNum || this.diamondNum;
        this.maxChapterId = data.maxChapterId || this.maxChapterId;
        this.curChapterId = data.curChapterId || this.curChapterId;
        this.chapterDataList = data.chapterList || this.chapterDataList;
    }
}