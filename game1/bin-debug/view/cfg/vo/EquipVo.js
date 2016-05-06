/**
 * Created by maliquan on 16/4/26.
 */
var EquipVo = (function (_super) {
    __extends(EquipVo, _super);
    function EquipVo(id, num, level, name, att, def, hp, speed) {
        _super.call(this, id, num, level, name);
        this.att = 0;
        this.def = 0;
        this.hp = 0;
        this.speed = 0;
        this.att = att;
        this.def = def;
        this.hp = hp;
        this.speed = speed;
    }
    var d = __define,c=EquipVo,p=c.prototype;
    return EquipVo;
}(ItemVo));
egret.registerClass(EquipVo,'EquipVo');
