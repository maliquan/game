class GameUtils {

    /**
     * 方形 根据网格坐标取得象素坐标
     * @param tx 网格坐标x
     * @param ty 网格坐标x
     * @param tileWidth tile的象素宽
     * @param tileHeight tile的象素高
     * @return 象素坐标的点
     */
    public static rectGridToPixel(tx:number, ty:number, tileWidth:number, tileHeight:number):egret.Point {
        var xPixel:number = tx * tileWidth;
        var yPixel:number = ty * tileHeight;
        return new egret.Point(xPixel, yPixel);
    }

    /**
     * 方形 根据屏幕象素坐标取得网格的坐标
     * @param px 象素坐标x
     * @param py 象素坐标y
     * @param tileWidth tile的象素宽
     * @param tileHeight tile的象素高
     * @return 网格坐标的点
     */
    public static rectPixelToGrid(px:number, py:number, tileWidth:number, tileHeight:number):egret.Point {
        var xtile:number = Math.floor(px / tileWidth);
        var ytile:number = Math.floor(py / tileHeight);
        return new egret.Point(xtile, ytile);
    }

    /**
     * 获得移动数据
     * @param p1 起点坐标
     * @param p2 终点坐标
     * @param speed 运动速度
     * @param dirNum 方向数量
     * @return
     */
    static getMoveData(p1:egret.Point, p2:egret.Point, speed:number = 0, dirNum:number = 8):MoveDataEntity {
        var radians:number, angle:number, speedX:number, speedY:number;
        var distance:number, scale:number;
        var px:number = p1.x - p2.x;
        var py:number = p1.y - p2.y;
        distance = Math.sqrt(px * px + py * py);
        radians = Math.atan2(py, px);
        if (speed != 0) {
            speedX = speed * Math.cos(radians);
            speedY = speed * Math.sin(radians);
        }
        //弧度转角度
        angle = radians * 180 / Math.PI;
        var direction:number = Math.round(angle / (360 / dirNum));
        if (direction < 0) {
            direction = Math.abs(direction + dirNum);
        }
        return new MoveDataEntity(distance, direction, scale, speed, speedX, speedY, angle);
    }

    /**
     * 获得角度
     * @param p1
     * @param p2
     * @returns {number}
     */
    static getAngle(x0:number, y0:number, x1:number, y1:number):number {
        var radians = Math.atan2(y0 - y1, x0 - x1);
        return radians * 180 / Math.PI;
    }

    /**
     * 获得HTML
     * @param str 字符串
     * @param color 颜色
     * @param size 字体大小
     * @param leading 行间距
     * @param underline 是否有链接
     */
    static getHtml(str:string, color:number, size:number = 12, leading:number = 0, underline:boolean = false):string {
        var ret:string = str;
        if (underline) {
            ret = "<u>" + str + "</u>";
        }
        ret = "<font color='#" + color.toString(16) + "' size='" + size.toString() + "'>" + ret + "</font>";
        if (leading > 0) {
            ret = "<textformat leading='" + leading.toString() + "'>" + ret + "</textformat>";
        }
        return ret;
    }

    /**
     * 转换时间
     * @param time 时间(秒)
     * @param type 0(时分秒)  1(06:59:59)
     */
    static convertTime(time:number, type:number = 1, showAll:boolean = true):string {
        var day:number = Math.floor(time / 86400);
        var $day:number = day * 86400;
        var hour:number = Math.floor((time - $day) / 3600);
        var $hour:number = hour * 3600;
        var min:number = Math.floor((time - $day - $hour) / 60);
        var $min:number = min * 60;
        var sen:number = time - $day - $hour - $min;
        var str:string = "";
        if (type == 0) {
            if (day > 0) {
                str += day.toString() + LangMag.instance.getText("@Day");
            }
            if (hour > 0) {
                str += hour.toString() + LangMag.instance.getText("@Hour");
            } else {
                if (day > 0) {
                    str += "0" + LangMag.instance.getText("@Hour");
                }
            }
            if (min > 0) {
                str += min.toString() + LangMag.instance.getText("@Minute");
            } else {
                if (day > 0 || hour > 0) {
                    str += "0" + LangMag.instance.getText("@Minute");
                }
            }
            if (sen > 0) {
                str += sen.toString() + LangMag.instance.getText("@Second");
            } else {
                if (day > 0 || hour > 0 || min > 0) {
                    str += "0" + LangMag.instance.getText("@Second");
                }
            }
        }
        else if (type == 1) {
            hour += day * 24;
            if (hour > 0) {
                if (hour < 10) {
                    str += "0";
                }
                str += hour.toString() + ":";
            }
            else {
                if (showAll) str += "00:";
            }
            if (min > 0) {
                if (min < 10) {
                    str += "0";
                }
                str += min.toString() + ":";
            }
            else {
                str += "00:";
            }
            if (sen > 0) {
                if (sen < 10) {
                    str += "0";
                }
                str += sen.toString();
            }
            else {
                str += "00";
            }
        }
        return str;
    }

    /**
     * 替换字符串
     * @param str 字符串
     * @param p 替换字符
     * @param repl 替换成的字符串
     */
    static replace(str:string, p:string, repl:string = ""):string {
        var index:number;
        while (1) {
            index = str.indexOf(p);
            if (index > -1) {
                if (p == "\n") {
                    str = str.replace(/\n/, repl);
                }
                else {
                    str = str.replace(p, repl);
                }
                continue;
            }
            break;
        }
        return str;
    }

    /**
     * 替换通配符为值
     * @param content 内容
     * @param params 参数列表
     */
    static replaceContent(content:string, params:any[]):string {
        var len:number = params.length;
        if (len > 0) {
            var index:number = 1;
            while (index <= len) {
                content = content.replace("#v" + index + "#", params[index - 1].toString());
                index++;
            }
        }
        return content;
    }

    /**
     * 替换数组内容的通配符为值(彩色字,日志专用)
     * @param contents
     * @param params
     */
    static replaceContents(contents:any[], params:any[]):any[] {
        var reContents:any[] = [];
        var len:number = contents.length;
        var j:number = 0;
        var repl:string;
        var temp:any;
        for (var i = 0; i < len; i++) {
            temp = {text: contents[i].text};
            if (contents[i].hasOwnProperty("style")) {
                temp.style = contents[i].style;
            }
            reContents.push(temp);
            repl = "#v" + (j + 1).toString() + "#";
            while (temp.text.indexOf(repl) > -1) {
                temp.text = temp.text.replace(repl, params[j].toString());
                j++;
                repl = "#v" + (j + 1).toString() + "#";
            }
        }
        return reContents;
    }

    /**
     * 创建文本框
     * @param text
     * @param width
     * @param height
     * @param color
     * @param size
     * @param isBold
     * @param align
     * @param isInput
     * @returns {egret.TextField}
     */
    static createTextField(text:string = "", width:number = 0, height:number = 0, color:number = 0xffffff, size:number = 26, isBold:boolean = false, align:string = egret.HorizontalAlign.LEFT, isInput:boolean = false):egret.TextField {
        var textField:egret.TextField = new egret.TextField();
        textField.text = text;
        textField.type = isInput ? egret.TextFieldType.INPUT : egret.TextFieldType.DYNAMIC;
        textField.touchEnabled = isInput;
        if (width) {
            textField.width = width;
        }
        if (height) {
            textField.height = height;
        }
        textField.size = size;
        textField.textAlign = align;
        textField.textColor = color;
        textField.bold = isBold;
        return textField;
    }

    /**
     * 将数字转换成固定格式的字符串
     * @param num 当前数字
     * @param figuresCountAfterPoint 小数点后保留的个数，为0时不保留小数点
     * @returns {string} 22将转换成22.0 1.2345 将转化成1.2
     */
    static numberToString(num:number, figuresCountAfterPoint:number = 1):string {
        var numStr:string;
        num = Math.floor(num * Math.pow(10, figuresCountAfterPoint)) / Math.pow(10, figuresCountAfterPoint);
        numStr = num.toString();
        if (numStr.indexOf(".") == -1) {
            numStr += ".";
            for (var i:number = 0; i < figuresCountAfterPoint; i++) {
                numStr += "0";
            }
        }
        return numStr;
    }

    /**
     * 设置对象的锚点
     */
    static setAnchor(obj:any, x:number, y:number):void{
        obj.anchorOffsetX = obj.width*x;
        obj.anchorOffsetY = obj.height*y;
        obj.x += obj.width*x;
        obj.y += obj.height*y;
    }

    /**
     * 对象转URL参数
     * @param data
     */
    static objectToUrlParam(data:any):string {
        var retStr:string = "";
        for (var key in data) {
            var value = data[key];
            if (value != null && value != undefined) {
                if (value.constructor == Array || value.constructor == Object) {
                    retStr += encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(value)) + "&";
                } else {
                    retStr += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
                }
            } else {
                retStr += encodeURIComponent(key) + "=&";
            }
        }
        if (retStr.length > 0) {
            retStr = retStr.substring(0, retStr.length - 1);
        }
        return retStr;
    }

    /**
     * 获得Qzone头像
     * @param url
     * @param size 目前只支持50,100
     */
    static getQzoneHead(url:string, size:string = "50"):string {
        url = url.substring(0, url.lastIndexOf("/"));
        return url + "/" + size;
    }
}