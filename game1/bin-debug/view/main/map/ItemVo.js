var ItemVo = (function () {
    function ItemVo() {
        this.effect_bit_len = 15; //连线特效的总帧数
        this.effect_speed = 0; //连线特效的帧速
        this.bitSrcIdx = 0;
        this.vo = new ParserMapVo();
    }
    var d = __define,c=ItemVo,p=c.prototype;
    p.createMapBtn = function (group, curChapterId, chapterList) {
        if (!this.mapBtn) {
            this.mapBtn = new MapBtn();
            this.mapBtn.skinName = "MapBtnSkin";
            group.addChild(this.mapBtn);
            this.mapBtn.y = -200;
        }
        this.mapBtn.x = this.vo.x;
        this.setBtn(curChapterId, chapterList);
    };
    p.createBit = function (group) {
        if (!this.bit) {
            this.bit = new eui.Image();
            this.bit.touchEnabled = false;
            this.bit.anchorOffsetX = this.vo.w * 0.5;
            this.bit.anchorOffsetY = this.vo.h * 0.5;
            group.addChild(this.bit);
            this.bit.y = -200;
        }
        this.bit.x = this.vo.x;
        this.bit.rotation = this.vo.lineR;
        this.bitSrcIdx = 0;
        EnterFrameMag.instance.add(this.setBit, this);
        console.log("add +++++++" + this.vo.depth);
    };
    p.move = function (group, startY, bottomY) {
        if (this.vo.bottom < startY || this.vo.y > bottomY) {
            this.clear();
            return true;
        }
        var bitY = this.vo.y - startY;
        if (this.vo.dataId == -1) {
            this.bit.y = bitY;
        }
        else if (this.vo.dataId > 0) {
            this.mapBtn.y = bitY;
        }
        if (this.vo.dataId > 0) {
            group.addChild(this.mapBtn);
        }
        return false;
    };
    p.setBit = function () {
        this.bit.texture = RES.getRes("effect_line_" + this.bitSrcIdx);
        if (this.effect_speed++ == 2) {
            this.effect_speed = 0;
            this.bitSrcIdx = this.bitSrcIdx >= this.effect_bit_len ? 0 : this.bitSrcIdx + 1;
        }
    };
    p.setBtn = function (curChapterId, list) {
        var isEnable = this.vo.dataId <= curChapterId;
        this.mapBtn.setId(this.vo.dataId, list);
    };
    p.clear = function () {
        if (this.vo.dataId > 0) {
            this.mapBtn.y = -200;
        }
        else if (this.vo.dataId == -1) {
            this.bit.y = -200;
            EnterFrameMag.instance.remove(this);
            this.bit.rotation = 0;
            console.log("remove ---------" + this.vo.depth);
        }
    };
    return ItemVo;
}());
egret.registerClass(ItemVo,'ItemVo');
