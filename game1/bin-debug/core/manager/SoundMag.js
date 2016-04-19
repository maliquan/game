var SoundMag = (function () {
    function SoundMag() {
        this._isPlayBg = true;
        this.isPlayEffect = true;
        this.bgPosition = 0;
    }
    var d = __define,c=SoundMag,p=c.prototype;
    d(SoundMag, "instance"
        ,function () {
            if (!this._instance) {
                this._instance = new SoundMag();
            }
            return this._instance;
        }
    );
    d(p, "isPlayBg"
        ,function () {
            return this.isPlayBg;
        }
        ,function (boo) {
            this._isPlayBg = boo;
            if (this._isPlayBg) {
                this.bgChannel = this.bgSound.play(this.bgPosition, 0);
            }
            else {
                this.stopBg();
            }
        }
    );
    p.playBg = function (soundName) {
        if (this._isPlayBg == false) {
            return;
        }
        this.bgSound = RES.getRes(soundName);
        this.bgChannel = this.bgSound.play(0, 0);
    };
    p.stopBg = function () {
        this.bgPosition = this.bgChannel.position;
        this.bgChannel.stop();
    };
    p.play = function (soundName, volume, playNum, callFun, thisObj) {
        if (volume === void 0) { volume = 1; }
        if (playNum === void 0) { playNum = 1; }
        if (callFun === void 0) { callFun = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (this.isPlayEffect == false) {
            return;
        }
        var sound = RES.getRes(soundName);
        var channel = sound.play(0, playNum);
        channel.volume = volume;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, function soundComplete(event) {
            if (callFun) {
                callFun.call(thisObj);
            }
        }, this);
    };
    return SoundMag;
}());
egret.registerClass(SoundMag,'SoundMag');
