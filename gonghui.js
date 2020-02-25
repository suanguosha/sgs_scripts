var scriptReady = false;
$(document).ready(function(){
    $.getScript("//unpkg.com/xlsx/dist/shim.min.js",function(){
        $.getScript("//unpkg.com/xlsx/dist/xlsx.full.min.js",function(){
            scriptReady = true;
        });
    });
});

//公会
function gongHui(){
    if (scriptReady !== true){
        alert("公会管理加载中,请稍后");
        return main();
    }
    var type = prompt("公会考勤:每日三鼓1，七日贡献2，本周胜场3，本月胜场4，抢红包名单5\n上兵指挥:免战城池倒计时6,积分排行7");
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
            shangBingProtect();
            break;
        case "7":
            shangBingGongHui();
            break;
        case null:
            break;
        default:
            main();
            break;
    }
}
function todayDrum(){
    var copy = confirm("是否将该玩家的本日敲鼓次数一并复制？");
    var userList = [];
    game.GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = game.GameGuildManager.GetInstance().guildUserList.Maps;
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
    game.GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = game.GameGuildManager.GetInstance().guildUserList.Maps;
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
    game.GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = game.GameGuildManager.GetInstance().guildUserList.Maps;
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
    game.GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = game.GameGuildManager.GetInstance().guildUserList.Maps;
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
    game.GameGuildManager.GetInstance().guildUserList.forEach(function(userID){userList.push(parseInt(userID));});
    var maps = game.GameGuildManager.GetInstance().guildUserList.Maps;
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
    var currWindow = game.WindowManager.GetInstance().lastPopupGameWindow;
    if (currWindow === null || typeof currWindow === "undefined" || typeof currWindow.name === "undefined" || currWindow.name !== "GameGlaivesRewardWindow"){
        alert("读取信息失败！请按提示操作\n进入上兵伐谋模式-点开左上角的奖励窗口-点击公会奖池\n然后重新呼出脚本(ctrl+M/ctrl+shift+M)进行操作");
        return;
    }
    var maps = game.GameGuildManager.GetInstance().guildUserList.Maps;
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
function shangBingProtect(){
    var cityType = parseInt(prompt("混合免战:全城池1,郡城+关隘2,州城+郡城6/针对免战:仅限关隘3,仅限郡城4,仅限州城5"));
    if (isNaN(cityType)){return main();}
    isGoodCountry = function(t) {
        if (!t || t.CityType == game.GuildGlaivesCityEnum.CTDuCheng || t.Country == game.GameGlaivesManager.GetInstance().country){ return !1;}
        for (var e, i = t.BeforeCityID ? t.BeforeCityID.length : 0, n = 0; i > n; n++){
            if (e = game.GameGlaivesManager.GetInstance().GetMapCity(t.BeforeCityID[n]), e && e.Country == game.GameGlaivesManager.GetInstance().country) {return !0;}
        }
        return !1;
    }

    getTimeGap = function(time){
        var timeGap = time - Math.round((new Date()).getTime() / 1000);
        var date = new Date(timeGap * 1000);
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return minutes + "分" + seconds+ "秒";
    }

    var now = Math.round((new Date()).getTime() / 1000);
    var cities = game.GameGlaivesManager.GetInstance().mapCitys;
    var sortedCities = [];
    sortedCities = cities.sort(function(a, b) {
        return a.GetProtectTime() - b.GetProtectTime();
    }).filter(city => isGoodCountry(city) && city.GetProtectTime() > now && isCitySatisfied(city, cityType));
    if (sortedCities.length !== 0){
        var message = "免战城池名单如下:\n";
        sortedCities.forEach(function(city,index){
            message += (toCountry(city.Country)+city.NodeName + "/守军" + city.DefenderNum + "人/(城防:"+ (city.DefenceTotal-city.DefenceDestroy)+"/"+city.DefenceTotal + ")/免战剩余时间:"+getTimeGap(city.GetProtectTime())+"\n");
        })
        prompt(message);
    }else{
        alert("没有城池是免战的");
    }
}
