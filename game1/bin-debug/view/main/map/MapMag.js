var MapMag = (function () {
    function MapMag() {
        this.totalMapH = 0; //地图总高度
        this.oldStartY = 0; //之前的起始点
        this.mapDataList = []; //地图数据
        this._cacheItemVoList = []; //缓存数据数组
        this.itemVoList = []; //所有的显示物体
        this._depthList = []; //每个对象都有唯一的层级，保存当前显示的物体的层级
    }
    var d = __define,c=MapMag,p=c.prototype;
    d(MapMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new MapMag();
            }
            return this._instance;
        }
    );
    p.init = function (scene) {
        if (!this.scroller) {
            this.group = new MapGroup();
            this.scroller = new eui.Scroller();
            this.scroller.width = Global.STAGE_W;
            this.scroller.height = Global.STAGE_H;
            this.scroller.viewport = this.group;
            this.scroller.bounces = true; //拖到头不可以继续拖
            this.scroller.addEventListener(egret.Event.CHANGE, this.updata, this);
            this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF; //不可以横向滚动
            scene.addChildAt(this.scroller, 1);
            this.scroller.verticalScrollBar.autoVisibility = false; //不显示竖着的滚动条
            this.scroller.verticalScrollBar.visible = false;
            ParserMap.instance.loadConfig();
        }
        this.initMap();
    };
    p.initMap = function () {
        this.group.height = this.totalMapH;
        this.curChapterVo = this.getItemVoById(UserInfo.ins.curChapterId);
        this.oldStartY = this.findStartY();
        this.group.scrollV = this.oldStartY + 1.2;
        this.updata(null);
    };
    p.findStartY = function () {
        var startY = this.curChapterVo.y - Global.STAGE_H * 0.5;
        startY = Math.min(startY, this.totalMapH - Global.STAGE_H);
        startY = Math.max(startY, 0);
        return startY;
    };
    p.updata = function (e) {
        var newStartY = this.group.scrollV;
        //防止频繁刷新，2个像素以上移动再刷新
        if (Math.abs(newStartY - this.oldStartY) > 1) {
            this.oldStartY = newStartY;
            this.addRender(this.getParserMapVo(newStartY));
            this.sortY();
        }
    };
    /* 要添加的数据列表，当前的起始y坐标 */
    p.addRender = function (renderDataList) {
        var len = renderDataList.length;
        var curChapterId = UserInfo.ins.curChapterId;
        var chapterList = UserInfo.ins.chapterDataList;
        for (var i = 0; i < len; i++) {
            var itemVo = this.popItemVo();
            itemVo.vo = renderDataList[i];
            var vo = itemVo.vo;
            if (vo.dataId > 0) {
                itemVo.createMapBtn(this.group, curChapterId, chapterList);
            }
            else if (vo.dataId == -1) {
                itemVo.createBit(this.group);
            }
            this.itemVoList.push(itemVo);
        }
    };
    /* 根据起始点找到需要添加的物体的数据 */
    p.getParserMapVo = function (startY) {
        var voList = [];
        var list = this.mapDataList;
        var len = list.length;
        var bottomY = startY + Global.STAGE_H;
        //找到所有底部出现在屏幕范围内的物体
        for (var i = 0; i < len; i++) {
            var vo = list[i];
            if (vo.bottom >= startY && vo.y <= bottomY) {
                //如果没在当前的显示列表里，添加
                if (this._depthList.indexOf(vo.depth) == -1) {
                    //未打过的关卡不显示连接线
                    if (vo.dataId == -1 && vo.bottom < this.curChapterVo.bottom) {
                        continue;
                    }
                    voList.push(vo);
                }
            }
        }
        return voList;
    };
    /* 删除超过容器范围的物体，按深度排序下，从新加载一遍好更新层级 */
    p.sortY = function () {
        this._depthList = [];
        var len = this.itemVoList.length;
        var bottomY = this.oldStartY + Global.STAGE_H;
        for (var i = 0; i < len; i++) {
            //todo 目前暂时用不到排序，因为只有按钮和连线，每次按钮都从新加载，不存在遮挡问题
            //            //按深度排序
            //            for (var j:number = i + 1; j < len; j++) {
            //                var curVo:ItemVo = this.itemVoList[i];
            //                var nextVo:ItemVo = this.itemVoList[j];
            //                if (curVo && nextVo && curVo.vo.depth < nextVo.vo.depth) {
            //                    this.itemVoList[i] = nextVo;
            //                    this.itemVoList[j] = curVo;
            //                }
            //            }
            //排序出来一个，加载一个
            var itemVo = this.itemVoList[i];
            var isRemove = itemVo.move(this.group, this.oldStartY, bottomY);
            if (isRemove) {
                this.itemVoList.splice(i, 1);
                this.pushItemVo(itemVo);
                i--;
                len--;
                continue;
            }
            this._depthList.push(itemVo.vo.depth);
        }
    };
    /* 根据关卡id更新关卡 */
    p.updataBtnId = function (id) {
        var len = this.itemVoList.length;
        for (var i = 0; i < len; i++) {
            if (this.itemVoList[i].vo.dataId == id) {
                this.itemVoList[i].mapBtn.setId(id, UserInfo.ins.chapterDataList);
                return;
            }
        }
    };
    /* 根据id找到对应的按钮数据 */
    p.getItemVoById = function (id) {
        var voList = this.mapDataList;
        var len = voList.length;
        for (var i = 0; i < len; i++) {
            if (voList[i].dataId == id) {
                return voList[i];
            }
        }
        return null;
    };
    /* 收到一个ItemVo，存起来 */
    p.pushItemVo = function (itemVo) {
        this._cacheItemVoList.push(itemVo);
    };
    /* 产出一个ItemVo，如果没有new */
    p.popItemVo = function () {
        if (this._cacheItemVoList.length > 0) {
            return this._cacheItemVoList.pop();
        }
        else {
            console.log("new itemvo");
            return new ItemVo();
        }
    };
    MapMag.TYPE_LINE = -1;
    return MapMag;
}());
egret.registerClass(MapMag,'MapMag');
