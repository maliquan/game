
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/core/common/HashMap.js",
	"bin-debug/core/common/IMessage.js",
	"bin-debug/core/common/Message.js",
	"bin-debug/core/component/BaseBtn.js",
	"bin-debug/core/component/ViewCtl.js",
	"bin-debug/core/const/Global.js",
	"bin-debug/core/const/HttpId.js",
	"bin-debug/core/const/LocalId.js",
	"bin-debug/core/const/SocketId.js",
	"bin-debug/core/const/UserInfo.js",
	"bin-debug/core/const/WinName.js",
	"bin-debug/core/manager/DataMag.js",
	"bin-debug/core/manager/EnterFrameMag.js",
	"bin-debug/core/manager/LangMag.js",
	"bin-debug/core/manager/LoadMag.js",
	"bin-debug/core/manager/PopUpMag.js",
	"bin-debug/core/manager/SoundMag.js",
	"bin-debug/core/manager/TimerMag.js",
	"bin-debug/core/manager/entity/EnterFrameEntity.js",
	"bin-debug/core/manager/entity/ParserEntity.js",
	"bin-debug/core/manager/entity/TimeEntity.js",
	"bin-debug/core/manager/parser/IParser.js",
	"bin-debug/core/manager/parser/MainParser.js",
	"bin-debug/core/net/HttpMsg.js",
	"bin-debug/core/net/HttpMsgCMD.js",
	"bin-debug/core/net/SocketMsg.js",
	"bin-debug/core/net/socketVo/SLoginVo.js",
	"bin-debug/core/utils/GameUtils.js",
	"bin-debug/core/utils/KeyBoardUtils.js",
	"bin-debug/core/utils/MoveDataEntity.js",
	"bin-debug/core/utils/TweenUtils.js",
	"bin-debug/server/Server.js",
	"bin-debug/server/TimeDropServer.js",
	"bin-debug/view/cfg/DropCfg.js",
	"bin-debug/view/cfg/EquipCfg.js",
	"bin-debug/view/cfg/FSCfg.js",
	"bin-debug/view/cfg/ICfg.js",
	"bin-debug/view/cfg/ItemCfg.js",
	"bin-debug/view/cfg/ItemMag.js",
	"bin-debug/view/cfg/ObjCfg.js",
	"bin-debug/view/cfg/vo/ItemVo.js",
	"bin-debug/view/cfg/vo/EquipVo.js",
	"bin-debug/view/cfg/vo/ObjectVo.js",
	"bin-debug/view/common/GBtn.js",
	"bin-debug/view/common/GLabel.js",
	"bin-debug/view/common/GLabel_bkg.js",
	"bin-debug/view/dialog/LoginDialog.js",
	"bin-debug/view/dialog/TipDialog.js",
	"bin-debug/view/fight/FSMag.js",
	"bin-debug/view/fight/FightDialog.js",
	"bin-debug/view/fight/FightScene.js",
	"bin-debug/view/fight/ObjectSp.js",
	"bin-debug/view/fight/bag/BagMag.js",
	"bin-debug/view/fight/bag/BagPanel.js",
	"bin-debug/view/loading/LoadingUI.js",
	"bin-debug/view/login/LoginCtl.js",
	"bin-debug/view/login/SayPanel.js",
	"bin-debug/view/main/ChatPanel.js",
	"bin-debug/view/main/HomePanel.js",
	"bin-debug/view/main/MainBtnGroup.js",
	"bin-debug/view/main/MainScene.js",
	"bin-debug/view/main/storage/ItemShowPanel.js",
	"bin-debug/view/main/storage/StorageMag.js",
	"bin-debug/view/main/storage/StoragePanel.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};