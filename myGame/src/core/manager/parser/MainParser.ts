class MainParser {
    //解析文件配置Map
    private parserMap:HashMap;

    constructor() {
        this.parserMap = new HashMap();
        //初始化解析配置
        this.initParser();
    }

    /**
     * 获得解析对象
     * @param name 数据键值
     * @returns
     */
    getParser(name:string):ParserEntity {
        return this.parserMap.get(name);
    }

    /**
     * 初始化解析文件配置
     */
    private initParser():void {
        this.parserMap.put("item", new ParserEntity("game.ItemEntity", "item", 1, "id"));
        this.parserMap.put("propshop", new ParserEntity("game.PropShopEntity", "propshop", 2));
    }
}