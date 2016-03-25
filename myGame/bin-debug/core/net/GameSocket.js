var GameSocket = (function () {
    function GameSocket() {
    }
    var d = __define,c=GameSocket,p=c.prototype;
    p.onButtonClick = function (e) {
        //        var request = new egret.HttpRequest();
        //        request.responseType = egret.HttpResponseType.TEXT;
        //        //设置为 POST 请求
        //        request.open("http://httpbin.org/post",egret.HttpMethod.POST);
        //        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //        request.send();
        //        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        //        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        //        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
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
        this.socket.connect("http://www.maliquan.com", 10000);
    };
    p.sendData = function () {
        //创建 ByteArray 对象
        var byte = new egret.ByteArray();
        //写入字符串信息
        byte.writeUTF("Hello Egret WebSocket");
        //写入布尔值信息
        byte.writeBoolean(false);
        //写入int值信息
        byte.writeInt(123);
        byte.position = 0;
        //发送数据
        this.socket.writeBytes(byte, 0, byte.bytesAvailable);
    };
    p.onSocketOpen = function (e) {
        console.log("WebSocketOpen");
        this.sendData();
    };
    p.onSocketClose = function (e) {
        console.log("WebSocketClose");
    };
    p.onSocketError = function (e) {
        console.log("WebSocketError");
        console.log(e);
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
    p.onPostComplete = function (event) {
        var request = event.currentTarget;
        console.log("post data : ", request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.textColor = 0xffccdd;
        responseLabel.text = "POST response:\n" + request.response.substring(0, 50) + "...";
        //        this.addChild(responseLabel);
        responseLabel.x = 300;
        responseLabel.y = 70;
    };
    p.onPostIOError = function (event) {
        console.log("post error : " + event);
    };
    p.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return GameSocket;
})();
egret.registerClass(GameSocket,'GameSocket');
