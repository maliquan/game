var ParserEntity = (function () {
    function ParserEntity(parserCls, fileName, saveType, dataKey) {
        if (dataKey === void 0) { dataKey = ""; }
        this.parserCls = parserCls;
        this.fileName = fileName;
        this.saveType = saveType;
        this.dataKey = dataKey;
    }
    var d = __define,c=ParserEntity,p=c.prototype;
    return ParserEntity;
})();
egret.registerClass(ParserEntity,'ParserEntity');
