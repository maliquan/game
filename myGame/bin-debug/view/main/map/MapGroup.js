var MapGroup = (function (_super) {
    __extends(MapGroup, _super);
    function MapGroup() {
        _super.call(this);
        this._scrollV = 0;
        this._height = 0;
        this.img = new eui.Image();
        this.addChild(this.img);
        this.img2 = new eui.Image();
        this.addChild(this.img2);
    }
    var d = __define,c=MapGroup,p=c.prototype;
    d(p, "scrollV"
        ,function () {
            return this._scrollV;
        }
        ,function (scrollV) {
            this._scrollV = scrollV;
        }
    );
    d(p, "height"
        ,function () {
            return this._height;
        }
        ,function (height) {
            this._height = height;
            this.img2.y = this.height;
        }
    );
    return MapGroup;
})(eui.Group);
egret.registerClass(MapGroup,'MapGroup');
