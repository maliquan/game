/**
 * Created by maliquan on 16/5/5.
 */
class KeyBoardUtils {
    private static _instance: KeyBoardUtils;
    private list: Object;
    private isListening: boolean = false;

    public constructor() {
        this.list = {};
    }

    public static get instance(): KeyBoardUtils {
        if(KeyBoardUtils._instance == null) {
            KeyBoardUtils._instance = new KeyBoardUtils();
        }
        return KeyBoardUtils._instance;
    }

    private add(): void {
        if(this.isListening == false) {
            this.isListening = true;
            document.addEventListener("keydown",KeyBoardUtils.instance.onKeyDown);
        }
    }

    private onKeyDown(evt): void {
        console.log("evt.keyCode:" + evt.keyCode);
        var target: any;
        for(target in KeyBoardUtils.instance.list) {
            var vo: KeyVo = KeyBoardUtils.instance.list[target];
            vo.callback.call(vo.target,evt);
        }
    }


    /**
     * 注册监听
     * @param callback 回调方法
     * @param target
     */
    public addListener(callback: any,target: any): void {
        var temp: string = egret.getQualifiedClassName(target);
        if(KeyBoardUtils._instance.list[temp] == null) {
            var vo: KeyVo = new KeyVo(temp,target,callback);
            KeyBoardUtils._instance.list[vo.name] = vo;
        }
        KeyBoardUtils._instance.add();
    }


    /**
     * 移出监听
     */
    public removeListener(target: any): void {
        var temp: string = egret.getQualifiedClassName(target);
        if(KeyBoardUtils._instance.list[temp] != null) {
            delete KeyBoardUtils._instance.list[temp];
        }
        this.checkCount();
    }


    private checkCount(): void {
        for(var key in KeyBoardUtils._instance.list) {
            return;
        }
        document.removeEventListener("keydown",KeyBoardUtils.instance.onKeyDown);
        this.isListening = false;
    }
}

class KeyVo {
    public name: string = "";
    public target: egret.DisplayObject;
    public callback: Function;

    public constructor(name: string,tar: any,call: any) {
        this.name = name;
        this.target = tar;
        this.callback = call;
    }
} 