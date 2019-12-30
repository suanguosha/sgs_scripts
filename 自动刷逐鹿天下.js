/*
自动刷逐鹿天下
使用方法
step 1: 先进入游戏，然后按ctrl+shift+i呼出控制台。
有时开控台会回登录页，多再不同页面试几次，谷歌浏览器在逐鹿天下页开控台不会回登录。
step 2: 在控制台输入TableGameManager，如果没有报错，看step 4。如果有报错，看step 3。
step 3: 打开检查元素（自行百度“XX浏览器打开检查元素”）。和游戏界面互动一下（比如点聊天框），重复step 2
step 4：TODO: 如果自动挑战新关卡，则zhulu(0)。如果重复刷同一关，则zhulu(关卡数字) 例:zhulu(120)。
        改好后复制黏贴代码到控台，回车。
请不要传播，不然我只能锁链接了。
*/

zhulu(120);    //TODO:括号内改成需要的关卡数字
function zhulu(towerLevel){
    var startInterval = setInterval(function () {
        if (!SceneManager.GetInstance().CurrentScene.manager) { //如果不在游戏中
            // 不在逐鹿天下模式下进入
            if (SceneManager.GetInstance().CurrentScene.sceneName != 'NewCompeteWorldScene') {
                RoomControler.GetInstance().EnterMode(ModeIDType.MITZhuLuTianXiaNew);
                return;
            }
            // 120关
            var towerLevelID = towerLevel ? towerLevel: NewCompeteWorldManager.GetInstance().competeWorldInfo.curTowerLevelID;
            var generalList = NewCompeteWorldManager.GetInstance().GetBattleGeneralListForTemp(this.MaxGeneralCount);
            NewCompeteWorldManager.GetInstance().ReqCompeteWorldBattle(towerLevelID, generalList);
        }else{  //如果在游戏中
            //牌局中出现结算按钮，离开游戏
            if (WindowManager.GetInstance().hasWindow("GameResultWindow")) {
                GameContext.LeaveGameScene();
            }
        }
    }, 300);
};

