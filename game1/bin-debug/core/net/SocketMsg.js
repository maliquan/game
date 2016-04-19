var SocketMsg = (function () {
    function SocketMsg() {
    }
    var d = __define,c=SocketMsg,p=c.prototype;
    d(SocketMsg, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new SocketMsg();
            }
            return this._instance;
        }
    );
    p.initSocket = function () {
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this.socket.connect("localhost", 8000);
    };
    p.onSocketOpen = function (e) {
        Message.instance.localSend(LocalId.SOCKET_CONNECT_SUCCESS, this.socket);
    };
    p.onSocketClose = function (e) {
        console.log("WebSocketClose");
    };
    p.onSocketError = function (e) {
        console.log("WebSocketError");
        console.log(e);
    };
    p.sendData = function (socketId, data) {
        //创建 ByteArray 对象
        var byte = new egret.ByteArray();
        byte.writeInt(socketId);
        byte.writeUTF(JSON.stringify(data));
        byte.position = 0;
        //发送数据
        this.socket.writeBytes(byte, 0, byte.bytesAvailable);
    };
    p.onReceiveMessage = function (e) {
        //创建 ByteArray 对象
        var byte = new egret.ByteArray();
        //读取数据
        this.socket.readBytes(byte);
        //读取字符串信息
        var msg = byte.readUTF();
        //读取布尔值信息
        var boo = byte.readBoolean();
        //读取int值信息
        var num = byte.readInt();
        console.log("收到数据:");
        console.log("readUTF : " + msg);
        console.log("readBoolean : " + boo.toString());
        console.log("readInt : " + num.toString());
    };
    return SocketMsg;
}());
egret.registerClass(SocketMsg,'SocketMsg');
