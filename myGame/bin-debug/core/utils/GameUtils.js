var GameUtils = (function () {
    function GameUtils() {
    }
    var d = __define,c=GameUtils,p=c.prototype;
    /**
     * 方形 根据网格坐标取得象素坐标
     * @param tx 网格坐标x
     * @param ty 网格坐标x
     * @param tileWidth tile的象素宽
     * @param tileHeight tile的象素高
     * @return 象素坐标的点
     */
    GameUtils.rectGridToPixel = function (tx, ty, tileWidth, tileHeight) {
        var xPixel = tx * tileWidth;
        var yPixel = ty * tileHeight;
        return new egret.Point(xPixel, yPixel);
    };
    /**
     * 方形 根据屏幕象素坐标取得网格的坐标
     * @param px 象素坐标x
     * @param py 象素坐标y
     * @param tileWidth tile的象素宽
     * @param tileHeight tile的象素高
     * @return 网格坐标的点
     */
    GameUtils.rectPixelToGrid = function (px, py, tileWidth, tileHeight) {
        var xtile = Math.floor(px / tileWidth);
        var ytile = Math.floor(py / tileHeight);
        return new egret.Point(xtile, ytile);
    };
    /**
     * 获得移动数据
     * @param p1 起点坐标
     * @param p2 终点坐标
     * @param speed 运动速度
     * @param dirNum 方向数量
     * @return
     */
    GameUtils.getMoveData = function (p1, p2, speed, dirNum) {
        if (speed === void 0) { speed = 0; }
        if (dirNum === void 0) { dirNum = 8; }
        var radians, angle, speedX, speedY;
        var distance, scale;
        var px = p1.x - p2.x;
        var py = p1.y - p2.y;
        distance = Math.sqrt(px * px + py * py);
        radians = Math.atan2(py, px);
        if (speed != 0) {
            speedX = speed * Math.cos(radians);
            speedY = speed * Math.sin(radians);
        }
        //弧度转角度
        angle = radians * 180 / Math.PI;
        var direction = Math.round(angle / (360 / dirNum));
        if (direction < 0) {
            direction = Math.abs(direction + dirNum);
        }
        return new MoveDataEntity(distance, direction, scale, speed, speedX, speedY, angle);
    };
    /**
     * 获得角度
     * @param p1
     * @param p2
     * @returns {number}
     */
    GameUtils.getAngle = function (x0, y0, x1, y1) {
        var radians = Math.atan2(y0 - y1, x0 - x1);
        return radians * 180 / Math.PI;
    };
    /**
     * 获得HTML
     * @param str 字符串
     * @param color 颜色
     * @param size 字体大小
     * @param leading 行间距
     * @param underline 是否有链接
     */
    GameUtils.getHtml = function (str, color, size, leading, underline) {
        if (size === void 0) { size = 12; }
        if (leading === void 0) { leading = 0; }
        if (underline === void 0) { underline = false; }
        var ret = str;
        if (underline) {
            ret = "<u>" + str + "</u>";
        }
        ret = "<font color='#" + color.toString(16) + "' size='" + size.toString() + "'>" + ret + "</font>";
        if (leading > 0) {
            ret = "<textformat leading='" + leading.toString() + "'>" + ret + "</textformat>";
        }
        return ret;
    };
    /**
     * 转换时间
     * @param time 时间(秒)
     * @param type 0(时分秒)  1(06:59:59)
     */
    GameUtils.convertTime = function (time, type, showAll) {
        if (type === void 0) { type = 1; }
        if (showAll === void 0) { showAll = true; }
        var day = Math.floor(time / 86400);
        var $day = day * 86400;
        var hour = Math.floor((time - $day) / 3600);
        var $hour = hour * 3600;
        var min = Math.floor((time - $day - $hour) / 60);
        var $min = min * 60;
        var sen = time - $day - $hour - $min;
        var str = "";
        if (type == 0) {
            if (day > 0) {
                str += day.toString() + LangMag.instance.getText("@Day");
            }
            if (hour > 0) {
                str += hour.toString() + LangMag.instance.getText("@Hour");
            }
            else {
                if (day > 0) {
                    str += "0" + LangMag.instance.getText("@Hour");
                }
            }
            if (min > 0) {
                str += min.toString() + LangMag.instance.getText("@Minute");
            }
            else {
                if (day > 0 || hour > 0) {
                    str += "0" + LangMag.instance.getText("@Minute");
                }
            }
            if (sen > 0) {
                str += sen.toString() + LangMag.instance.getText("@Second");
            }
            else {
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
                if (showAll)
                    str += "00:";
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
    };
    /**
     * 替换字符串
     * @param str 字符串
     * @param p 替换字符
     * @param repl 替换成的字符串
     */
    GameUtils.replace = function (str, p, repl) {
        if (repl === void 0) { repl = ""; }
        var index;
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
    };
    /**
     * 替换通配符为值
     * @param content 内容
     * @param params 参数列表
     */
    GameUtils.replaceContent = function (content, params) {
        var len = params.length;
        if (len > 0) {
            var index = 1;
            while (index <= len) {
                content = content.replace("#v" + index + "#", params[index - 1].toString());
                index++;
            }
        }
        return content;
    };
    /**
     * 替换数组内容的通配符为值(彩色字,日志专用)
     * @param contents
     * @param params
     */
    GameUtils.replaceContents = function (contents, params) {
        var reContents = [];
        var len = contents.length;
        var j = 0;
        var repl;
        var temp;
        for (var i = 0; i < len; i++) {
            temp = { text: contents[i].text };
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
    };
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
    GameUtils.createTextField = function (text, width, height, color, size, isBold, align, isInput) {
        if (text === void 0) { text = ""; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (color === void 0) { color = 0xffffff; }
        if (size === void 0) { size = 26; }
        if (isBold === void 0) { isBold = false; }
        if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
        if (isInput === void 0) { isInput = false; }
        var textField = new egret.TextField();
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
    };
    /**
     * 将数字转换成固定格式的字符串
     * @param num 当前数字
     * @param figuresCountAfterPoint 小数点后保留的个数，为0时不保留小数点
     * @returns {string} 22将转换成22.0 1.2345 将转化成1.2
     */
    GameUtils.numberToString = function (num, figuresCountAfterPoint) {
        if (figuresCountAfterPoint === void 0) { figuresCountAfterPoint = 1; }
        var numStr;
        num = Math.floor(num * Math.pow(10, figuresCountAfterPoint)) / Math.pow(10, figuresCountAfterPoint);
        numStr = num.toString();
        if (numStr.indexOf(".") == -1) {
            numStr += ".";
            for (var i = 0; i < figuresCountAfterPoint; i++) {
                numStr += "0";
            }
        }
        return numStr;
    };
    /**
     * jsonp方式访问接口
     * @param url
     * @param call
     */
    GameUtils.getScript = function (url, call) {
        var script = document.createElement('script');
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    if (call) {
                        call();
                    }
                    script = null;
                }
            };
        }
        else {
            script.onload = function () {
                if (call) {
                    call();
                }
                script = null;
            };
        }
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        script.setAttribute('async', 'true');
        script.setAttribute('charset', 'utf-8');
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    /**
     * 设置对象的锚点
     */
    GameUtils.setAnchor = function (obj, x, y) {
        obj.anchorOffsetX = obj.width * x;
        obj.anchorOffsetY = obj.height * y;
        obj.x += obj.width * x;
        obj.y += obj.height * y;
    };
    /**
     * 对象转URL参数
     * @param data
     */
    GameUtils.objectToUrlParam = function (data) {
        var retStr = "";
        for (var key in data) {
            var value = data[key];
            if (value != null && value != undefined) {
                if (value.constructor == Array || value.constructor == Object) {
                    retStr += encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(value)) + "&";
                }
                else {
                    retStr += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
                }
            }
            else {
                retStr += encodeURIComponent(key) + "=&";
            }
        }
        if (retStr.length > 0) {
            retStr = retStr.substring(0, retStr.length - 1);
        }
        return retStr;
    };
    /**
     * 获得Qzone头像
     * @param url
     * @param size 目前只支持50,100
     */
    GameUtils.getQzoneHead = function (url, size) {
        if (size === void 0) { size = "50"; }
        url = url.substring(0, url.lastIndexOf("/"));
        return url + "/" + size;
    };
    return GameUtils;
})();
egret.registerClass(GameUtils,'GameUtils');
