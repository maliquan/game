class DataMag {
    private static _instance:DataMag;
    //文件解析类
    private mainParser:MainParser;
    //所有配置数据
    private configData:any;
    //数据缓存
    private dataMap:HashMap;

    constructor() {
        this.mainParser = new MainParser();
        this.dataMap = new HashMap();
    }

    static get instance():DataMag {
        if (!this._instance) {
            this._instance = new DataMag();
        }
        return this._instance;
    }

    /**
     * 初始化数据
     */
    init():void {
        var tempData = RES.getRes("config");
        if (tempData) {
            this.configData = tempData.data;
        }
    }

    /**
     * 获得数据
     * @param name 数据名
     */
    getData(name:string):any {
        var retData = this.dataMap.get(name);
        if (retData) {
            return retData;
        }
        var parser = this.mainParser.getParser(name);
        if (parser) {
            if (this.configData) {
                var data:any = this.configData[parser.fileName + ".txt"];
                if (data) {
                    if (parser.saveType == 1) {
                        retData = this.parserToMap(data, parser);
                    } else if (parser.saveType == 2) {
                        retData = this.parserToList(data, parser);
                    } else {
                        retData = data;
                    }
                    if (retData) {
                        this.dataMap.put(name, retData);
                    }
                }
            }
        }
        return retData;
    }

    /**
     * 解析数据存放到Map
     * @param data
     * @param parser
     * @returns {game.HashMap}
     */
    private parserToMap(data:any, parser:ParserEntity):HashMap {
        var map = new HashMap();
        var dataRows = data.split("\r\n");
        var len:number = dataRows.length;
        var parserCls:any;
        var parserObj:IParser;
        for (var i = 1; i < len; i++) {
            if(dataRows[i] != "") {
                parserCls = egret.getDefinitionByName(parser.parserCls);
                parserObj = new parserCls();
                parserObj.init(dataRows[i].split("	"));
                map.put(parserObj[parser.dataKey], parserObj);
            }
        }
        return map;
    }

    /**
     * 解析数据存放到数组
     * @param data
     * @param parser
     * @returns {any[]}
     */
    private parserToList(data:any, parser:ParserEntity):any[] {
        var list:any[] = [];
        var dataRows = data.split("\r\n");
        var len:number = dataRows.length;
        var parserCls:any;
        var parserObj:IParser;
        for (var i = 1; i < len; i++) {
            if (dataRows[i] != "") {
                parserCls = egret.getDefinitionByName(parser.parserCls);
                parserObj = new parserCls();
                parserObj.init(dataRows[i].split("	"));
                list.push(parserObj);
            }
        }
        return list;
    }
}