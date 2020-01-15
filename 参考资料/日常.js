/*
自动刷日常
使用方法
step 1: 通过https://web.sanguosha.com/login/index.html进入游戏(注意是https)，然后按ctrl+shift+i呼出控制台。
step 2: 将框架切换成index.php，不懂百度“XX浏览器控制台切换框架”
step 3：复制黏贴代码到控台，回车。
请不要传播，不然我只能锁链接了。
*/

//定义proxy
var proxy = function(t, e){
    GameGuildManager.GetInstance().protoProxy.LE87(t,e);
};

//每日签到
DailySignManager.GetInstance().ReqGetSignInReward(1, DailySignManager.GetInstance().initSignDate);

//TODO 如果有周奖励 自动领取

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


