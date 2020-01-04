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

