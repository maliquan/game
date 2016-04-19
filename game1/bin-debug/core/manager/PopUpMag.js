var PopUpMag = (function () {
    function PopUpMag() {
        this.popUpMap = {};
        this.bkgWinName = "";
        this.curOpenWin = [];
    }
    var d = __define,c=PopUpMag,p=c.prototype;
    PopUpMag.ins = function () {
        if (this._ins == null) {
            this._ins = new PopUpMag();
        }
        return this._ins;
    };
    /**
     *
     * @param winName
     * @param layer
     * @param bkgAlpha
     * @param postion
     *
     * postion
     * 1 2 3
     * 4 5 6
     * 7 8 9
     */
    p.showWin = function (winName, postion, isBlack, param, layer) {
        if (postion === void 0) { postion = 5; }
        if (isBlack === void 0) { isBlack = false; }
        if (param === void 0) { param = null; }
        if (layer === void 0) { layer = PopUpMag.LAYER_POPUP; }
        var view = this.popUpMap[winName];
        var isFirstCreate = false; //是否是第一次创建
        if (view == null) {
            var cls = egret.getDefinitionByName(winName);
            this.popUpMap[winName] = new cls();
            isFirstCreate = true;
        }
        view = this.popUpMap[winName];
        view.postion = postion;
        view.showData = param;
        view.name = winName;
        this.curOpenWin.push(view.name);
        this.setbkg(isBlack, view);
        layer.addChild(view);
        //第一次创建不调用show，因为自动调用了，避免为创建完成就调用show
        if (!isFirstCreate) {
            this.popUpMap[winName].show();
        }
    };
    p.setbkg = function (isBlack, view) {
        if (view === void 0) { view = null; }
        if (!this.bkg) {
            this.bkg = new egret.Shape();
            this.bkg.graphics.beginFill(0x000000, 0.8);
            this.bkg.graphics.drawRect(0, 0, Global.STAGE_W, Global.STAGE_H);
            this.bkg.graphics.endFill();
            PopUpMag.LAYER_POPUP.addChildAt(this.bkg, 0);
        }
        this.bkg.touchEnabled = isBlack;
        this.bkg.visible = isBlack;
        this.bkgWinName = view ? view.name : "";
    };
    p.remove = function (winName) {
        var idx = this.curOpenWin.indexOf(winName);
        if (idx != -1) {
            this.curOpenWin.splice(idx, 1);
        }
        if (this.bkgWinName == winName) {
            this.setbkg(false);
        }
        if (this.popUpMap[winName] != null) {
            var view = this.popUpMap[winName];
            view.close();
        }
    };
    p.removeAll = function () {
        this.setbkg(false);
        var len = this.curOpenWin.length;
        for (var i = 0; i < len; i++) {
            var view = this.popUpMap[this.curOpenWin[i]];
            this.remove(view.name);
            i--;
            len--;
        }
    };
    return PopUpMag;
}());
egret.registerClass(PopUpMag,'PopUpMag');
