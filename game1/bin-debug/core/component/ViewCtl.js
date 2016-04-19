var ViewCtl = (function (_super) {
    __extends(ViewCtl, _super);
    function ViewCtl() {
        _super.call(this);
        this.postion = 5;
        this.showData = {};
        this.isCreate = false;
        this.isComplete = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onLoadComplete, this);
    }
    var d = __define,c=ViewCtl,p=c.prototype;
    /* 创建完毕调用，如果未提前加载模版，在onLoadComplete之前执行 */
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.isCreate = true;
        if (this.isComplete == true) {
            this.onComplete();
            this.show();
        }
    };
    /* 加载完模版素材之后执行，创建之后只会调用一次*/
    p.onLoadComplete = function () {
        //当创建完成了，再设置，防止会被编辑器里面的默认值覆盖掉设置，虽然测试没问题
        this.isComplete = true;
        if (this.isCreate == true) {
            this.onComplete();
            this.show();
        }
    };
    p.onComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        //1 2 3
        //4 5 6
        //7 8 9
        switch (this.postion) {
            case 1:
                this.left = 0;
                this.top = 0;
                break;
            case 2:
                this.top = 0;
                this.horizontalCenter = 0;
                break;
            case 3:
                this.right = 0;
                this.top = 0;
                break;
            case 4:
                this.left = 0;
                this.verticalCenter = 0;
                break;
            case 5:
                this.horizontalCenter = 0;
                this.verticalCenter = 0;
                break;
            case 6:
                this.right = 0;
                this.verticalCenter = 0;
                break;
            case 7:
                this.left = 0;
                this.bottom = 0;
                break;
            case 8:
                this.bottom = 0;
                this.horizontalCenter = 0;
                break;
            case 9:
                this.right = 0;
                this.bottom = 0;
                break;
        }
    };
    p.close = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /* 每次打开的时候会调用 */
    p.show = function () {
    };
    return ViewCtl;
}(eui.Component));
egret.registerClass(ViewCtl,'ViewCtl');
