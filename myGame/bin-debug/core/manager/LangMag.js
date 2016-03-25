var LangMag = (function () {
    function LangMag() {
    }
    var d = __define,c=LangMag,p=c.prototype;
    d(LangMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new LangMag();
            }
            return this._instance;
        }
    );
    p.setData = function (dataName) {
        this.langData = RES.getRes(dataName);
    };
    p.getText = function (key) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var value = this.langData[key];
        if (value) {
            var len = rest.length;
            if (len > 0) {
                var index = 1;
                while (index <= len) {
                    value = value.replace("#v" + index + "#", rest[index - 1] + "");
                    index++;
                }
            }
            return value;
        }
        return "";
    };
    return LangMag;
})();
egret.registerClass(LangMag,'LangMag');
