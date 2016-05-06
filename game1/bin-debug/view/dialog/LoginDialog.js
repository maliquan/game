/**
 * Created by maliquan on 16/4/20.
 */
var LoginDialog = (function (_super) {
    __extends(LoginDialog, _super);
    function LoginDialog() {
        _super.call(this);
        this.width = 350;
        this.height = 250 + 15;
        this.bkgShape = new egret.Shape();
        this.bkgShape.graphics.lineStyle(2, Global.COLOR_FORE, 0.8);
        this.bkgShape.graphics.beginFill(Global.COLOR_BACK);
        this.bkgShape.graphics.drawRect(0, 0, this.width, this.height);
        this.bkgShape.graphics.endFill();
        this.bkgShape.y = 15;
        this.addChild(this.bkgShape);
        this.titleLab = new GLabel();
        this.titleLab.bold = true;
        this.titleLab.background = true;
        this.titleLab.backgroundColor = Global.COLOR_BACK;
        this.titleLab.x = 20;
        this.titleLab.y = 0;
        this.addChild(this.titleLab);
        this.contentLab = new GLabel();
        this.contentLab.width = this.width - 20;
        this.contentLab.x = 10;
        this.contentLab.y = 50;
        this.addChild(this.contentLab);
        this.btn1 = new GBtn(this.yesHandler, this);
        this.btn1.x = this.width * 0.5 - this.btn1.width * 0.5;
        this.btn1.y = this.height - 40;
        this.addChild(this.btn1);
        var nameSp = new egret.Sprite();
        this.addChild(nameSp);
        var nameLab = new eui.Label();
        nameLab.textColor = Global.COLOR_FORE;
        nameLab.text = LangMag.instance.getText("userName");
        nameSp.addChild(nameLab);
        this.userNameLab = new eui.EditableText();
        this.userNameLab.maxChars = 16;
        this.userNameLab.textColor = Global.COLOR_FORE;
        this.userNameLab.width = 160;
        this.userNameLab.height = 35;
        this.userNameLab.border = true;
        this.userNameLab.borderColor = Global.COLOR_FORE;
        this.userNameLab.x = nameLab.width + 5;
        nameSp.addChild(this.userNameLab);
        nameSp.x = this.width * 0.5 - nameSp.width * 0.5;
        nameSp.y = this.btn1.y - 100;
        var pwSp = new egret.Sprite();
        this.addChild(pwSp);
        var pwLab = new eui.Label();
        pwLab.textColor = Global.COLOR_FORE;
        pwLab.text = LangMag.instance.getText("password");
        pwSp.addChild(pwLab);
        this.passwordLab = new eui.EditableText();
        this.passwordLab.maxChars = 16;
        this.passwordLab.textColor = Global.COLOR_FORE;
        this.passwordLab.width = 160;
        this.passwordLab.height = 35;
        this.passwordLab.border = true;
        this.passwordLab.borderColor = Global.COLOR_FORE;
        this.passwordLab.displayAsPassword = true;
        this.passwordLab.x = pwLab.width + 5;
        pwSp.addChild(this.passwordLab);
        pwSp.x = this.width * 0.5 - pwSp.width * 0.5;
        pwSp.y = this.btn1.y - 50;
    }
    var d = __define,c=LoginDialog,p=c.prototype;
    p.yesHandler = function () {
        this.clean();
        this.onComplete();
    };
    p.onComplete = function () {
        if (this.callFun) {
            this.callFun.call(this.thisObject, [this.userNameLab.text, this.passwordLab.text]);
        }
    };
    p.clean = function () {
        this.btn1.clean();
    };
    p.show = function () {
        _super.prototype.show.call(this);
        this.titleLab.text = this.showData[0];
        this.contentLab.text = this.showData[1];
        this.btn1.setTxt(this.showData[2]);
        this.callFun = this.showData[3];
        this.thisObject = this.showData[4];
    };
    return LoginDialog;
}(ViewCtl));
egret.registerClass(LoginDialog,'LoginDialog');
