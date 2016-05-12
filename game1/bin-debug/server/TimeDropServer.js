/**
 * Created by maliquan on 16/5/12.
 */
var TimeDropServer = (function () {
    function TimeDropServer() {
        this.dropList = [
            [{ id: 10000, p: 0.9 }, { id: 20000, p: 0.5 }],
        ];
        this.delay = 60;
    }
    var d = __define,c=TimeDropServer,p=c.prototype;
    d(TimeDropServer, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new TimeDropServer();
            }
            return this._instance;
        }
    );
    p.init = function (loginTime) {
        var startStr = LangMag.instance.getText("timeDrop_0");
        this.startObj = { text: startStr + "\n", style: { "textColor": Global.COLOR_FORE, "size": Global.FS_20 } };
        var dropArr = [this.startObj];
        var nowT = new Date().getTime();
        var differ = Math.floor((nowT - loginTime) / 1000 / this.delay); //获得奖励的次数
        console.log(nowT);
        console.log(loginTime);
        console.log(differ);
        var levelArr = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < differ; i++) {
            this.drop(levelArr);
        }
        var colorNameArr = LangMag.instance.getText("colorNameArr").split(",");
        var colorArr = Global.LEVEL_COLOR_ARR;
        for (var m = 0; m < colorArr.length; m++) {
            if (levelArr[m] > 0) {
                var str = colorNameArr[m] + "x" + levelArr[m] + " ";
                dropArr.push({ text: str, style: { "textColor": colorArr[m], "size": Global.FS_20 } });
            }
        }
        if (dropArr.length > 1) {
            dropArr.push({ text: "\n" });
            Message.instance.localSend(LocalId.SHOW_MESSAGE_COLOR, dropArr);
        }
        this.start();
    };
    p.start = function () {
        TimerMag.instance.add(this.drop, this, this.delay * 1000);
    };
    p.drop = function (levelArr) {
        if (levelArr === void 0) { levelArr = null; }
        var dropArr = [this.startObj];
        var dropCfg = this.dropList[UserInfo.ins.mapIdx];
        var len = dropCfg.length;
        for (var j = 0; j < len; j++) {
            var item = dropCfg[j];
            var random = Math.random();
            if (random < item.p) {
                StorageMag.instance.addItem(item.id, 1, true);
                var drowVo = ItemMag.instance.getItemVo(item.id, 1);
                if (levelArr) {
                    levelArr[drowVo.level]++;
                }
                else {
                    var str = " " + drowVo.name + "x" + drowVo.num + "\n";
                    dropArr.push({ text: str, style: { "textColor": drowVo.color, "size": Global.FS_20 } });
                }
            }
        }
        if (levelArr == null && dropArr.length > 1) {
            Message.instance.localSend(LocalId.SHOW_MESSAGE_COLOR, dropArr);
        }
    };
    return TimeDropServer;
}());
egret.registerClass(TimeDropServer,'TimeDropServer');
