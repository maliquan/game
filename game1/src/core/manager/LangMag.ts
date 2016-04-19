class LangMag {
    private static _instance:LangMag;
    //语言包数据
    private langData:any;

    constructor() {
    }

    static get instance():LangMag {
        if (!this._instance) {
            this._instance = new LangMag();
        }
        return this._instance;
    }

    setData(dataName:string):void {
        this.langData = RES.getRes(dataName);
    }

    getText(key:string, ...rest:any[]):string {
        var value = this.langData[key];
        if (value) {
            var len:number = rest.length;
            if (len > 0) {
                var index:number = 1;
                while (index <= len) {
                    value = value.replace("#v" + index + "#", rest[index - 1] + "");
                    index++;
                }
            }
            return value;
        }
        return "";
    }
}