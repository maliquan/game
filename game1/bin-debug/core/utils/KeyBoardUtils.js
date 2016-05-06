/**
 * Created by maliquan on 16/5/5.
 */
var KeyBoardUtils = (function () {
    function KeyBoardUtils() {
        this.isListening = false;
        this.list = {};
    }
    var d = __define,c=KeyBoardUtils,p=c.prototype;
    d(KeyBoardUtils, "instance"
        ,function () {
            if (KeyBoardUtils._instance == null) {
                KeyBoardUtils._instance = new KeyBoardUtils();
            }
            return KeyBoardUtils._instance;
        }
    );
    p.add = function () {
        if (this.isListening == false) {
            this.isListening = true;
            document.addEventListener("keydown", KeyBoardUtils.instance.onKeyDown);
        }
    };
    p.onKeyDown = function (evt) {
        console.log("evt.keyCode:" + evt.keyCode);
        var target;
        for (target in KeyBoardUtils.instance.list) {
            var vo = KeyBoardUtils.instance.list[target];
            vo.callback.call(vo.target, evt);
        }
    };
    /**
     * 注册监听
     * @param callback 回调方法
     * @param target
     */
    p.addListener = function (callback, target) {
        var temp = egret.getQualifiedClassName(target);
        if (KeyBoardUtils._instance.list[temp] == null) {
            var vo = new KeyVo(temp, target, callback);
            KeyBoardUtils._instance.list[vo.name] = vo;
        }
        KeyBoardUtils._instance.add();
    };
    /**
     * 移出监听
     */
    p.removeListener = function (target) {
        var temp = egret.getQualifiedClassName(target);
        if (KeyBoardUtils._instance.list[temp] != null) {
            delete KeyBoardUtils._instance.list[temp];
        }
        this.checkCount();
    };
    p.checkCount = function () {
        for (var key in KeyBoardUtils._instance.list) {
            return;
        }
        document.removeEventListener("keydown", KeyBoardUtils.instance.onKeyDown);
        this.isListening = false;
    };
    return KeyBoardUtils;
}());
egret.registerClass(KeyBoardUtils,'KeyBoardUtils');
var KeyVo = (function () {
    function KeyVo(name, tar, call) {
        this.name = "";
        this.name = name;
        this.target = tar;
        this.callback = call;
    }
    var d = __define,c=KeyVo,p=c.prototype;
    return KeyVo;
}());
egret.registerClass(KeyVo,'KeyVo');
