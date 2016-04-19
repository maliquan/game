/**
 * Created by ericcao on 14/11/3.
 * 需要安装
 * > npm install protobufjs
 * 运行
 * cd tools
 * node protobuf2dts.js > protobuf.d.ts
 */

var ProtoBuf = require("protobufjs");
var builder = ProtoBuf.loadProtoFile("../launcher/protocol/JsProto.jspb");
var TRoot = builder.lookup();

var unSupportClassNameMap = [];
var unSupportFIeldType = [];

var dts = convertTRoot(TRoot);

dts = "declare module Buffer{\n" + dts + "}";
console.log(dts);
console.error(unSupportClassNameMap);
console.error(unSupportFIeldType)

function convertTRoot(TRoot) {
    var children = TRoot.getChildren();
    var dts = "";
    children.forEach(function (c) {
        dts += goConvert(c);
    });
    return dts;
}

function goConvert(ref) {
    var convertFunMap = [];
    convertFunMap["Message"] = convertMessage;
    convertFunMap["Message.Field"] = convertField;
    convertFunMap["Namespace"] = convertNamespace;
    convertFunMap["Enum"] = convertEnum;
    convertFunMap["Enum.Value"] = convertEnumValue;
    var dts = "";
    if (convertFunMap[ref.className]) {
        dts = convertFunMap[ref.className](ref);
    } else {
        unSupportClassNameMap[ref.className] = ref.className;
    }
    return dts;
}

function convertNamespace(refF) {
    var name = refF.name;
    var dts = "";
    if (name != null && name.length > 0) {
        dts = "";
    }
    return dts;
}
function convertEnum(refP) {
    var name = refP.name;
    var dts = "";
    if (name != null && name.length > 0) {
        var refRArray = refP.getChildren();
        refRArray.forEach(function (c) {
            dts += goConvert(c);
        });
        /**
         * 枚举生命用interface代替，方便些代码
         * @type {string}
         */
        dts = "interface " + name + "{" + dts.substr(0, dts.length - 1) + "}\n";
    }
    return dts;
}
function convertEnumValue(refC) {
    var name = refC.name;
    var id = refC.id;
    //dts = name + "=" + id + ",";
    dts = name+":number;";
    return dts;
}
function convertField(refR) {

    var fieldName = refR.name;
    var fieldId = refR.id;
    var repeated = refR.repeated;
    var required = refR.required;
    var fieldType = refR.type.name;
    var fieldWriteType = refR.type.wireType;

    var dts = "";
    var protoBaseType2TsMap = [];
    protoBaseType2TsMap['int32'] = "number";
    protoBaseType2TsMap['uint32'] = "number";
    protoBaseType2TsMap['sint32'] = "number";
    protoBaseType2TsMap['fixed32'] = "number";
    protoBaseType2TsMap['sfixed32'] = "number";
    protoBaseType2TsMap['int64'] = "number";
    protoBaseType2TsMap['sint64'] = "number";
    protoBaseType2TsMap['uint64'] = "number";
    protoBaseType2TsMap['fixed64'] = "number";
    protoBaseType2TsMap['sfixed64'] = "number";
    protoBaseType2TsMap['bool'] = "boolean";
    protoBaseType2TsMap['float'] = "number";
    protoBaseType2TsMap['double'] = "number";
    protoBaseType2TsMap['string'] = "string";
    protoBaseType2TsMap['bytes'] = "any";//todo:
    //protoBaseType2TsMap['message'] = "message";
    //protoBaseType2TsMap['group'] = "group";
    //protoBaseType2TsMap['enum'] = "enum";
    methodName = fieldName.substr(0, 1).toLocaleUpperCase() + fieldName.substr(1);
    var dtsType = "any";
    if (protoBaseType2TsMap[fieldType]) {
        dtsType = protoBaseType2TsMap[fieldType];
    } else {
        switch (fieldType) {
            case 'message':
                var resolvedType = refR.resolvedType;
                if (resolvedType != null && resolvedType.className == "Message") {
                    var moduleName = getMessageModuleName(resolvedType);
                    var classFullName = resolvedType.name;
                    if (moduleName != null && moduleName.length > 0) {
                        classFullName = "_" + moduleName + "." + classFullName;
                    }
                    dtsType = classFullName;
                }
                else {
                    //todo:没有转的
                    console.error("todo:不支持1");
                }
                break;
            case 'enum':
                var resolvedType = refR.resolvedType;
                if (resolvedType != null && resolvedType.className == "Enum") {
                    dtsType = resolvedType.name;
                }
                else {
                    console.error("todo:不支持2");
                }
                break;
            default :
                unSupportFIeldType[fieldType] = fieldName;
                break;
        }
    }
    if(repeated)
    {
        dts = "get" + methodName + "():Array<" + dtsType + ">;";
        dts += "set" + methodName + "(value:Array<" + dtsType + ">):void;";
    }else
    {
        dts = "get" + methodName + "():" + dtsType + ";";
        dts += "set" + methodName + "(value:" + dtsType + "):void;";
    }
    return dts;
}


function getMessageModuleName(refA) {
    var parent = refA.parent;
    var moduleName = "";
    var hasModule = false;
    while (parent != null && parent.name != null && parent.name != "") {
        //namespace + message
        hasModule = true;
        moduleName = parent.name + "." + moduleName;
        parent = parent.parent;
    }
    return moduleName.substr(0, moduleName.length - 1);
}
function convertMessage(refA) {
    var messageName = refA.name;
    var dts = "";
    var dtsClass = "";
    var refRArray = refA.getChildren();
    refRArray.forEach(function (c) {
        if (c.className == "Message.Field") {
            dts += goConvert(c);
        } else {
            dtsClass += goConvert(c);
        }
    });
    var parent = refA.parent;
    var moduleName = getMessageModuleName(refA);


    if (moduleName != null && moduleName.length > 0) {
        dts = "class " + messageName + "{" + dts + "}\n"
        dts = "module _" + moduleName + "{\n" + dts + "}\n"
    } else {
        dts = "class " + messageName + "{" + dts + "}\n"
    }
    dts = dtsClass + dts;

    return dts;
}


