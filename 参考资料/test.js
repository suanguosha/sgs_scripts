如何快速结束游戏
proxy(ProtoBufId.LOGICMSG_MSGGAMEOVER, {
    gameModel: 18,
    result: 1,
    playerResult: [{
        status: 0,
        figure: 1,
        result: 1,
        exp: 10,
        todayRewardCount: 3,
        todayMaxRewardCount: 10,
        gameQuestData: [{
            status: 2,
            rewardItem: [{
                itemID: 710012,
                num: 123
            }, {
                itemID: 710010,
                num: 1235
            }]
        }],
        itemDetail: {
            detailDatas: [{
                type: 2,
                datas: [{
                    itemID: 710010,
                    num: 1234
                }]
            }]
        },
        gameGrade: ["GameGradeQinLueRuHuo", "GameGradeBuDongRuShan", "GameGradeYunChouWeiWo", "GameGradeWenWuShuangQuan"],
        isMvp: !0,
        items: []
    }, {
        seatId: 4,
        figure: 2,
        result: 1,
        exp: 5,
        items: [{
            itemID: 200004,
            num: 1
        }]
    }, {
        seatId: 1,
        figure: 2,
        result: 1,
        exp: 5,
        items: [{
            itemID: 200004,
            num: 1
        }]
    }, {
        seatId: 2,
        figure: 4,
        result: 2,
        exp: 5,
        items: [{
            itemID: 200004,
            num: 1
        }]
    }],
    tableID: GameContext.TableId,
    isSweep: true,
    rewardLimitType: 0
});

e = {
    gameModel: 18,
    result: 1,
    playerResult: [{
        status: 0,
        figure: 1,
        result: 1,
        exp: 10,
        todayRewardCount: 3,
        todayMaxRewardCount: 10,
        gameQuestData: [{
            status: 2,
            rewardItem: [{
                itemID: 710012,
                num: 123
            }, {
                itemID: 710010,
                num: 1235
            }]
        }],
        itemDetail: {
            detailDatas: [{
                type: 2,
                datas: [{
                    itemID: 710010,
                    num: 1234
                }]
            }]
        },
        gameGrade: ["GameGradeQinLueRuHuo", "GameGradeBuDongRuShan", "GameGradeYunChouWeiWo", "GameGradeWenWuShuangQuan"],
        isMvp: !0,
        items: []
    }, {
        seatId: 4,
        figure: 2,
        result: 1,
        exp: 5,
        items: [{
            itemID: 200004,
            num: 1
        }]
    }, {
        seatId: 1,
        figure: 2,
        result: 1,
        exp: 5,
        items: [{
            itemID: 200004,
            num: 1
        }]
    }, {
        seatId: 2,
        figure: 4,
        result: 2,
        exp: 5,
        items: [{
            itemID: 200004,
            num: 1
        }]
    }],
    tableID: GameContext.TableId,
    isSweep: true,
    rewardLimitType: 0
}
i = new MsgGameOver, n = new ProtoVO;
n.protoData = e, i.ReadProtoVO(n), i.SaveRecordData();

SceneManager.GetInstance().CurrentScene.Manager.GameOverData 怎么把这个数据传给后端

proxy(ProtoBufId.LOGICMSG_MSGGAMEOVER, {
    gameModel: 18,
    result: 1,
    playerResult: [],
    tableID: GameContext.TableId,
    isSweep: true,
    rewardLimitType: 0
});

