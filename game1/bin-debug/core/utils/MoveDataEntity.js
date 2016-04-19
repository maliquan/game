var MoveDataEntity = (function () {
    function MoveDataEntity(distance, direction, scale, speed, speedX, speedY, angle) {
        this.distance = distance;
        this.direction = direction;
        this.scale = scale;
        this.speed = speed;
        this.speedX = speedX;
        this.speedY = speedY;
        this.angle = angle;
    }
    var d = __define,c=MoveDataEntity,p=c.prototype;
    /**
     * 是否移动
     */
    p.isMove = function () {
        this.distance -= this.speed;
        if (this.distance > 0) {
            return true;
        }
        return false;
    };
    return MoveDataEntity;
}());
egret.registerClass(MoveDataEntity,'MoveDataEntity');
