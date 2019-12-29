/*使用方法
step 1: 先进入游戏，进入逐鹿天下（有的界面开控台会重定向回登录，所以记得先进逐鹿），然后按ctrl+shift+i呼出控制台
step 2: 在控制台输入TableGameManager，如果没有报错，看step 4。如果有报错，看step 3。
step 3: 按ctrl+shift+c呼出检视工具（不同浏览器的监视工具快捷键不同，自己百度一下）。和游戏界面互动一下（比如点聊天框），重复step 2
step 4：将以下代码一并复制黏贴，并回车运行
*/

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
