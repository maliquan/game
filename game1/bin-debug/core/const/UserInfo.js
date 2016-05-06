var UserInfo = (function () {
    function UserInfo() {
        this.user_bag_level = 0;
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
    return UserInfo;
}());
egret.registerClass(UserInfo,'UserInfo');
