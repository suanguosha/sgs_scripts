var zhuluInterval;
var shoutInterval;
var shangbingInterval;
var bonusInterval;
var zhuLuActive = false;
var shoutActive = false;
var shangbingActive = false;
var bonusActive = false;

$(document).ready(function(){
    $.getScript("https://unpkg.com/hotkeys-js/dist/hotkeys.min.js",function(){
        hotkeys('ctrl+m,ctrl+shift+m', function (){main();});
    });
    if (typeof SceneManager === "undefined"){
        main = function(){};zhuLu = function(){};riChang = function(){};shangBing = function(){};chat = function(){};hongBao = function(){};gongHui = function(){};todayDrum = function(){};weekContribution = function(){};weekBattle = function(){};monthBattle = function(){};bonusReceive = function(){};shangBingGongHui= function(){};
        alert("您当前框架不为index.php，请自行百度“XX浏览器控制台切换框架”，然后重开");
    }else{
        checkValidUser();
    }
});
function checkValidUser(){
    var { Query, User } = AV;
    AV.User.logOut();
    AV.User.logIn(localStorage.getItem("AVusername"), localStorage.getItem("AVpassword")).then(function(user){
        var userID = GameShopManager.GetInstance().guildContributionInfo.userID;
        if (typeof user.get("uid") === "undefined"){
            var paramsJson = {
                uid: userID
            };
            AV.Cloud.run('recordUID', paramsJson).then(function () {
                main = function(){
                    var type = prompt("请选择:自动逐鹿1/一键日常2/自动发言3/挂机红包4/公会考勤5\n自动上兵:(输入城池名-快速不用找)6/(读取窗口-兼容无名关隘)7\n快捷键:ctrl+M或ctrl+shift+M 打开菜单 / ESC 关闭菜单");
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
                            hongBao();
                            break;
                        case "5":
                            gongHui();
                            break;
                        case "6":
                            shangBing(true);
                            break;
                        case "7":
                            shangBing(false);
                            break;
                        case null:
                            break;
                        default:
                            main();
                    }
                };
                main();
            },function(){
                main = function(){};zhuLu = function(){};riChang = function(){};shangBing = function(){};chat = function(){};hongBao = function(){};gongHui = function(){};todayDrum = function(){};weekContribution = function(){};weekBattle = function(){};monthBattle = function(){};bonusReceive = function(){};shangBingGongHui= function(){};
                alert("绑定三国杀账号失败,请联系QQ:2891532094");
            });
        }else if (userID !== user.get("uid")){
            main = function(){};zhuLu = function(){};riChang = function(){};shangBing = function(){};chat = function(){};hongBao = function(){};gongHui = function(){};todayDrum = function(){};weekContribution = function(){};weekBattle = function(){};monthBattle = function(){};bonusReceive = function(){};shangBingGongHui= function(){};
            alert("一个代码杀只允许绑定一个三国杀");
        }else{
            main = function(){
                var type = prompt("请选择:自动逐鹿1/一键日常2/自动发言3/挂机红包4/公会考勤5\n自动上兵:(输入城池名-快速不用找)6/(读取窗口-兼容无名关隘)7\n快捷键:ctrl+M或ctrl+shift+M 打开菜单 / ESC 关闭菜单");
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
                        hongBao();
                        break;
                    case "5":
                        gongHui();
                        break;
                    case "6":
                        shangBing(true);
                        break;
                    case "7":
                        shangBing(false);
                        break;
                    case null:
                        break;
                    default:
                        main();
                }
            };
            main();
        }
    },function(){
        main = function(){};zhuLu = function(){};riChang = function(){};shangBing = function(){};chat = function(){};hongBao = function(){};gongHui = function(){};todayDrum = function(){};weekContribution = function(){};weekBattle = function(){};monthBattle = function(){};bonusReceive = function(){};shangBingGongHui= function(){};
        alert("登录失败，请联系QQ:2891532094");
    });
}
function checkActive(intervalName){
    var modifier = true;
    switch(intervalName){
        case "zhuLuActive":
            if (zhuLuActive){
                modifier = confirm("自动逐鹿正在运行中,是否修改设置?");
            }
            break;
        case "shoutActive":
            if (shoutActive){
                modifier = confirm("自动发言正在运行中,是否修改设置?");
            }
            break;
        case "shangbingActive":
            if (shangbingActive){
                modifier = confirm("自动上兵正在运行中,是否修改设置?");
            }
            break;
        case "bonusActive":
            if (bonusActive){
                modifier = confirm("挂机红包正在运行中,是否修改设置?");
            }
            break;
        default:
            break;
    }
    return modifier;
}
function main(){}
function zhuLu(){
    if (!checkActive("zhuLuActive")){return main();}
    var tili = GameItemManager.GetInstance().GetItemByID(720027).ItemNum;
    if (tili === 0){
        alert("您当前没有体力，稍后为您打开主菜单");
        return main();
    }
    var towerLevel = prompt("请输入关卡号，挑战新关卡请输入0");
    if (towerLevel === null){return main();}
    var battleCount = prompt("请输入挑战次数，不限请输入0");
    if (battleCount === null){return main();}
        // 不在逐鹿天下模式下进入
        if (SceneManager.GetInstance().CurrentScene.sceneName !== 'NewCompeteWorldScene') {
            RoomControler.GetInstance().EnterMode(ModeIDType.MITZhuLuTianXiaNew);
        }

        var stopPoint = parseInt(battleCount,10) ? GameItemManager.GetInstance().GetItemByID(720027).ItemNum - battleCount : 0;
        stopPoint = stopPoint < 0 ? 0 : stopPoint;
        zhuLuActive = true;
        clearInterval(zhuluInterval);

    GameShopManager.GetInstance().protoProxy.fakeProxy = function(t,e){
        var i=new ProtoVO;i.protoID=t,i.protoData=e,this.clientSocketSend(i)
    };
    var proxy = function(t, e){
        GameShopManager.GetInstance().protoProxy.fakeProxy(t,e);
    };

        zhuluInterval = setInterval(function () {
            if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
                var towerLevelID = parseInt(towerLevel, 10) ? parseInt(towerLevel, 10) : NewCompeteWorldManager.GetInstance().competeWorldInfo.curTowerLevelID;
                var generalList = NewCompeteWorldManager.GetInstance().GetBattleGeneralListForTemp(NewCompeteWorldConfig.GetInstance().GetCompeteWorldbyId(towerLevelID).MaxGeneralCount);
                NewCompeteWorldManager.GetInstance().ReqCompeteWorldBattle(towerLevelID, generalList);
            } else {  //如果在游戏中
                //速度自动5倍
                proxy(ProtoBufId.LOGICMSG_CREQAUTOCHESSSETRESPONSERATE, {
                    rate: 5
                });

                //牌局中出现结算按钮，离开游戏
                if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                    GameContext.LeaveGameScene();
                    if (GameItemManager.GetInstance().GetItemByID(720027).ItemNum === stopPoint) {
                        clearInterval(zhuluInterval);
                        zhuLuActive = false;
                        setTimeout(function () {
                            alert("逐鹿已刷完");
                            return main();
                        }, 2000);
                    }
                }
            }
        },1000);
}
function riChang(){
    //定义proxy
    GameShopManager.GetInstance().protoProxy.fakeProxy = function(t,e){
        var i=new ProtoVO;i.protoID=t,i.protoData=e,this.clientSocketSend(i)
    };
    var proxy = function(t, e){
        GameShopManager.GetInstance().protoProxy.fakeProxy(t,e);
    };

//每日签到
    DailySignManager.GetInstance().ReqGetSignInReward(1, DailySignManager.GetInstance().initSignDate);

// 领取公会每日任务奖励,活跃值,活跃奖励
    var taskIDList = [401, 402, 403, 1001, 1002, 1003, 1004];
    for (var taskID = 1101; taskID < 1120; taskID++) {
        TaskManager.GetInstance().GetTaskReward(taskID);
    }
    for (taskID of taskIDList) {
        TaskManager.GetInstance().GetTaskReward(taskID);
    }
// 每日抽取免费将印
    proxy(ProtoBufId.CMSG_CREQGENERALSEALCHESTOPEN, { type: 1 });

//每日抽取免费秀
    proxy(ProtoBufId.CMSG_CREQDRESSOPEN, {});

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

//公会敲鼓3次
    for (var i = 0; i < 3; i++) {
        GameGuildManager.GetInstance().ReqBeatDrum(0);
    }
// 领取工会战奖励
    GameGuildManager.GetInstance().ReqGuildBattleUserWinTimesReward();
    setTimeout(function(){alert("每日签到/活跃，公会敲鼓/任务/争霸赛，免费将印/三国秀，将灵聚宝盆/出征，上兵粮草领取完毕");return main();}, 2000);
}
function chat(){
    if (!checkActive("shoutActive")){return main();}
    var chatMessage = prompt("欢迎进入自动发言。请输入发言内容");
    if (chatMessage === null){
        return main();
    }
    var chatChannel = prompt("请输入发言频道：综合1/公会2/诏令3/势力4/房间5/队伍6/私聊7");
    if (chatChannel === null){
        return main();
    }
     var chatTimeInterval = prompt("请输入每次发言时间间隔，建议10秒");
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
     shoutActive = true;
    clearInterval(shoutInterval);
     shoutInterval = setInterval(function(){
        if (count === parseInt(chatMaxCount, 10)){
            shoutActive = false;
            clearInterval(shoutInterval);
            setTimeout(function(){alert("发言已结束");
                return main();}, 2000);
        }
        ChatManager.GetInstance().SendChatMsg(chatMessage, 0, channelType);
        count++;
    },parseFloat(chatTimeInterval)*1000);
}
function shangBing(hasCityName){
    if (!checkActive("shangbingActive")){return main();}
    var liangcao = GameItemManager.GetInstance().GetItemByID(730102).ItemNum;
    if (liangcao === 0){
        alert("您当前没有粮草，稍后为您打开主菜单");
        return main();
    }
    if (hasCityName === true){
        var cityName = prompt("请输入城池名称");
        if (cityName === null){return main();}
    }else{
        var currWindow = WindowManager.GetInstance().lastPopupGameWindow;
        if (currWindow === null || typeof currWindow === "undefined" || typeof currWindow.name === "undefined" || currWindow.name !== "GameGlaivesCityInfoWindow"){
            alert("读取信息失败！请按提示操作\n进入上兵伐谋模式-点开进攻目标的城池窗口\n然后重新呼出脚本(ctrl+M/ctrl+shift+M)进行操作");
            return;
        }
    }
    var jiangLing = prompt("选择出战将灵（数字：第几个）");
    if (jiangLing === null){return main();}else{var jiangLingID = parseInt(jiangLing)-1;}
    var cityID = -1;
    if (hasCityName){
        var mapCities = GameGlaivesManager.GetInstance().mapCitys;
        for (var i = 0; i < 457; i++){
            if (mapCities[i].NodeName === cityName){
                cityID = mapCities[i].CityID;
            }
        }
    }else{
        cityID = currWindow.cityVo.CityID;
    }
    if (cityID === -1){alert("没有找到城池");return main();}
    var battleCount = prompt("请输入上兵次数，不限请输入0");
    if (battleCount === null){return main();}
    var stopPoint = parseInt(battleCount,10) ? (GameItemManager.GetInstance().GetItemByID(730102).ItemNum - (battleCount*20)) : 0;
    stopPoint = stopPoint < 0 ? 0 : stopPoint;
    // 进入上兵伐谋
    clearInterval(shangbingInterval);
    shangbingActive = true;

    GameShopManager.GetInstance().protoProxy.fakeProxy = function(t,e){
        var i=new ProtoVO;i.protoID=t,i.protoData=e,this.clientSocketSend(i)
    };
    var proxy = function(t, e){
        GameShopManager.GetInstance().protoProxy.fakeProxy(t,e);
    };
    shangbingInterval = setInterval(function () {
            if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
                GameGlaivesManager.GetInstance().ReqGlaivesOfStrategyBattle(jiangLingID,cityID);
            }else{  //如果在游戏中
                //速度自动5倍
                proxy(ProtoBufId.LOGICMSG_CREQAUTOCHESSSETRESPONSERATE, {
                    rate: 5
                });

                //牌局中出现结算按钮，离开游戏
                if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                    GameContext.LeaveGameScene();
                    if (GameItemManager.GetInstance().GetItemByID(730102).ItemNum === stopPoint){
                        clearInterval(shangbingInterval);
                        shangbingActive = false;
                        setTimeout(function(){alert("上兵已刷完");return main();}, 2000);
                        return;
                    }
                    if (GameGlaivesManager.GetInstance().mapCityDic.Maps[cityID].Country === GameGlaivesManager.GetInstance().country){
                        clearInterval(shangbingInterval);
                        shangbingActive = false;
                        setTimeout(function(){alert("当前城池已属于己方势力");return main();}, 2000);
                        return;
                    }
                }
            }
        }, 1000);
}
function hongBao(){
    if (!checkActive("bonusActive")){return main();}
    var lastDate = localStorage.getItem("lastDate");
    if ((lastDate !== null && new Date().getDate() !== parseInt(lastDate)) || lastDate === null){   //换天或者首次，设置initYB和lastDate
        localStorage.setItem("initYB", GameItemManager.GetInstance().GetItemByID(100002).ItemNum);
        localStorage.setItem("lastDate", new Date().getDate());
        localStorage.setItem("hbCount", 0);
    }
    var ybGain = GameItemManager.GetInstance().GetItemByID(100002).ItemNum - parseInt(localStorage.getItem("initYB"));
    var minhongBao = parseInt(prompt("今天已抢"+GameGuildManager.GetInstance().SelfGuildInfo.guildBonusReceive.times+"个红包\n已经获得"+ybGain+"元宝。\n请设置最小红包单价\n红包为500元宝，10份，则单价就是50"),10);
    if (minhongBao === null){return main();}
    bonusActive = true;
    clearInterval(bonusInterval);
    bonusInterval = setInterval(function(){
        var bonusGetter = GameGuildManager.GetInstance();
            bonusGetter.guildBonusList.breakForEach(function(e,i){
                 if (i.CanReceive() && minhongBao <= i.goldNum/i.pieceNum){
                     GameGuildManager.GetInstance().ReqGuildBonusReceive(i.pkID);
                     var hbCount = parseInt(localStorage.getItem("hbCount"));
                     if (i.CanReceive() === false){ //如果收取成功
                         hbCount += 1;
                         localStorage.setItem("hbCount", hbCount);
                     }
                     if (hbCount === 30){
                         clearInterval(bonusInterval);
                         bonusActive = false;
                         var ybGain = GameItemManager.GetInstance().GetItemByID(100002).ItemNum - parseInt(localStorage.getItem("initYB"));
                         setTimeout(function(){alert("每日30个红包已刷完，已得"+ybGain+"元宝");return main();}, 2000);
                     }
                 }
            });
    },1000);
}
//通过每周比较数据算出7日的争霸
function gongHui(){
    $.getScript("//unpkg.com/xlsx/dist/shim.min.js",function(){
        $.getScript("//unpkg.com/xlsx/dist/xlsx.full.min.js",function(){
            var type = prompt("请选择考勤模式：每日三鼓1，七日贡献2，本周胜场3，本月胜场4，抢红包名单5,上兵排行6");
            switch (type){
                case "1":
                    todayDrum();
                    break;
                case "2":
                    weekContribution();
                    break;
                case "3":
                    weekBattle();
                    break;
                case "4":
                    monthBattle();
                    break;
                case "5":
                    bonusReceive();
                    break;
                case "6":
                    shangBingGongHui();
                    break;
                default:
                    main();
                    break;
            }
        });});
}
function todayDrum(){
    var copy = confirm("是否将该玩家的本日敲鼓次数一并复制？");
    var userList = [];
    GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = GameGuildManager.GetInstance().guildUserList.Maps;
    var tempList = [];
        userList.forEach(function(userID){
            if (maps[userID].drumsTimes < 3){
                if(copy){
                    tempList.push([maps[userID].user.nickname, maps[userID].drumsTimes]);
                }else{
                    tempList.push([maps[userID].user.nickname]);
                }

            }
        });
    var sortedList = tempList.sort(function(a, b) {
        return b[1] - a[1];    // sort by length
    });
    sortedList.unshift(["名字","本日敲鼓次数"]);
    var date = new Date();
    var filename = "("+(date.getMonth()+1) + "月" + date.getDate()+ "日)本日三鼓未满名单.xlsx";
    var ws_name = "Q群957630760";
    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(sortedList);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}
function weekContribution(){
    var contribution = prompt("查找本周贡献小于多少的玩家？（不包含等于）");
    var copy = confirm("是否将该玩家的本周贡献一并复制？");
    var contri = parseInt(contribution);
    var userList = [];
    GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = GameGuildManager.GetInstance().guildUserList.Maps;
    var tempList = [];
    userList.forEach(function(userID){
        if (maps[userID].contribution < contri){
            if (copy){
                tempList.push([maps[userID].user.nickname, maps[userID].contribution]);
            }else {
                tempList.push([maps[userID].user.nickname]);
            }
        }
    });
    var sortedList = tempList.sort(function(a, b) {
        return b[1] - a[1];    // sort by length
    });
    sortedList.unshift(["名字","本周贡献"]);
    var date = new Date();
    var filename = "("+(date.getMonth()+1) + "月" + date.getDate()+ "日)本周贡献未满名单.xlsx";
    var ws_name = "Q群957630760";
    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(sortedList);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}
function weekBattle(){
    var battle = prompt("查找本周争霸赛胜场小于多少的玩家？（不包含等于）");
    var copy = confirm("是否将该玩家的本周胜场一并复制？");
    var battleWin = parseInt(battle);
    var userList = [];
    GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = GameGuildManager.GetInstance().guildUserList.Maps;
    var tempList = [];
    userList.forEach(function(userID){
        if (maps[userID].battleWinTimes < battleWin){
            if (copy){
                tempList.push([maps[userID].user.nickname,maps[userID].battleWinTimes]);
            }else {
                tempList.push([maps[userID].user.nickname]);
            }
        }
    });
    var sortedList = tempList.sort(function(a, b) {
        return b[1] - a[1];    // sort by length
    });
    sortedList.unshift(["名字","本周胜场"]);
    var date = new Date();
    var filename = "("+(date.getMonth()+1) + "月" + date.getDate()+ "日)本周胜场未满名单.xlsx";
    var ws_name = "Q群957630760";
    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(sortedList);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}
function monthBattle(){
    var battleMo = prompt("查找本月争霸赛胜场小于多少的玩家？（不包含等于）");
    var copy = confirm("是否将该玩家的本月胜场一并复制？");
    var battleWinMo = parseInt(battleMo);
    var userList = [];
    GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = GameGuildManager.GetInstance().guildUserList.Maps;
    var tempList = [];
    userList.forEach(function(userID){
        if (maps[userID].dataStatistics.currentMonth.battleWinTimesTotal < battleWinMo){
            if (copy){
                tempList.push([maps[userID].user.nickname,maps[userID].dataStatistics.currentMonth.battleWinTimesTotal]);
            }else {
                tempList.push([maps[userID].user.nickname]);
            }
        }
    });
    var sortedList = tempList.sort(function(a, b) {
        return b[1] - a[1];    // sort by length
    });
    sortedList.unshift(["名字","本周胜场"]);
    var date = new Date();
    var filename = "("+(date.getMonth()+1) + "月" + date.getDate()+ "日)本月胜场未满名单.xlsx";
    var ws_name = "Q群957630760";
    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(sortedList);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}
function bonusReceive(){
    var userList = [];
    GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = GameGuildManager.GetInstance().guildUserList.Maps;
    var tempList = [];
    userList.forEach(function(userID){
        if (maps[userID].guildBonusReceive !== null){
            tempList.push([maps[userID].user.nickname,maps[userID].guildBonusReceive.times]);
        }
    });
    var sortedList = tempList.sort(function(a, b) {
        return b[1] - a[1];    // sort by length
    });
    sortedList.unshift(["名字","抢红包次数"]);
    var date = new Date();
    var filename = "("+(date.getMonth()+1) + "月" + date.getDate()+ "日)本日抢红包名单.xlsx";
    var ws_name = "Q群957630760";
    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(sortedList);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}
function shangBingGongHui(){
    var currWindow = WindowManager.GetInstance().lastPopupGameWindow;
    if (currWindow === null || typeof currWindow === "undefined" || typeof currWindow.name === "undefined" || currWindow.name !== "GameGlaivesRewardWindow"){
        alert("读取信息失败！请按提示操作\n进入上兵伐谋模式-点开左上角的奖励窗口-点击公会奖池\n然后重新呼出脚本(ctrl+M/ctrl+shift+M)进行操作");
        return;
    }
    var maps = GameGuildManager.GetInstance().guildUserList.Maps;
    var guildRankInfo = currWindow.rankInfo.userScoreRankList;
    if (guildRankInfo[0].guildRewardPool.length === 0 || guildRankInfo[0].userRewardPool.length === 0){
            alert("识别失败！\n请重新打开奖励-公会奖池（需要从窗口中读取信息）\n然后重新运行上兵脚本");
            return;
    }
    var rankList = [];
    rankList.push(["游戏名","积分","公会财富","公会经验","上兵箱子","绿石头","公会贡献"]);
    guildRankInfo.forEach(function(user){
        //名字，积分，公会财富,公会经验,上兵箱子，石头，公会贡献
        rankList.push([maps[user.userID].user.nickname, user.totalScore, user.guildRewardPool[0].Num, user.guildRewardPool[1].Num, user.userRewardPool[0].Num,user.userRewardPool[1].Num,user.userRewardPool[2].Num]);
    });
    $.getScript("//unpkg.com/xlsx/dist/shim.min.js",function(){
        $.getScript("//unpkg.com/xlsx/dist/xlsx.full.min.js",function(){
            var filename = "上兵伐谋公会成员贡献名单.xlsx";
            var data = rankList;
            var ws_name = "Q群957630760";
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, ws_name);
            XLSX.writeFile(wb, filename);
        });
    });
}

