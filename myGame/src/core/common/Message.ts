class Message {
    private static _instance:Message;
    //消息Map
    private msgMap:HashMap;

    constructor() {
        this.msgMap = new HashMap();
    }

    static get instance():Message {
        if (!this._instance) {
            this._instance = new Message();
        }
        return this._instance;
    }

    /**
     * 添加监听
     * @param cmd 消息类型
     * @param msg 监听函数
     */
    add(cmd:number, msg:IMessage):void {
        var list:IMessage[] = this.msgMap.get(cmd);
        if (!list) {
            list = [];
            this.msgMap.put(cmd, list);
        }
        if (list.indexOf(msg) == -1) {
            list.push(msg);
        }
    }

    /**
     * 移除监听
     * @param cmd 消息类型
     * @param msg 监听函数
     */
    remove(cmd:number, msg:IMessage) {
        var list:IMessage[] = this.msgMap.get(cmd);
        if (list) {
            var len:number = list.length;
            for (var i = 0; i < len; i++) {
                if (list[i] == msg) {
                    list[i] = null;
                }
            }
        }
    }

    /**
     * 发送消息
     * @param cmd 消息类型
     * @param data 数据
     */
    localSend(cmd:number, data:any = null):void {
        var list:IMessage[] = this.msgMap.get(cmd);
        if (list) {
            var len:number = list.length;
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
    }

    public httpSend():void{

    }

    public socketSend():void{

    }

}