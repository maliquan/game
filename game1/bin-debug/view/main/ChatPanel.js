/**
 * Created by maliquan on 16/4/23.
 */
var ChatPanel = (function (_super) {
    __extends(ChatPanel, _super);
    function ChatPanel() {
        _super.call(this);
        this.width = Global.STAGE_W * 0.3;
        this.height = Global.STAGE_H;
        this.chatLab = new egret.TextField();
        this.chatLab.border = true;
        this.chatLab.borderColor = Global.COLOR_FORE;
        this.chatLab.textColor = Global.COLOR_FORE;
        this.chatLab.background = true;
        this.chatLab.backgroundColor = Global.COLOR_BACK;
        this.chatLab.width = this.width;
        this.chatLab.height = this.height;
        this.addChild(this.chatLab);
        Message.instance.add(LocalId.SHOW_MESSAGE, this);
        Message.instance.add(LocalId.SHOW_MESSAGE_COLOR, this);
        //        var tx:egret.TextField = new egret.TextField;
        //        tx.textFlow = new Array<egret.ITextElement>(
        //            { text:"这段文字有链接", style: { "href" : "event:text event triggered" } }
        //            ,{ text:"\n这段文字没链接", style: {} }
        //        );
        //        tx.touchEnabled = true;
        //        tx.addEventListener( egret.TextEvent.LINK, function( evt:egret.TextEvent ){
        //            console.log( evt.text );
        //        }, this );
        //        tx.x = 10;
        //        tx.y = 90;
        //        this.addChild( tx );
    }
    var d = __define,c=ChatPanel,p=c.prototype;
    p.recvMsg = function (cmd, data) {
        switch (cmd) {
            case LocalId.SHOW_MESSAGE:
                this.addTxt(data[0] || "", data[1] || Global.COLOR_FORE, data[2] || Global.FS_20);
                break;
            case LocalId.SHOW_MESSAGE_COLOR:
                this.addColorTxt(data);
                break;
        }
    };
    p.addTxt = function (str, color, size) {
        var list = [{ text: str + "\n", style: { "textColor": color, "size": size } }];
        list = this.chatLab.textFlow.concat(list);
        this.chatLab.textFlow = list;
    };
    p.addColorTxt = function (list) {
        list = this.chatLab.textFlow.concat(list);
        this.chatLab.textFlow = list;
    };
    return ChatPanel;
}(egret.Sprite));
egret.registerClass(ChatPanel,'ChatPanel',["IMessage"]);
