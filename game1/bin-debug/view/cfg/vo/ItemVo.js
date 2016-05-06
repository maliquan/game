/**
 * Created by maliquan on 16/4/26.
 */
var ItemVo = (function () {
    function ItemVo(id, num, level, name) {
        this.id = 0;
        this.num = 0;
        this.level = 0;
        this.name = "";
        this.id = id;
        this.num = num;
        this.level = level;
        this.name = name;
    }
    var d = __define,c=ItemVo,p=c.prototype;
    d(p, "color"
        ,function () {
            return Global.LEVEL_COLOR_ARR[this.level];
        }
    );
    return ItemVo;
}());
egret.registerClass(ItemVo,'ItemVo');
