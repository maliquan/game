/**
 * Created by maliquan on 16/4/26.
 */
var ItemShowPanel = (function (_super) {
    __extends(ItemShowPanel, _super);
    function ItemShowPanel() {
        _super.call(this);
        this.nameLab = new eui.Label();
        this.addChild(this.nameLab);
    }
    var d = __define,c=ItemShowPanel,p=c.prototype;
    p.showItem = function (vo) {
        this.nameLab.text = vo.name + " x" + vo.num;
        this.nameLab.textColor = vo.color;
    };
    return ItemShowPanel;
}(egret.Sprite));
egret.registerClass(ItemShowPanel,'ItemShowPanel');
