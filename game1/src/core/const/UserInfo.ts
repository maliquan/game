class UserInfo{
    private static _ins:UserInfo;

    static get ins():UserInfo {
        if (!this._ins) {
            this._ins = new UserInfo();
        }
        return this._ins;
    }

    public userData:ObjectVo;
    public user_bag_level:number = 0;

    public constructor(){
    }
}