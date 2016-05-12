var UserInfo = (function () {
    function UserInfo() {
        this.user_bag_level = 0;
        this._equipArr = [];
        this.mapIdx = 0;
        this.lastLoginTime = 0;
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
    d(p, "equipArr"
        ,function () {
            return this._equipArr;
        }
        ,function (list) {
            for (var i = 0; i < list.length; i++) {
                this._equipArr[i] = ItemMag.instance.getItemVo(list[0], list[1]);
            }
        }
    );
    return UserInfo;
}());
egret.registerClass(UserInfo,'UserInfo');
