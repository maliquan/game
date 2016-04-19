var DataMag = (function () {
    function DataMag() {
        this.mainParser = new MainParser();
        this.dataMap = new HashMap();
    }
    var d = __define,c=DataMag,p=c.prototype;
    d(DataMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new DataMag();
            }
            return this._instance;
        }
    );
    /**
     * 初始化数据
     */
    p.init = function () {
        var tempData = RES.getRes("config");
        if (tempData) {
            this.configData = tempData.data;
        }
    };
    /**
     * 获得数据
     * @param name 数据名
     */
    p.getData = function (name) {
        var retData = this.dataMap.get(name);
        if (retData) {
            return retData;
        }
        var parser = this.mainParser.getParser(name);
        if (parser) {
            if (this.configData) {
                var data = this.configData[parser.fileName + ".txt"];
                if (data) {
                    if (parser.saveType == 1) {
                        retData = this.parserToMap(data, parser);
                    }
                    else if (parser.saveType == 2) {
                        retData = this.parserToList(data, parser);
                    }
                    else {
                        retData = data;
                    }
                    if (retData) {
                        this.dataMap.put(name, retData);
                    }
                }
            }
        }
        return retData;
    };
    /**
     * 解析数据存放到Map
     * @param data
     * @param parser
     * @returns {game.HashMap}
     */
    p.parserToMap = function (data, parser) {
        var map = new HashMap();
        var dataRows = data.split("\r\n");
        var len = dataRows.length;
        var parserCls;
        var parserObj;
        for (var i = 1; i < len; i++) {
            if (dataRows[i] != "") {
                parserCls = egret.getDefinitionByName(parser.parserCls);
                parserObj = new parserCls();
                parserObj.init(dataRows[i].split("	"));
                map.put(parserObj[parser.dataKey], parserObj);
            }
        }
        return map;
    };
    /**
     * 解析数据存放到数组
     * @param data
     * @param parser
     * @returns {any[]}
     */
    p.parserToList = function (data, parser) {
        var list = [];
        var dataRows = data.split("\r\n");
        var len = dataRows.length;
        var parserCls;
        var parserObj;
        for (var i = 1; i < len; i++) {
            if (dataRows[i] != "") {
                parserCls = egret.getDefinitionByName(parser.parserCls);
                parserObj = new parserCls();
                parserObj.init(dataRows[i].split("	"));
                list.push(parserObj);
            }
        }
        return list;
    };
    return DataMag;
}());
egret.registerClass(DataMag,'DataMag');
