class PopUpMag {
	public constructor() {
	}
	
    private static _ins: PopUpMag;
    public static ins(): PopUpMag{
	    if(this._ins == null){
            this._ins = new PopUpMag();
	    }
	    return this._ins;
	}

	/**
	 * 最上边，弹出面板层
	 */
    public static LAYER_POPUP: eui.UILayer;

    /**
     * 中间UI层
     */
    public static LAYER_UI: eui.UILayer;
    /**
     * 下边场景层
     */
    public static LAYER_SCENE: eui.UILayer;
    private popUpMap:Object = {};
    private bkg:egret.Shape;
    private bkgWinName:string = "";
    private curOpenWin:string[] = [];

    
    /**
     * 
     * @param winName
     * @param layer
     * @param bkgAlpha
     * @param postion
     *
     * postion
     * 1 2 3
     * 4 5 6
     * 7 8 9
     */
    public showWin(winName:string, postion:number=5, isBlack:boolean=false, param:any=null,
                   layer:eui.UILayer=PopUpMag.LAYER_POPUP){
        var view:ViewCtl = this.popUpMap[winName];
        var isFirstCreate:boolean = false;//是否是第一次创建
        if(view == null){
            var cls:any = egret.getDefinitionByName(winName);
            this.popUpMap[winName] = new cls();
            isFirstCreate = true;
        }
        view = this.popUpMap[winName];
        view.postion = postion;
        view.showData = param;
        view.name = winName;
        this.curOpenWin.push(view.name);
        this.setbkg(isBlack, view);
        layer.addChild(view);
        //第一次创建不调用show，因为自动调用了，避免为创建完成就调用show
        if(!isFirstCreate){
            this.popUpMap[winName].show();
        }
    }

    private setbkg(isBlack:boolean, view:ViewCtl=null):void{
        if(!this.bkg){
            this.bkg = new egret.Shape();
            this.bkg.graphics.beginFill(0x000000, 0.8);
            this.bkg.graphics.drawRect(0,0,Global.STAGE_W,Global.STAGE_H);
            this.bkg.graphics.endFill();
            PopUpMag.LAYER_POPUP.addChildAt(this.bkg,0);
        }
        this.bkg.touchEnabled = isBlack;
        this.bkg.visible = isBlack;
        this.bkgWinName = view ? view.name : "";
    }

    public remove(winName:string):void{
        var idx:number = this.curOpenWin.indexOf(winName);
        if(idx != -1){
            this.curOpenWin.splice(idx, 1);
        }
        if(this.bkgWinName == winName){
            this.setbkg(false);
        }
        if(this.popUpMap[winName]!=null){
            var view:ViewCtl = this.popUpMap[winName];
            view.close();
        }
    }

    public removeAll():void{
        this.setbkg(false);
        var len:number = this.curOpenWin.length;
        for(var i:number=0; i<len; i++){
            var view:ViewCtl = this.popUpMap[this.curOpenWin[i]];
            this.remove(view.name);
            i--;
            len--;
        }
    }


	
}
