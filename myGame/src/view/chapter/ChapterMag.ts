class ChapterMag{

    /* 单位移动距离 */
    public static MOVE_NUM:number = 200;

    private scene:ViewCtl;
    public objList:BaseObj[] = [];
    private curTouchObj:BaseObj;
    private drawSp:egret.Sprite;
    private ai: BaseAI;
    private teamList: number[] = [];
    private teamNum: number = 1;//阵营数量
    private soldierList:BaseSoldier[] = [];//所有士兵存储，用来删除

    public constructor(){
        this.drawSp = new egret.Sprite();
    }

    public show(chapterId:number, scene:ViewCtl):void{
        this.scene = scene;
        this.scene.addChild(this.drawSp);
        this.parseCfgById(chapterId);
        this.scene.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.clkHandler,this);
    }

    private clkHandler(e:egret.TouchEvent):void{
        switch (e.type){
            case egret.TouchEvent.TOUCH_BEGIN:
                //选中的是物体，并且是自己的,数量在2个以上
                if(e.target instanceof BaseObj && e.target.vo.team==1 && e.target.vo.curNum>1){
                    this.curTouchObj = e.target;
                    this.scene.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.clkHandler,this);
                    this.scene.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.clkHandler,this);
                    this.scene.addEventListener(egret.TouchEvent.TOUCH_END,this.clkHandler,this);
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.drawLine(e);
                break;
            case egret.TouchEvent.TOUCH_END:
                if(e.target instanceof BaseObj && e.target != this.curTouchObj){
                    this.startMove(this.curTouchObj, e.target);
                }
                this.drawSp.graphics.clear();
                this.scene.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.clkHandler,this);
                this.scene.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.clkHandler,this);
                this.scene.removeEventListener(egret.TouchEvent.TOUCH_END,this.clkHandler,this);
                break;
        }
    }

    public startMove(obj1:BaseObj, obj2:BaseObj):void{
        var soldier:BaseSoldier = new BaseSoldier();
        this.scene.addChild(soldier);
        soldier.x = obj1.x;
        soldier.y = obj1.y;
        this.soldierList.push(soldier);


        var that = this;
        var outputNum:number = obj1.vo.curNum * obj1.vo.outputP;
        if(outputNum<1){
            return;
        }
        outputNum = outputNum>>0;
        obj1.vo.curNum -= outputNum;//输出方先扣除
        obj1.updataNum();
        var moveTime:number = obj1.getTime(obj2.x, obj2.y);
        egret.Tween.get(soldier)
            .to({x:obj2.x, y:obj2.y}, moveTime)
            .call(this.stopMove, this, [obj1.vo.team, obj1.vo.outputP, obj2, outputNum, soldier])//开始移动
    }

    /* 第一个参数不用进攻方整体数据是因为，在这之前可能被占领了，阵营变更，所以用个变量 */
    private stopMove(attackTeam:number, outputP:number, obj2:BaseObj, outputNum:number, moveObj:any):void{
        if(attackTeam == obj2.vo.team){
            //己方支援
            obj2.vo.curNum += outputNum;
        }else{
            //敌方战斗
            var lastNum:number = obj2.vo.curNum - outputNum;
            if(lastNum >= 0){
                //攻打失败
                obj2.vo.curNum = lastNum;
            }else{
                //成功占领
                obj2.vo.curNum = -1*lastNum;
                obj2.setTeam(attackTeam, outputP);
            }
        }
        obj2.updataNum();
        moveObj.parent.removeChild(moveObj);
        this.checkTeam();
    }

    /* 检查分组 */
    private checkTeam():void{
        this.teamList = [];
        var i: number = 0;
        var list: BaseObj[] = this.objList;
        var len: number = this.objList.length;
        for(i = 0;i < len;i++) {
            var obj: BaseObj = list[i];
            var vo: ObjVo = obj.vo;
            //存放所有的阵营，中立不算
            if(this.teamList.indexOf(vo.team)==-1 && vo.team!=0){
                this.teamList.push(vo.team);
            }
        }
        this.teamNum = this.teamList.length;//不直接用.length是因为，数组是按阵营当的索引，前边的为空，但是长度是阵营

        //如果只剩下一个阵营了，判断胜利失败
        if(this.teamNum <= 1){
            var result:any = {};
            if(this.teamList[0] == 1){
                result = {isWin:true};
            }else{
                result = {isWin:false};
            }
            this.ai.stop();
            this.clean();
            Message.instance.send(MsgId.CHAPTER_OVER, result);
            return;
        }
    }

    public setAllObj(isPlay:boolean):void{
        var list: BaseObj[] = this.objList;
        var len: number = this.objList.length;
        for(var i:number = 0;i < len;i++) {
            var obj: BaseObj = list[i];
            if(isPlay){
                obj.startMake();
            }else{
                obj.stopMake();
            }
        }
    }

    private clean():void{
        //清除所有士兵
        var len:number = this.soldierList.length;
        for(var i:number=0; i<len; i++){
            var solider:BaseSoldier = this.soldierList[i];
            egret.Tween.removeTweens(solider);
            if(solider.parent){
                solider.parent.removeChild(solider);
            }
        }
        //清除画板
        this.drawSp.graphics.clear();
        //清除事件
        if(this.scene.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)){
            this.scene.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.clkHandler,this);
        }
        if(this.scene.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
            this.scene.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.clkHandler,this);
        }
        if(this.scene.hasEventListener(egret.TouchEvent.TOUCH_END)){
            this.scene.removeEventListener(egret.TouchEvent.TOUCH_END,this.clkHandler,this);
        }
        //清除所有细胞
        var list: BaseObj[] = this.objList;
        var len: number = this.objList.length;
        for(var i:number = 0;i < len;i++) {
            var obj: BaseObj = list[i];
            this.scene.removeChild(obj);
            obj.clean();
        }
    }

    private drawLine(e:egret.TouchEvent):void{
        this.drawSp.graphics.clear();
        this.drawSp.graphics.lineStyle( 10, 0xffffff, 0.6 );
        this.drawSp.graphics.moveTo(this.curTouchObj.x, this.curTouchObj.y);
        var endP:egret.Point = this.scene.globalToLocal(e.stageX,e.stageY);
        this.drawSp.graphics.lineTo(endP.x, endP.y);
    }

    /* 解析配置 */
    private parseCfgById(chapterId:number):void{
        var mapCfg:any[] = RES.getRes("map" + chapterId).list;
        var len:number = mapCfg.length;
        for(var i:number=0; i<len; i++){
            var vo:ObjVo = new ObjVo();
            vo.src = mapCfg[i].src;
            vo.depth = parseFloat(mapCfg[i].depth);
            vo.curNum = parseFloat(mapCfg[i].curNum);
            vo.makeSpeed = parseFloat(mapCfg[i].makeSpeed);
            vo.moveSpeed = parseFloat(mapCfg[i].moveSpeed);
            vo.strength = parseFloat(mapCfg[i].strength);
            vo.team = parseFloat(mapCfg[i].team);
            vo.maxNum = parseFloat(mapCfg[i].maxNum);
            vo.x = parseFloat(mapCfg[i].x);
            vo.y = parseFloat(mapCfg[i].y);
            vo.w = parseFloat(mapCfg[i].w);
            vo.h = parseFloat(mapCfg[i].h);
            //类首字母要大写
            var clsName:string = vo.src.replace(/(\w)/,function(v){return v.toUpperCase()});
            var cls:any = egret.getDefinitionByName(clsName);
            this.objList[i] = new cls(vo);
            this.scene.addChild(this.objList[i]);
        }
        this.parseComplete();
    }
    
    private parseComplete():void{
        this.ai = new BaseAI(this, 1);
    }


}