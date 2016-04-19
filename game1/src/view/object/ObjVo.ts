class ObjVo{

    /* image */
    public src:string = "";
    /* depth */
    public depth:number = 0;
    /* 当前数量 */
    public curNum:number = 5;
    /* 生产速度 单位：个／秒*/
    public makeSpeed:number = 1;
    /* 移动速度 */
    public moveSpeed:number = 1;
    /* 战斗力 */
    public strength:number = 1;
    /* 阵营 0是中立 1是自己*/
    public team:number = 0;
    /* 生产上限 */
    public maxNum:number = 100;
    /* x */
    public x:number = 0;
    /* y */
    public y:number = 0;
    /* w */
    public w:number = 0;
    /* h */
    public h:number = 0;
    /* 输出比例 0-1 */
    public outputP:number = 0.5;
    /* AI评估值 */
    public scoreArr:any[] = [];
    /* 多于这个值就派出 */
    public startNum:number = -1;

}