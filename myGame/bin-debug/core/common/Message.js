var Message = (function () {
    function Message() {
        this.msgMap = new HashMap();
    }
    var d = __define,c=Message,p=c.prototype;
    d(Message, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new Message();
            }
            return this._instance;
        }
    );
    /**
     * 添加监听
     * @param cmd 消息类型
     * @param msg 监听函数
     */
    p.add = function (cmd, msg) {
        var list = this.msgMap.get(cmd);
        if (!list) {
            list = [];
            this.msgMap.put(cmd, list);
        }
        if (list.indexOf(msg) == -1) {
            list.push(msg);
        }
    };
    /**
     * 移除监听
     * @param cmd 消息类型
     * @param msg 监听函数
     */
    p.remove = function (cmd, msg) {
        var list = this.msgMap.get(cmd);
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                if (list[i] == msg) {
                    list[i] = null;
                }
            }
        }
    };
    /**
     * 发送消息
     * @param cmd 消息类型
     * @param data 数据
     */
    p.localSend = function (cmd, data) {
        if (data === void 0) { data = null; }
        var list = this.msgMap.get(cmd);
        if (list) {
            var len = list.length;
            for (var i = 0; i < len;) {
                if (!list[i]) {
                    list.splice(i, 1);
                    len--;
                    continue;
                }
                list[i].recvMsg.call(list[i], cmd, data);
                i++;
            }
            if (len <= 0) {
                this.msgMap.remove(cmd);
            }
        }
    };
    p.httpSend = function () {
    };
    p.socketSend = function () {
    };
    return Message;
})();
egret.registerClass(Message,'Message');
