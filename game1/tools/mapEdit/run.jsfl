var startY = 0;
var startDepth = 0;
var path = "file://vmware-host/Shared%20Folders/%e6%a1%8c%e9%9d%a2/maliquan/2/myGame/tools/mapEdit/";
var mapFileName = "map1";
var allStr = "";

init()

function init()
{
	fl.outputPanel.clear();//清理输出面板
	allStr = '{\r\t"list":[';//xml开头
	
	run(path + mapFileName + ".fla")
	
	allStr = allStr.slice(0, -1);//删除最后一个逗号
	allStr += "]\r}"//xml结尾
	log(allStr);//打印结果
	exportFile();//保存文件
}

function run(fileName)
{
	log(fileName)
	var doc = fl.openDocument(fileName);
	if(doc)
	{
		parseFla()
		doc.close();
	}
}

function testFor(obj)
{
	for (var xx in obj)
	{
		log(xx);
	}
	log("/--------------------------------")
	for each(var xx2 in obj)
	{
		log(xx2);
	}
}

/**
* 解析fla
*/
function parseFla()
{
	fl.getDocumentDOM().selectAll();//选择舞台上所有对象
	var allElement = fl.getDocumentDOM().selection.reverse();//获得舞台所有对象,并且反向，因为addchildAt的时候需要从0开始，比如从32开始，会报错层级超出索引
	allStr += getStrFromType(allElement);//根据组件类型生成不同格式的文本
}

/**
* 根据组件类型生成不同格式的文本
*/
function getStrFromType(allElement)
{
	var contentStr = "";
	var len = allElement.length;
	for each(var element in allElement)//遍历舞台所有的对象
	{
		strList = [ getStr("src", element.parameters && element.parameters.src ? element.parameters.src.value : "", true),
				    getStr("depth", 100000 + len - element.depth - 1 + startDepth),//这里是深度(大的在下)，跟舞台显示的层级(小的在下)反着
				    getStr("curNum", element.parameters && element.parameters.curNum ? element.parameters.curNum.value : ""),
					getStr("makeSpeed", element.parameters && element.parameters.makeSpeed ? element.parameters.makeSpeed.value : ""),
					getStr("moveSpeed", element.parameters && element.parameters.moveSpeed ? element.parameters.moveSpeed.value : ""),
					getStr("strength", element.parameters && element.parameters.strength ? element.parameters.strength.value : ""),
					getStr("team", element.parameters && element.parameters.team ? element.parameters.team.value : ""),
					getStr("maxNum", element.parameters && element.parameters.maxNum ? element.parameters.maxNum.value : ""),
				    getStr("x", element.x),
				    getStr("y", element.y + startY),
				    getStr("w", element.width),
				    getStr("h", element.height),
					getStr("r", element.rotation, false, true)
				  ]
		for each(var str in strList)
			contentStr += str;
	}
	startDepth += len - element.depth - 1000;//每个fla的深度上限是1000，fla从小到大是从头往下码放，但是显示的时候，下面的要盖在上面，所以要调整每个fla的层级， 总层级超过100000会变成负的深度，请注意
	startY += fl.getDocumentDOM().height;
	return contentStr;
}

/**
* 开启懒人模式 key，value，是否开头,是否结尾
*/
function getStr(keyStr, valueStr, isHead, isEnd)
{
	var headStr = isHead ? "\r\t{ " : "";
	var endStr = isEnd ? " }," : ", ";
	var contentStr = headStr + '"' + keyStr + '":"' + valueStr + '"' + endStr;
	return contentStr;
}

/**
* 导出
*/
function exportFile()
{
	var writeSuccBool = FLfile.write(path + mapFileName + ".json", allStr);//, "append");//写入成功与否
	if(writeSuccBool == false)
		log("导出失败");
	else
		log("导出成功");
	log(path);
}

/**
* 打印日志
*/
function log(str)
{
	fl.trace(str);
}
