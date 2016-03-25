class BaseAI {
    
    private objList: BaseObj[] = [];
    private mag:ChapterMag;
    
    /* obj 控制对象  level AI等级 */
    public constructor(mag:ChapterMag, level:number){
        this.objList = mag.objList;
        this.mag = mag;
        this.initAI();
    }
    
    private initAI():void{
        TimerMag.instance.add(this.run, this, 2000);
    }

    public stop():void{
        TimerMag.instance.remove(this);
    }

    private  run():void{
        var i: number = 0;
        var list: BaseObj[] = this.objList;
        var len: number = this.objList.length;
        for(i = 0;i < len;i++) {
            var obj: BaseObj = list[i];
            var vo: ObjVo = obj.vo;
            if(vo.team == 0 || vo.team==1){
                continue;
            }
            //计算评估值（距离，生产速度，当前值）
            vo.scoreArr = [];
            for(var j=0; j<len; j++){
                var defObj:BaseObj = this.objList[j];
                //todo 暂时只计算地方阵营的，类型，强度，支援等情况忽略
                if(vo.team != defObj.vo.team){
                    var time:number = obj.getTime(defObj.x, defObj.y) / 1000;
                    //距离分数 距离*生产速度*6  x6是因为距离不优先考虑的延后系数
                    var timeScore:number = time*defObj.vo.makeSpeed*6;
                    //当前值分数
                    var curScore:number = defObj.vo.curNum;
                    //中立的分数值减半，优先中立
                    if(vo.team == 0){
                        curScore = 0;
                    }
                    //总分数
                    var totalScore:number = timeScore + curScore;
                    vo.scoreArr.push({obj:defObj,score:totalScore});
                }
            }
            //按分值排序
            vo.scoreArr.sort(function(a:any,b:any):number{
                if(a.score > b.score){
                    return 1;
                }
            });
            console.log("+++");
            if(vo.startNum == -1){
                vo.startNum  = this.getStartNum();
                vo.outputP = Math.random()<0.5 ? 0.4 : 0.8;
                console.log(vo.depth + " 评估完成 " + vo.startNum);
            }
            if(vo.scoreArr[0] && vo.curNum > vo.startNum && vo.team != 0 && vo.team != 1){
                this.mag.startMove(obj, vo.scoreArr[0].obj);
                vo.startNum = -1;
            }
        }
    }

    /** 起始出兵（大于多少兵就派出）*/
    public getStartNum():number{
        var num:number = 0;
        var random:number = Math.random();
        if(random < 0.05){
            //5%
            num = 2;
        }else if(random < 0.1){
            //5%
            num = 40;
        }else if(random < 0.2){
            //10%
            num = 10;
        }else if(random < 0.4){
            //20%
            num = 15;
        }else if(random < 0.6){
            //20%
            num = 30;
        }else{
            //40%
            num = 20;
        }
        return num;
    }
    
}
