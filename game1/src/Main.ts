class Main extends eui.UILayer implements IMessage{
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    public createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
//        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
//        var theme = new eui.Theme("resource/default.thm.json", this.stage);
//        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
//    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
//    private onThemeLoadComplete(): void {
//        this.isThemeLoadEnd = true;
//        this.createScene();
//    }
//    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
//            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        var that = this;
//        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
        nest.core.startup({ egretAppId: 90102, version:2, debug:true}, function (){
            that.initGame();
        });
//        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 初始化游戏
     * Create scene interface
     */
    public initGame(): void {
        Global.STAGE = this.stage;
        Global.STAGE_W = this.stage.stageWidth;
        Global.STAGE_H = this.stage.stageHeight;

        PopUpMag.LAYER_SCENE = new eui.UILayer();
        PopUpMag.LAYER_SCENE.name = "sceneLayer";
        PopUpMag.LAYER_SCENE.touchEnabled = false;
        PopUpMag.LAYER_SCENE.touchChildren = true;
        this.addChild(PopUpMag.LAYER_SCENE);

        PopUpMag.LAYER_UI = new eui.UILayer();
        PopUpMag.LAYER_UI.name = "uiLayer";
        PopUpMag.LAYER_UI.touchEnabled = false;
        PopUpMag.LAYER_UI.touchChildren = true;
        this.addChild(PopUpMag.LAYER_UI);

        PopUpMag.LAYER_POPUP = new eui.UILayer();
        PopUpMag.LAYER_POPUP.name = "popUpLayer";
        PopUpMag.LAYER_POPUP.touchEnabled = false;
        PopUpMag.LAYER_POPUP.touchChildren = true;
        this.addChild(PopUpMag.LAYER_POPUP);

//        Message.instance.add(LocalId.SOCKET_CONNECT_SUCCESS, this);
        DataMag.instance.init();
        LangMag.instance.setData("language");
//        SocketMsg.instance.initSocket();
        PopUpMag.ins().showWin(WinName.LOGIN, 1, false, null, PopUpMag.LAYER_SCENE);
    }

    recvMsg(cmd:number, data:any):void {
        switch (cmd){
            case LocalId.SOCKET_CONNECT_SUCCESS:
                Message.instance.remove(LocalId.SOCKET_CONNECT_SUCCESS, this);
                console.log("WebSocketOpen");
                break;
        }
    }
    
}
