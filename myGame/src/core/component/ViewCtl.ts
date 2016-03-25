class ViewCtl extends eui.Component {

    public postion:number = 5;
    public showData:any = {};
    public isCreate:boolean = false;
    public isComplete:boolean = false;

    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onLoadComplete,this);
    }

    /* 创建完毕调用，如果未提前加载模版，在onLoadComplete之前执行 */
    public createChildren():void{
        super.createChildren();
        this.isCreate = true;
        if(this.isComplete == true){
            this.onComplete();
            this.show();
        }
    }

    /* 加载完模版素材之后执行，创建之后只会调用一次*/
    private onLoadComplete():void{
        //当创建完成了，再设置，防止会被编辑器里面的默认值覆盖掉设置，虽然测试没问题
        this.isComplete = true;
        if(this.isCreate == true){
            this.onComplete();
            this.show();
        }
    }

    public onComplete():void{
        this.removeEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
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
    }

    public close():void{
        if(this.parent){
            this.parent.removeChild(this);
        }
    }

    /* 每次打开的时候会调用 */
    public show():void{
    }

}