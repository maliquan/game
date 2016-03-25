class SoundMag {
    private static _instance:SoundMag;

    private _isPlayBg:boolean = true;
    public isPlayEffect:boolean = true;

    private bgSound:egret.Sound;
    private bgChannel:egret.SoundChannel;
    private bgPosition:number = 0;

    constructor() {
    }

    static get instance():SoundMag {
        if (!this._instance) {
            this._instance = new SoundMag();
        }
        return this._instance;
    }

    public set isPlayBg(boo:boolean){
        this._isPlayBg = boo;
        if(this._isPlayBg){
            this.bgChannel = this.bgSound.play(this.bgPosition, 0);
        }else{
            this.stopBg();
        }
    }

    public get isPlayBg():boolean{
        return this.isPlayBg;
    }

    public playBg(soundName:string):void{
        if(this._isPlayBg == false){
            return;
        }
        this.bgSound = RES.getRes(soundName);
        this.bgChannel = this.bgSound.play(0,0);
    }

    public stopBg():void{
        this.bgPosition = this.bgChannel.position;
        this.bgChannel.stop();
    }

    public play(soundName:string, volume:number=1, playNum:number=1, callFun:Function=null, thisObj:any=null):void{
        if(this.isPlayEffect == false){
            return;
        }
        var sound:egret.Sound = RES.getRes(soundName);
        var channel:egret.SoundChannel = sound.play(0,playNum);
        channel.volume = volume;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, function soundComplete(event:egret.Event) {
            if(callFun){
                callFun.call(thisObj);
            }
        }, this);
    }

}