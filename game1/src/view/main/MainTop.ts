class MainTop extends eui.Component {

    private foodBtn:MainBtn;
    private goldBtn:MainBtn;
    private diamondBtn:MainBtn;

    public constructor(){
        super();
    }

    public init():void{
        this.foodBtn.iconImg.texture = RES.getRes("food_btn");
        this.goldBtn.iconImg.texture = RES.getRes("gold_btn");
        this.diamondBtn.iconImg.texture = RES.getRes("diamond_btn");
    }

    public show():void{
        var userInfo:UserInfo = UserInfo.ins;
        this.foodBtn.lab.text = userInfo.foodNum + "";
        this.goldBtn.lab.text = userInfo.goldNum + "";
        this.diamondBtn.lab.text = userInfo.diamondNum + "";
    }

}