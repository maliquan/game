class ParserEntity {
    //文件对应解析类
    parserCls:string;
    //文件数据名字
    fileName:string;
    //数据存储类型 (0:JSON 1:Map 2:Array)
    saveType:number;
    //数据主键 (为Map的时候需要)
    dataKey:string;

    constructor(parserCls:string, fileName:string, saveType:number, dataKey:string = "") {
        this.parserCls = parserCls;
        this.fileName = fileName;
        this.saveType = saveType;
        this.dataKey = dataKey;
    }
}