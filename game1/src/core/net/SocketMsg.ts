class SocketMsg{

    private static _instance:SocketMsg;
    private socket: egret.WebSocket;

    static get instance():SocketMsg {
        if (!this._instance) {
            this._instance = new SocketMsg();
        }
        return this._instance;
    }

    public initSocket():void{
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
        //连接服务器
        this.socket.connect("localhost",8000);
    }

    private onSocketOpen(e): void {
        Message.instance.localSend(LocalId.SOCKET_CONNECT_SUCCESS, this.socket);
    }

    private onSocketClose(e): void {
        console.log("WebSocketClose");
    }

    private onSocketError(e): void {
        console.log("WebSocketError");
        console.log(e)
    }

    public sendData(socketId:number, data:any): void {
        //创建 ByteArray 对象
        var byte: egret.ByteArray = new egret.ByteArray();
        byte.writeInt(socketId);
        byte.writeUTF(JSON.stringify(data));
        byte.position = 0;
        //发送数据
        this.socket.writeBytes(byte,0,byte.bytesAvailable);
    }

    private onReceiveMessage(e: egret.Event): void {
        //创建 ByteArray 对象
        var byte: egret.ByteArray = new egret.ByteArray();
        //读取数据
        this.socket.readBytes(byte);
        //读取字符串信息
        var msg: string = byte.readUTF();
        //读取布尔值信息
        var boo: boolean = byte.readBoolean();
        //读取int值信息
        var num: number = byte.readInt();
        console.log("收到数据:");
        console.log("readUTF : " + msg);
        console.log("readBoolean : " + boo.toString());
        console.log("readInt : " + num.toString());
    }


}