var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        _super.call(this);
        this.width = Global.STAGE_W;
        this.height = Global.STAGE_H;
        this.bkg = new egret.Shape();
        this.bkg.graphics.beginFill(Global.COLOR_BACK);
        this.bkg.graphics.drawRect(0, 0, this.width - 1, this.height - 1);
        this.bkg.graphics.endFill();
        this.addChild(this.bkg);
        this.chatPan = new ChatPanel();
        this.addChild(this.chatPan);
        this.btnGroup = new MainBtnGroup();
        this.addChild(this.btnGroup);
        this.btnGroup.x = this.chatPan.x + this.chatPan.width;
        this.storagePanel = new StoragePanel();
        this.addChild(this.storagePanel);
        this.storagePanel.x = this.chatPan.x + this.chatPan.width;
        this.storagePanel.y = 100;
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
        Message.instance.add(LocalId.GO_HOME, this);
        Message.instance.add(LocalId.LEAVE_HOME, this);
    }
    var d = __define,c=MainScene,p=c.prototype;
    p.recvMsg = function (cmd, data) {
        switch (cmd) {
            case LocalId.GO_HOME:
                this.goHome();
                break;
            case LocalId.LEAVE_HOME:
                this.leaveHome();
                break;
        }
    };
    p.leaveHome = function () {
        Message.instance.localSend(LocalId.SHOW_MESSAGE, ["leave home"]);
        this.btnGroup.visible = false;
        this.bagPanel.visible = true;
        this.fightPan.visible = true;
    };
    p.goHome = function () {
        Message.instance.localSend(LocalId.SHOW_MESSAGE, ["go home"]);
        StorageMag.instance.addBag(BagMag.instance.itemList);
        BagMag.instance.cleanAll();
        this.storagePanel.refresh();
        this.fightPan.visible = false;
        this.bagPanel.visible = false;
        this.btnGroup.visible = true;
        this.btnGroup.setCurBtn(0);
    };
    return MainScene;
}(ViewCtl));
egret.registerClass(MainScene,'MainScene',["IMessage"]);
