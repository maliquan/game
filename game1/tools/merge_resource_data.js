/**
 * Created by ericcao on 14/11/15.
 * 发布:
 *  合并配置表resource/data/目录文件到json文件,减少http请求
 */
var fs = require('fs');
var path = require('path');
var async = require('./async.js');

var dataDir = "../resource/data/";
var outpubFile = path.join("../resource/", "config.json");


/*
 * 文件内容对象
 * */
var mergeJsonData = {};

function replaceBreak(str)
{
    //替换p
    var f = str.replace(/<p.*?>/ig,"");
    f = f.replace(/<\/p>/ig,"\n");
    //替换<br>
    f = f.replace(/<br\/+?>/ig,"\n");
    return f;
}


function convert(str) {
    var data = [];
    var fonts = str.match(/(.*?)<font.*?>(.*?)<\/font>/g);
    if (fonts == null) {
        data.push([str, {}]);
        return;
    }
    fonts.forEach(function (f) {
        if (!f) {
            return;
        }
        var color = "ffffff";
        var text1 = "";
        var text = "";
        //有颜色font
        var matchs = f.match(/(.*?)<font.*?color="#(.*?)".*?>(.*?)<\/font>/m);
        var matchs2 = f.match(/(.*?)<font.*?>(.*?)<\/font>/m);

        if(matchs)
        {
            f.match(/(.*?)<font.*?color="#(.*?)".*?>(.*?)<\/font>/m);
            text1 = RegExp.$1;
            text = RegExp.$3;
            color = RegExp.$2;
        }else if(matchs2)
        {
            f.match(/(.*?)<font.*?>(.*?)<\/font>/m);
            text1 = RegExp.$1;
            text = RegExp.$2;
        }else
        {
            text1 = f;
        }
        text1 = replaceBreak(text1);
        text = replaceBreak(text);
        color = parseInt(color, 16);
        if(color == 0)
        {
            //解决:egret 对黑色0判断的bug
            color = 0x000001;
        }

        if (text1) {
            if (text1.match(/^\s+$/m)) {
                text = text1 + text;
            }
            else {
                data.push({text:text1});
            }
        }
        if(color)
        {
            data.push({text:text, style:{"textColor": color}});
        }else
        {
            data.push({text:text});
        }
    });
    return data;
}

//FightReport='<font  color="#faf84a" face = "HelveticaBD32" size ="100"> <br/></font><font color="#f0deec" face = "HelveticaBD32">获得金币：</font><font face = "HelveticaBD32">xx获得金币：</font><br/></p>';
//
//
//var ret = convert(FightReport);
//console.log(ret);
//return;

var files = fs.readdir(dataDir, function (error, files) {
    if (error == null) {
        async.each(files, function (file, callback) {
            var filePath = path.join(dataDir, file);
            if (path.extname(filePath) != ".txt") {
                console.error("未包含文件：非txt后缀,跳过文件:：" + filePath);
                callback();
                return;
            }
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    console.error("读文件错误:" + filePath);
                    throw err;
                }
                var richFile = {
                    //"FightLogConfig.txt":1
                };
                if(richFile[file])
                {
                    var richData = {};
                    //转移成富文本
                    var lines = data.split(/(\r\n)/);
                    lines.forEach(function(line)
                        {
                            var words = line.split(/\t/);
                            if(words.length >= 2)
                            {
                                richData[words[0]] = convert(words[1]);
                            }
                        }
                    );
                    mergeJsonData[file] = richData;
                }else
                {
                    mergeJsonData[file] = data;
                }

                callback();
            });
        }, function (err) {
            if (err) {
                throw err;
            }
            var jsonDataObject = {};
            jsonDataObject['data'] = mergeJsonData;
            fs.writeFile(outpubFile, JSON.stringify(jsonDataObject), function (err) {
                    if (err) {
                        console.error("写合并文件失败" + err);
                        throw err;
                    } else {
                        console.log("success ：合并文件 " + outpubFile);
                    }
                }
            );

        });
    } else {
        console.error("读文件夹失败" + dataDir);
        console.error(error);
        throw err;
    }
});