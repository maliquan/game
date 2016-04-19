class BaseSoldier extends eui.Image{
    public constructor(){
        super();
        this.texture = this.getRes();
        this.width = 30;
        this.height = 30;
        this.anchorOffsetX = this.width*0.5;
        this.anchorOffsetY = this.height*0.5;
    }

    public getRes():any{
        var random:number = Math.random();
        var res:string = "";
        if(random<0.2){
            res = "role1";
        }else if(random<0.4){
            res = "role2";
        }else if(random<0.6){
            res = "role3";
        }else if(random<0.8){
            res = "role4";
        }else if(random<0.9){
            res = "role5";
        }else if(random<1){
            res = "role6";
        }
        return RES.getRes(res);
    }
}