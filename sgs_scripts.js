$(document).ready(function(){
    main();
});

//快捷键打开菜单
window.onkeypress = function(e) {
    e = e || window.event;
    if (e.code === "KeyM" && e.ctrlKey === true){  //key ctrl+M
        e.preventDefault();
        main();
    }
};

function main(){
    var type = prompt("请选择:逐鹿天下1，一键日常2，自动发言3，上兵伐谋4，自动红包5\n快捷键:ctrl+M 打开菜单 ESC 关闭菜单");
    switch (type){
        case "1":
            zhuLu();
            break;
        case "2":
            riChang();
            break;
        case "3":
            chat();
            break;
        case "4":
            shangBing();
            break;
        case "5":
            hongBao();
            break;
        case null:
            break;
        default:
            main();
    }
}

function zhuLu(){
    var towerLevel = prompt("请输入关卡号，挑战新关卡请输入0");
    var battleCount = prompt("请输入挑战次数，不限请输入0");
    if (towerLevel !== null && battleCount !== null ){
        // 不在逐鹿天下模式下进入
        if (SceneManager.GetInstance().CurrentScene.sceneName !== 'NewCompeteWorldScene') {
            RoomControler.GetInstance().EnterMode(ModeIDType.MITZhuLuTianXiaNew);
        }

        var stopPoint = parseInt(battleCount,10) ? GameItemManager.GetInstance().GetItemByID(720027).ItemNum - battleCount : 0;
        stopPoint = stopPoint < 0 ? 0 : stopPoint;
        zhuluInterval = setInterval(function () {
            if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
                var towerLevelID = parseInt(towerLevel,10) ? parseInt(towerLevel,10): NewCompeteWorldManager.GetInstance().competeWorldInfo.curTowerLevelID;
                var generalList = NewCompeteWorldManager.GetInstance().GetBattleGeneralListForTemp(this.MaxGeneralCount);
                NewCompeteWorldManager.GetInstance().ReqCompeteWorldBattle(towerLevelID, generalList);
            }else{  //如果在游戏中
                //牌局中出现结算按钮，离开游戏
                if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                    GameContext.LeaveGameScene();
                    if (GameItemManager.GetInstance().GetItemByID(720027).ItemNum === stopPoint){
                        clearInterval(zhuluInterval);
                        setTimeout(function(){alert("逐鹿已刷完");return main();}, 2000);
                    }
                }
            }
        }, 300);
    }else{
        return main();
    }
}
function riChang(){
    //定义proxy
    var proxy = function(t, e){
        GameGuildManager.GetInstance().protoProxy.TX55(t,e);
    };

//每日签到
    DailySignManager.GetInstance().ReqGetSignInReward(1, DailySignManager.GetInstance().initSignDate);

//公会敲鼓3次
    for (var i = 0; i < 3; i++) {
        GameGuildManager.GetInstance().ReqBeatDrum(0);
    }

// 领取公会每日任务奖励,活跃值,活跃奖励
    var taskIDList = [401, 402, 403, 1001, 1002, 1003, 1004];
    for (taskID of taskIDList) {
        TaskManager.GetInstance().GetTaskReward(taskID);
    }
    for (var taskID = 1101; taskID < 1120; taskID++) {
        TaskManager.GetInstance().GetTaskReward(taskID);
    }

// 每日抽取免费将印
    proxy(ProtoBufId.CMSG_CREQGENERALSEALCHESTOPEN, { type: 1 });

//每日抽取免费秀
    proxy(ProtoBufId.CMSG_CREQDRESSOPEN, {});

// 领取工会战奖励
    GameGuildManager.GetInstance().ReqGuildBattleUserWinTimesReward();

// 领取将灵聚宝盆和出征奖励
    var CornucopiaElfInfo = GeneralElfManager.GetInstance().CornucopiaElfInfo;
    var pkID = CornucopiaElfInfo.pkID;
    var cornucopiaCount = CornucopiaElfInfo.cornucopiaCount;
    proxy(ProtoBufId.CMSG_CREQGENERALSPRITECORNUCOPIA, {
        pkID: pkID,
        count: cornucopiaCount
    });
    proxy(ProtoBufId.CMSG_CREQGENERALSPRITETASKREWARDGET, {
        pkID: pkID,
        count: cornucopiaCount
    });

    //上兵伐谋获取每天粮草
    GameGlaivesManager.GetInstance().ReqGlaivesOfStrategyEveryDaySupply();

    setTimeout(function(){alert("每日签到/活跃，公会敲鼓/任务/争霸赛，免费将印/三国秀，将灵聚宝盆/出征，上兵粮草领取完毕");return main();}, 2000);
}

function chat(){
    var chatMessage = prompt("欢迎进入自动发言。请输入发言内容");
    if (chatMessage === null){
        return main();
    }
    var chatChannel = prompt("请输入发言频道：综合1/公会2/诏令3/势力4/房间5/队伍6/私聊7");
    if (chatChannel === null){
        return main();
    }
     chatTimeInterval = prompt("请输入每次发言时间间隔，最少3秒");
    if (chatTimeInterval === null){
        return main();
    }
    var chatMaxCount = prompt("请输入发言次数");
    if (chatMaxCount === null){
        return main();
    }
    var channelType;
    var channelId = parseInt(chatChannel,10);
        //综合：WORLD, 公会：GUILD 房间：ROOM,私聊：PERSONAL, 队伍：TEAM, 势力: COUNTRY , 诏令: ZHAO
        switch (channelId){
            case 1:
                channelType = ChatChannelType.WORLD;
                break;
            case 2:
                channelType = ChatChannelType.GUILD;
                break;
            case 5:
                channelType = ChatChannelType.ROOM;
                break;
            case 6:
                channelType = ChatChannelType.TEAM;
                break;
            case 4:
                channelType = ChatChannelType.COUNTRY;
                break;
            case 3:
                channelType = ChatChannelType.ZHAO;
                break;
            case 7:
                channelType = ChatChannelType.PERSONAL;
                break;
            default:
                main();
        }

    var count = 0;
     shoutInterval = setInterval(function(){
        if (count === parseInt(chatMaxCount, 10)){
            clearInterval(shoutInterval);
            setTimeout(function(){alert("发言已结束");
                return main();}, 2000);
        }
        ChatManager.GetInstance().SendChatMsg(chatMessage, 0, channelType);
        count++;
    },parseFloat(chatTimeInterval)*1000);
}

function shangBing(){
    var cityName = prompt("请输入城池名，关隘则输入关隘");
    var jiangLing = prompt("选择出战将灵（数字：第几个）");
    if (cityName === null || jiangLing === null){
        return main();
    }else{
        var jiangLingID = parseInt(jiangLing) -1;
        var cities = GameGlaivesManager.GetInstance().mapCitys;
        var cityID = -1;
        if (cityName === "关隘"){ //如果是关隘
            var guildInfo = prompt("请输入驻守公会+驻守将灵数+城防\n例：位权如山+13+2000/5000");
            if (guildInfo === null){return main();}else{
                var specs = guildInfo.split("+");
                var guildName = specs[0];
                var defenderCount = parseInt(specs[1],10);
                var defenseTotal = parseInt(specs[2].split("/")[1],10);
                var defenseDestroy = defenseTotal - parseInt(specs[2].split("/")[0],10);
                alert(guildName + " " + defenderCount + " " + defenseTotal + " " + defenseDestroy);
                for (var i = 0; i < cities.length; i++){
                    if (cities[i].CityType === 4 && cities[i].guildName === guildName && cities[i].DefenceTotal === defenseTotal && cities[i].defenseDestroy === defenseDestroy && cities[i].Defenders.length ===defenderCount){
                        cityID = cities[i].CityID;
                    }
                }
            }
            alert("cityId: "+cityID);
        }else{  //如果是大城
            for (var i = 0; i < cities.length; i++){
                if (cities[i].nodeName === "cityName"){
                    cityID = cities[i].CityID;
                }
            }
        }
        var battleCount = prompt("请输入上兵次数，不限请输入0");
        if (cityID === -1){
            setTimeout(function(){alert("没有这个城池");
                return main();}, 2000);
        }else{
            var stopPoint = parseInt(battleCount,10) ? (GameItemManager.GetInstance().GetItemByID(730102).ItemNum - (battleCount*20)) : 0;
            stopPoint = stopPoint < 0 ? 0 : stopPoint;

                // 进入上兵伐谋
                GameGlaivesManager.GetInstance().BattleBack();

                 shangbingInterval = setInterval(function () {
                    if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
                        GameGlaivesManager.GetInstance().ReqGlaivesOfStrategyBattle(jiangLingID,cityID);
                    }else{  //如果在游戏中
                        //牌局中出现结算按钮，离开游戏
                        if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                            GameContext.LeaveGameScene();
                            if (GameItemManager.GetInstance().GetItemByID(730102).ItemNum === stopPoint){
                                clearInterval(shangbingInterval);
                                setTimeout(function(){alert("上兵已刷完");return main();}, 2000);
                            }
                        }
                    }
                }, 300);
            }
        }
}

function hongBao(){
    var hbStats = JSON.parse(localStorage.getItem("hbStats"));
    var d = new Date(); var currDate = d.getDate();
    if (hbStats === null || hbStats[0] !== currDate ){
        var init = [];
        init[0] = currDate;
        init[1] = 0;
        init[2] = 0;
        localStorage.setItem("hbStats", JSON.stringify(init));
    }else if (typeof bonusInterval === 'undefined'){
        alert("今天已抢"+hbStats[1]+"个红包，已经获得"+hbStats[2]+"元宝。");
    }else{
        var confirmation = confirm("正在抢红包中。。。\n已抢"+hbStats[1]+"个红包，已得"+hbStats[2]+"元宝。\n是否修改抢红包设置");
        if (!confirmation){
            return main();
        }
    }
    var minhongBao = parseInt(prompt("单价达到多少才抢\n最小红包为500元宝，10份，则单价就是50"),10);
    var startingYB = GameItemManager.GetInstance().GetItemByID(100002).ItemNum;
    bonusInterval = setInterval(function(){
        var bonusGetter = GameGuildManager.GetInstance();
        if (bonusGetter.BHaveCanReceiveBonus() === true){
            var bonusID = parseInt(bonusGetter.guildBonusList.keys[0],10) + bonusGetter.guildBonusList.count -1;
            if (minhongBao <= bonusGetter.guildBonusList.Maps[bonusID].goldNum/bonusGetter.guildBonusList.Maps[bonusID].pieceNum){
                GameGuildManager.GetInstance().ReqGuildBonusReceive(bonusID);
                var hbStats = JSON.parse(localStorage.getItem("hbStats"));
                hbStats[1]++;
                hbStats[2] = GameItemManager.GetInstance().GetItemByID(100002).ItemNum - startingYB;
                localStorage.setItem("hbStats", JSON.stringify(hbStats));
                if (hbStats[1] === 30){
                    clearInterval(bonusInterval);
                    setTimeout(function(){alert("红包已刷完");return main();}, 2000);
                }
            }
        }
    },300);
}
var zhuluInterval;
var chatTimeInterval;
var shoutInterval;
var shangbingInterval;
var bonusInterval;