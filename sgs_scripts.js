$(document).ready(function(){
    main();
});

function main(){
    var type = prompt("请选择:逐鹿天下1，一键日常2，自动发言3，上兵伐谋4，自动红包5，钟妈算牌器56");
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
        case "6":
            window.open("https://zssanguo.com/zhongma.html");
            main();
            break;
        case null:
            break;
        default:
            main();
    }
}

function zhuLu(){
    var towerLevel = prompt("刷指定关卡请输入关卡号，挑战新关卡请输入0");
    if (towerLevel !== null){
        // 不在逐鹿天下模式下进入
        if (SceneManager.GetInstance().CurrentScene.sceneName !== 'NewCompeteWorldScene') {
            RoomControler.GetInstance().EnterMode(ModeIDType.MITZhuLuTianXiaNew);
        }

        var zhuluInterval = setInterval(function () {
            if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
                var towerLevelID = parseInt(towerLevel,10) ? parseInt(towerLevel,10): NewCompeteWorldManager.GetInstance().competeWorldInfo.curTowerLevelID;
                var generalList = NewCompeteWorldManager.GetInstance().GetBattleGeneralListForTemp(this.MaxGeneralCount);
                NewCompeteWorldManager.GetInstance().ReqCompeteWorldBattle(towerLevelID, generalList);
            }else{  //如果在游戏中
                //牌局中出现结算按钮，离开游戏
                if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                    GameContext.LeaveGameScene();
                    if (GameItemManager.GetInstance().GetItemByID(720027).ItemNum === 0){
                        clearInterval(zhuluInterval);
                        setTimeout(function(){alert("逐鹿已刷完");main();}, 2000);
                    }
                }
            }
        }, 300);
    }else{
        main();
    }
}
function riChang(){
    //定义proxy
    var proxy = function(t, e){
        GameGuildManager.GetInstance().protoProxy.LE87(t,e);
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
    setTimeout(function(){alert("日常已刷完");main();}, 2000);
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
    var chatTimeInterval = prompt("请输入每次发言时间间隔，最少3秒");
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
    var shoutInterval = setInterval(function(){
        if (count === parseInt(chatMaxCount, 10)){
            clearInterval(shoutInterval);
            setTimeout(function(){alert("发言已结束");
                main();}, 2000);
        }
        ChatManager.GetInstance().SendChatMsg(chatMessage, 0, channelType);
        count++;
    },parseFloat(chatTimeInterval)*1000);
}

function shangBing(){
    var cityName = prompt("请输入城池名（目前仅支持州城和郡城）");
    var jiangLing = prompt("选择出战将灵（第几个）");
    if (cityName === null || jiangLing === null){
        setTimeout(function(){alert("城池名为中文，出战将灵为数字");
            main();}, 2000);
    }else{
        var jiangLingID = parseInt(jiangLing) -1;
        var cities = GameGlaivesManager.GetInstance().mapCitys;
        var cityID = -1;
        for (var i = 0; i < cities.length; i++){
            if (cities[i].nodeName === "cityName"){
                cityID = cities[i].CityID;
            }
        }
        if (cityID === -1){
            setTimeout(function(){alert("没有这个城池");
                main();}, 2000);
        }else{
                // 进入上兵伐谋
                GameGlaivesManager.GetInstance().BattleBack();

                var shangbingInterval = setInterval(function () {
                    if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
                        GameGlaivesManager.GetInstance().ReqGlaivesOfStrategyBattle(jiangLingID,cityID);
                    }else{  //如果在游戏中
                        //牌局中出现结算按钮，离开游戏
                        if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                            GameContext.LeaveGameScene();
                            if (GameItemManager.GetInstance().GetItemByID(730102).ItemNum === 0){
                                clearInterval(shangbingInterval);
                                setTimeout(function(){alert("上兵已刷完");main();}, 2000);
                            }
                        }
                    }
                }, 300);
            }
        }
}

function hongBao(){
    alert("开始刷红包");
    var bonusInterval = setInterval(function(){
        var bonusGetter = GameGuildManager.GetInstance();
        console.log(bonusGetter.BHaveCanReceiveBonus());
        if (bonusGetter.BHaveCanReceiveBonus() === true){
            var lastIndex = 700 + bonusGetter.guildBonusList.count;
            var bonusID = bonusGetter.guildBonusList.Maps[lastIndex].pkID;
            GameGuildManager.GetInstance().ReqGuildBonusReceive(bonusID);
        }
    },300);
}
