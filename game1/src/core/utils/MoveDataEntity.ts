class MoveDataEntity {
    //距离
    distance:number;
    //方向
    direction:number;
    //镜像
    scale:number;
    //速度
    speed:number;
    //X速度
    speedX:number;
    //Y速度
    speedY:number;
    //角度
    angle:number;

    constructor(distance:number, direction:number, scale:number, speed:number, speedX:number, speedY:number, angle:number) {
        this.distance = distance;
        this.direction = direction;
        this.scale = scale;
        this.speed = speed;
        this.speedX = speedX;
        this.speedY = speedY;
        this.angle = angle;
    }

    /**
     * 是否移动
     */
    isMove():boolean {
        this.distance -= this.speed;
        if (this.distance > 0) {
            return true;
        }
        return false;
    }
}