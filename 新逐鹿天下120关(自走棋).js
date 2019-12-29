/*使用方法
先进入游戏，以后按ctrl+shift+i呼出控制台
然后按ctrl+shift+c呼出检视工具，和游戏界面互动一下（比如点聊天框）
在控制台输入TableGameManager，如果没有报错，那么就可以了。如果有报错，继续呼啦。
将以下代码一并复制黏贴，并回车运行*/

var startInterval = setInterval(function () {
    if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
        // 不在逐鹿天下模式下进入
        if (SceneManager.GetInstance().CurrentScene.sceneName != 'NewCompeteWorldScene') {
            RoomControler.GetInstance().EnterMode(ModeIDType.MITZhuLuTianXiaNew);
            return;
        }
        // 120关
        var towerLevelID = 120;
        var generalList = NewCompeteWorldManager.GetInstance().GetBattleGeneralListForTemp(this.MaxGeneralCount);
        NewCompeteWorldManager.GetInstance().ReqCompeteWorldBattle(towerLevelID, generalList);
    }else{  //如果在游戏中
        //牌局中出现结算按钮，离开游戏
        if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
            GameContext.LeaveGameScene();
        }
    }
}, 300);
