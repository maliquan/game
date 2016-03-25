var MainParser = (function () {
    function MainParser() {
        this.parserMap = new HashMap();
        //初始化解析配置
        this.initParser();
    }
    var d = __define,c=MainParser,p=c.prototype;
    /**
     * 获得解析对象
     * @param name 数据键值
     * @returns
     */
    p.getParser = function (name) {
        return this.parserMap.get(name);
    };
    /**
     * 初始化解析文件配置
     */
    p.initParser = function () {
        this.parserMap.put("item", new ParserEntity("game.ItemEntity", "item", 1, "id"));
        this.parserMap.put("propshop", new ParserEntity("game.PropShopEntity", "propshop", 2));
    };
    return MainParser;
})();
egret.registerClass(MainParser,'MainParser');
