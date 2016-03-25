class MapGroup extends eui.Group{

    private _scrollV:number = 0;
    private _height:number = 0;
    private img:eui.Image;
    private img2:eui.Image;

    public constructor(){
        super();
        this.img = new eui.Image();
        this.addChild(this.img);
        this.img2 = new eui.Image();
        this.addChild(this.img2);
    }

    public set scrollV(scrollV:number){
        this._scrollV = scrollV;
    }

    public get scrollV():number{
        return this._scrollV;
    }

    public set height(height:number){
        this._height = height;
        this.img2.y = this.height;
    }

    public get height():number{
        return this._height;
    }
}