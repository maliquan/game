var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        _super.apply(this, arguments);
    }
    var d = __define,c=MainScene,p=c.prototype;
    p.onComplete = function () {
        _super.prototype.onComplete.call(this);
        this.mainTop.init();
    };
    p.show = function () {
        _super.prototype.show.call(this);
        this.mainTop.show();
        MapMag.instance.init(this);
    };
    p.close = function () {
        _super.prototype.close.call(this);
    };
    return MainScene;
})(ViewCtl);
egret.registerClass(MainScene,'MainScene');
