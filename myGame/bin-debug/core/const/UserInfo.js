var UserInfo = (function () {
    function UserInfo() {
        this.name = "";
        this.foodNum = 0;
        this.goldNum = 0;
        this.diamondNum = 0;
        this.curChapterId = 1;
        this.chapterDataList = [];
        this.maxChapterId = 1000; //最大关卡数，地图根据这个值生成的关卡
    }
    var d = __define,c=UserInfo,p=c.prototype;
    d(UserInfo, "ins"
        ,function () {
            if (!this._ins) {
                this._ins = new UserInfo();
            }
            return this._ins;
        }
    );
    p.parserLoginInfo = function (data) {
        this.name = data.name || this.name;
        this.foodNum = data.foodNum || this.foodNum;
        this.goldNum = data.goldNum || this.goldNum;
        this.diamondNum = data.diamondNum || this.diamondNum;
        this.maxChapterId = data.maxChapterId || this.maxChapterId;
        this.curChapterId = data.curChapterId || this.curChapterId;
        this.chapterDataList = data.chapterList || this.chapterDataList;
    };
    return UserInfo;
})();
egret.registerClass(UserInfo,'UserInfo');
