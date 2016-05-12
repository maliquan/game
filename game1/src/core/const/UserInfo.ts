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
    private _equipArr:ItemVo[] = [];
    public mapIdx:number = 0;
    public lastLoginTime:number = 0;

    public set equipArr(list:any[]){
        for(var i:number=0; i<list.length; i++){
            this._equipArr[i] = ItemMag.instance.getItemVo(list[0], list[1])
        }
    }

    public get equipArr():any[]{
        return this._equipArr;
    }

    public constructor(){
    }
}