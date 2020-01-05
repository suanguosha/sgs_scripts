/*
//各种scene和window
var interval = setInterval(function(){
    GuildCircleLogItemUI.prototype.onReceiveBonus = function(t,e){
        alert("收到红包了");
        clearInterval(interval);
    };
},500);


var t = this.logInfo.GetGuildBonusPkID();
if (this.logInfo && t) {
    var e = GameGuildManager.GetInstance().GetGuildBonusById(t);
    if (e) {
        var i = e.userIDs.indexOf(UserData.Self.UserBrief.userID) >= 0,
            n = e.expireTime <= TimerManager.GetInstance().ServerTime;
        if (!i) {
            if (e.userIDs && e.userIDs.length >= e.pieceNum) return UIUtils.ShowTextPrompt(words.GUILD_TIP_16), void 0;
            if (!n) {
                var o = GameGuildManager.GetInstance().SelfGuildInfo.user.guildJoinTime;
                return 0 == o || o > TimerManager.GetInstance().ServerTime - 86400 ? (UIUtils.ShowTextPrompt(words.GUILD_TIP_20), void 0) : UserData.Self.SelfVipForever ? UserData.Self.UserLevel < e.userLevel ? (UIUtils.ShowTextPrompt(StringUtils.Format(words.GUILD_TIP_14, e.userLevel)), void 0) : GameGuildManager.GetInstance().SelfGuildInfo.contribution < e.userGuildContribution ? (UIUtils.ShowTextPrompt(StringUtils.Format(words.GUILD_TIP_15, e.userGuildContribution)), void 0) : (GameGuildManager.GetInstance().ReqGuildBonusReceive(t), void 0) : (UIUtils.ShowTextPrompt(words.GUILD_TIP_19), void 0)
            }
        }
    }
}
*/
