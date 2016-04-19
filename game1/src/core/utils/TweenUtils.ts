class TweenUtils {

    public static NONE:number = 0;
    public static LEFT_TO_RIGHT:number = 1;
    public static RIGHT_TO_LEFT:number = 2;
    public static TOP_TO_BOTTOM:number = 3;
    public static BOTTOM_TO_TOP:number = 4;



    /*界面出现效果，移动到目标位置反弹一下*/
    public static moveTweenShow(type:number, endX:number, endY:number, obj:any, callFun:Function, ower:any):void{
        var startX:number = endX;
        var startY:number = endY;

        switch (type){
            case TweenUtils.LEFT_TO_RIGHT:
                startX = -obj.width;
                break;
            case TweenUtils.RIGHT_TO_LEFT:
                startX = Global.STAGE_W;
                break;
            case TweenUtils.BOTTOM_TO_TOP:
                startY = Global.STAGE_H;
                break;
            case TweenUtils.TOP_TO_BOTTOM:
                startY = -obj.height;
                break;
            default:
                break;
        }

        if( startX == endX && startY == endY){//如果位置没变化
            if(callFun){
                callFun.call(ower);
            }
        }

        obj.x = startX;
        obj.y = startY;
        var moveX:number = startX==endX ? 0 : 60;
        var moveY:number = startY==endY ? 0 : 60;
        egret.Tween.get(obj)
            .to({x:endX + moveX, y:endY + moveY}, 200)
            .to({x:endX - moveX/2, y:endY - moveY/2}, 100)
            .to({x:endX, y:endY}, 100)
            .call(function():void{
                if(callFun){
                    callFun.call(ower)
                }
            }, this);
    }

    /*界面出现效果，移动到目标位置反弹一下*/
    public static moveTweenHide(type:number,windowName:string, obj:any,callFun:Function=null,ower:any=null):void{
        var endX:number = obj.x;
        var endY:number = obj.y;

        switch (type){
            case TweenUtils.LEFT_TO_RIGHT:
                endX = Global.STAGE_W;
                break;
            case TweenUtils.RIGHT_TO_LEFT:
                endX = -obj.width;
                break;
            case TweenUtils.BOTTOM_TO_TOP:
                endY = -obj.height;
                break;
            case TweenUtils.TOP_TO_BOTTOM:
                endY = Global.STAGE_H;
                break;
            default:
                break;
        }

        egret.Tween.get(obj)
            .to({x:endX, y:endY}, 200, egret.Ease.backIn)
            .call(function():void{
                if(callFun){
                    callFun.call(ower)
                }else{
                    PopUpMag.ins().remove(windowName);
                }
            }, this);
    }

}