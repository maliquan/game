var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        _super.call(this);
        this.panelArr = [];
        this.width = Global.STAGE_W;
        this.height = Global.STAGE_H;
        this.bkg = new egret.Shape();
        this.bkg.graphics.beginFill(Global.COLOR_BACK);
        this.bkg.graphics.drawRect(0, 0, this.width - 1, this.height - 1);
        this.bkg.graphics.endFill();
        this.addChild(this.bkg);
        this.chatPan = new ChatPanel();
        this.addChild(this.chatPan);
        this.homePanel = new HomePanel();
        this.homePanel.x = this.chatPan.x + this.chatPan.width;
        this.homePanel.y = 100;
        this.addChild(this.homePanel);
        this.btnGroup = new MainBtnGroup();
        this.addChild(this.btnGroup);
        this.btnGroup.x = this.chatPan.x + this.chatPan.width;
        this.storagePanel = new StoragePanel();
        this.addChild(this.storagePanel);
        this.storagePanel.x = this.chatPan.x + this.chatPan.width;
        this.storagePanel.y = 100;
        this.storagePanel.visible = false;
        this.fightPan = new FightScene();
        this.fightPan.init(Global.STAGE_W - this.chatPan.width, Global.STAGE_H - 100, 0);
        this.fightPan.x = this.chatPan.width;
        this.fightPan.y = 100;
        this.addChild(this.fightPan);
        this.fightPan.visible = false;
        this.bagPanel = new BagPanel();
        this.addChild(this.bagPanel);
        this.bagPanel.x = this.chatPan.x + this.chatPan.width;
        this.bagPanel.visible = false;
        this.panelArr = [this.homePanel, this.storagePanel, null, this.fightPan];
        TimeDropServer.instance.init(UserInfo.ins.lastLoginTime);
        Message.instance.add(LocalId.GO_HOME, this);
        Message.instance.add(LocalId.MAIN_BTN_CLK_IDX, this);
    }
    var d = __define,c=MainScene,p=c.prototype;
    p.recvMsg = function (cmd, data) {
        switch (cmd) {
            case LocalId.GO_HOME:
                this.goHome();
                break;
            case LocalId.MAIN_BTN_CLK_IDX:
                this.mainBtnClk(data);
                break;
        }
    };
    p.mainBtnClk = function (idx) {
        for (var i = 0; i < this.panelArr.length; i++) {
            if (this.panelArr[i]) {
                this.panelArr[i].visible = false;
            }
        }
        if (this.panelArr[idx]) {
            this.panelArr[idx].visible = true;
        }
        this.btnGroup.setCurBtn(idx);
        this.btnGroup.visible = true;
        this.bagPanel.visible = false;
        //0宅邸,1仓库,2集市,3城外
        switch (idx) {
            case 0:
                this.homePanel.update();
                break;
            case 1:
                this.storagePanel.refresh();
                break;
            case 2:
                break;
            case 3:
                this.btnGroup.visible = false;
                this.bagPanel.visible = true;
                break;
        }
    };
    p.goHome = function () {
        StorageMag.instance.addBag(BagMag.instance.itemList);
        BagMag.instance.cleanAll();
        this.mainBtnClk(0);
    };
    return MainScene;
}(ViewCtl));
egret.registerClass(MainScene,'MainScene',["IMessage"]);
