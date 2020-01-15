
function getQueryByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}



// 获取微端版本号
function cefVersion() {
    if (typeof cefBrowserVersion == "function") {
        return cefBrowserVersion();
    }else {
        return "";
    }
}





// 只支持到ie10浏览器
function isIE10() {
    var DEFAULT_VERSION = 10.0;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var safariVersion;
    if(isIE){
        safariVersion =  ua.match(/msie ([\d.]+)/)[1];
    }
    if(safariVersion < DEFAULT_VERSION ){
        return true;
    }else{
        return false;
    }
}


// 判断是不是qq浏览器的IE模式
function isQQIEMode(){
    var userAgent = navigator.userAgent;
    if(userAgent.indexOf('QQBrowser') > -1 && (!!window.ActiveXObject || 'ActiveXObject' in window)){
        return true;
    }else{
        return false;
    }
}


// 360安全浏览器和360急速浏览器的兼容模式是IE内核的低版本
function is360Bros(){
    var userAgent = navigator.userAgent;
    if(userAgent == "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; rv:11.0) like Gecko" && ('ActiveXObject' in window)){
        return true;
    }else{
        return false;
    }
}







// 第三方登录
function links(count) {
    if (count == 1) {
        var infos = "<div class='alert-short'><iframe width='100%' height='336px' frameborder='no' scrolling='auto' style='overflow: auto;' src='/login/feihuo.html' target='_self'></iframe></div>"
    }

    if (count == 2) {
        // var infos = "<div class='alert-long'><div class='alert-long'><iframe width='100%' height='480px' frameborder='no' scrolling='auto' style='overflow: auto;' src='/login/baidu.html' target='_self'></iframe></div></div>"
        var u =  "/login/baidu.html"
        location.href=u;
        return;
    }

    if (count == 3) {
        // var infos = "<div class='alert-long'><div class='alert-long'><iframe width='100%' height='480px' frameborder='no' scrolling='auto' style='overflow: auto;' src='/login/renren.html' target='_self'></iframe></div></div>"
        // 人人网http 跳到https 会302,iframe里面有白屏，改成本网页的形式
        var url2 =  "/login/renren.html"
        location.href=url2;
        return;
    }
    if (count == 4) {
        var infos = "<div class='alert-long'><div class='alert-long'><iframe width='100%' height='480px' frameborder='no' scrolling='auto' style='overflow: auto;' src='/login/sina.html' target='_self'></iframe></div></div>"
    }
    if (count == 5) {
        var infos = "<div class='alert-long'><div class='alert-long'><iframe width='100%' height='480px' frameborder='no' scrolling='auto' style='overflow: auto;' src='/login/wechat.html' target='_self'></iframe></div></div>"
    }
    if (count == 6) {
        // var infos = "<div class='alert-long'><div class='alert-long'><iframe width='100%' height='480px' frameborder='no' scrolling='auto' style='overflow: auto;' src='/login/qq.html' target='_self'></iframe></div></div>"
        var url3 =  "/login/qq.html"
        location.href=url3;
        return;
    }



    $(".alert-info").html(infos);
    showDiv($(".alert"));
}

// cookie 操作
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


function setTicketCookie(name, value){
    var exdate = new Date();
    exdate.setTime(exdate.getTime()+5*60*1000); //设置date为当前时间+5分
    document.cookie = name + "=" + escape(value) + ";domain=sanguosha.com;expires=" + exdate.toGMTString();
}


function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ";domain=sanguosha.com" +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}




function popup(popupName) {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        popupHeight = $(popupName).height(),
        popupWidth = $(popupName).width(),
        _posiTop = (windowHeight - popupHeight) / 2,
        _posiLeft = (windowWidth - popupWidth) / 2;
    if (windowHeight > popupHeight) {
        $(popupName).css({"left": _posiLeft + "px", "top": _posiTop + "px", "bottom": ""});
    } else {
        $(popupName).css({"left": _posiLeft + "px", "top": "5px", "bottom": "5px", "overflow": "auto"});
    }
    ;
};
function showDiv(popupName) {
    $(popupName).fadeIn();
    popup(popupName);
    $(window).resize(function () {
        popup(popupName);
    });
};
$(".alert-close").on("click", function () {
    $(this).parents(".alert").fadeOut();
});




// 点击进入游戏
function play(num) {

    if(areaStatus){
        if(areaStatus[num] == 2){
            return;
        }
    }

    // 如果是进入新服100 并且是IE10一下的浏览器则提示用微端下载
    if(num === 100 && isIE10()){
        $('.mask').show();
        $('#ie9low').show();

        // 自动下载微端地址.后续修改。TODO:
        window.location = 'https://dlsgsnew.sanguosha.com/pc/Sgsc10thinstall.exe';
        return;
    }else if(num === 100 && isQQIEMode()){
        $('.mask').show();
        $('#qq_brows').show();
        return;
    }else if(num === 100 && is360Bros()){
        $('.mask').show();
        $('#brows360').show();
        return;
    }

    if(ticket){
        goInGame(num,ticket)
    }else{
        h5GameLogin.ssoLogin(num)
        return;
    }

};


function goInGame(num,ticket){
    // 这里来判断各个服务器的状态，如果是状态2则不能点击
    // 如果传入了back_id则进入游戏的时候需要带上
    var url = '/login/game.html';
    var backId = getQueryByName('back_id');

    if(backId != undefined){
        url += "?back_id="+backId;
    }
    if(window.inputUserId != undefined){
        url += "&account=" + window.inputUserId;
    }



    $.ajax({
        type: "GET",
        url: url,
        data:{
            area_id:num,
            ticket:ticket,
            snda_id: window.SNDAID
        },
        datetype: 'html',
        success: function (res) {

            if(res.status == 0){
                // 老服还是iframe。新服直接跳转不用iframe的方式
                // autoLoginMaxAge  解析url,将isAutoLogin 传递过去。
                var url = res.data.url;

                if(num == 100 && autoLoginMaxAge){
                    url = url + '&isAutoLogin='+autoLoginMaxAge
                }

                if(num === 100){
                    location.href = url;
                }else{
                    h5GameLogin.init(url)
                }

            }else{
                alert(res.msg)
                return;
            }
        }
    });
}



$(function () {
    var areaid = 5;
    // 微端环境判断,老的微端环境里，不要serverlist
    var ceFVer = cefVersion();
    if(ceFVer == 101){
        $('.game_ser_list,#swOldList,#video,#norWebSer').hide();
        $('#newMirClint').show();
        $('#warp').addClass('hasBg');
    }





    // init ykLoginSDK
    ykLogin(
        '#dobest_login_app',
        {
            appId: 485,  //应用的appId
            // areaId: 1,   //应用的areaId
            areaId: 0,   //应用的areaId
            pm: 2,       //应用的pm
            serviceUrl: "http://www.sanguosha.com", // serviceUrl 必须要到后端签名。签名成功后才可以，否则非法url
            appTemplate: function () {
                return {
                    staticTpl: this.transformTemplate(function () {
                        /*
                         <div class="dobest_login_form">
                         <div class="dobest_error" id="dobest_error">
                         <i class="dobest_icon_alert"></i>
                         <span class="dobest_error_txt" id="dobest_error_txt"></span>
                         </div>
                         <div class="dobest_field dobest_username dobest_input_focus">
                         <div class="login-title">
                         <em></em>
                         </div>
                         <input type="text" class="dobest_input" tabindex="1" maxlength="50" id="dobest_inputUserId" placeholder="手机/邮箱/个性账号" />
                         <div class="dobest_register">
                         <a href="https://splus2.dobest.cn/register?appId=205&amp;tabIndex=username&amp;returnUrl=http://web.sanguosha.com/login/index.html"  target="_blank"></a>
                         </div>
                         </div>
                         <div class="dobest_field dobest_pwd">
                         <div class="login-title">
                         <em class="login-psw"></em>
                         </div>
                         <input type="password" class="dobest_input" tabindex="2" maxlength="40" id="dobest_password" placeholder="静态密码">
                         <div class="dobest_find">
                         <a href="http://pwd.dobest.cn/?pwdchoose=findpwd"  target="_blank"></a>
                         </div>
                         </div>
                         <div class="dobest_extra">
                         <label class="dobest_ex_checkbox"><input type="checkbox" name="autoLogin"  id="dobest_autoLogin" /></label>
                         <a href="javascript:;" class="alogin_img"></a>
                         </div>
                         <div class="dobest_field_btn">
                         <a class="dobest_de_btn" href="javascript:;" tabindex="3" id="dobest_loginBtn">登录</a>
                         </div>
                         </div>
                         */
                    }),

                    yzmTpl: this.transformTemplate(function () {
                        /*
                         <div class="dobest_login_form">
                         <div class="dobest_error" id="dobest_error"><i class="dobest_icon_alert"></i><span class="dobest_error_txt" id="dobest_error_txt"></span></div>
                         <div class="dobest_field dobest_yzm">
                         <div class="yzm-title">
                         </div>
                         <input type="text" class="dobest_input" id="dobest_yzm_code" placeholder="验证码">
                         </div>
                         <div class="dobest_yzm_box yzm-names" id="dobest_cannse">
                         <span class="dobest_yzm_con"></span><a href="javascript:;" class="dobest_color_blue">看不清</a>
                         </div>
                         <div class="dobest_field_btn">
                         <a class="dobest_btn_blue dobest_btn_login" href="javascript:;" id="dobest_de_btn" style="text-indent:-9999px">登录</a>
                         <a class="dobest_btn_gray dobest_btn_cancel" href="#" id="dobest_btn_cancel" style="display:none">取消</a>
                         </div>
                         </div>
                         */
                    })
                }
            },

            loginSuccessCallBack: function (ticket, resultData) {
                // 将ticket 存入cookie，ticket 有效期5分钟

                // 如果返回autoLoginMaxAge字段则表示是此时登录是自动登录。
                window.autoLoginMaxAge = resultData.autoLoginMaxAge
                window.ticket = ticket;

                // 刷新页面这个方法是一直执行的，不同的第二次刷新调用的ssoLogin 这个接口不会返回resultData.inputUserId
                if(resultData.inputUserId != undefined){
                    // resultData.inputUserId 这个要存为cookie了。下次ssoLogin 要用
                    setCookie('SGSINPUTERID',resultData.inputUserId, 1111)
                    getNickName(resultData.inputUserId,resultData.sndaId)
                    window.inputUserId = resultData.inputUserId;
                }else{
                    // 重新获取用户名和服务器列表状态
                    var sgsInputId = getCookie('SGSINPUTERID');
                    // if(sgsInputId){
                    //    getNickName(sgsInputId)
                    // }
                    getNickName(sgsInputId,resultData.sndaId)
                    window.inputUserId = sgsInputId;
                }

                var serverId = getCookie('CHOOSEVERID') || null;
                // 去获取老服的nickaname
                if(serverId == 1100){
                    getOldServName(window.inputUserId)
                }


                // 保存 sndaId ,选服务的时候去判断实名认证
                window.SNDAID = resultData.sndaId;


                $('.nologin').hide();
                $('.server_box').show();
            },
            ssoLogin: true,
            loginWays: '密码登录',  // 配置登录项 (可以采用默认的tab结构，也可以调用单个独立独立，可以自己结合起来)
            // statistics1: 'a1,2,a2,3,signature',// 云更新参数,有签名校验的
            // statistics2: 'b,2,a2,3', //项目组自定义参赛)
            showTabs: false
            // ,smslogintype: 2 // 开启极简登录为2，不开启为3 或默认不填此参数
            // debug: {
            //        yzm: true
            //  }
        }
    )


    // 获取老服的nickname
    function getOldServName(inputUserId){
        $.ajax({
            type: "GET",
            url: '/login/ol/nickname.html',
            data:{
                account:inputUserId || ''
            },
            datetype: 'html',
            success: function (res) {
                if(res.code == 0){
                    window.oldSerName = res.data.Name;
                    $('#nickname').html(res.data.Name)
                }
            }
        })
    }





    // 获取用户名。刷新的时候要用
    function getNickName(inputUserId, sndaId){
        // var serverId = getCookie('CHOOSEVERID') || null;

        // 老服的接口是 login/ol/nickname.html?account=fuyunlong@outlook.com
        // 新服的接口是 '/login/area.html'


        $.ajax({
            type: "GET",
            url: '/login/area.html',
            data:{
                account:inputUserId || '',
                snda_id: sndaId
            },
            datetype: 'html',
            success: function (res) {


                if(res.code == 0){
                    // 各服务器的状态: 1是正常的，2是维护中

                    // 这里的Nickname 为新服的
                    // window.nickName = res.data.nickname;
                    window.newSerNickName = res.data.nickname;
                    window.areaStatus = res.data.area_status;

                    var serverId = getCookie('CHOOSEVERID') || null;
                    if(serverId == 100){
                        $('#nickname').html(res.data.nickname)
                    }

                    var serverStat = res.data.area_status;

                    for(var ser in serverStat){
                        if(ser == 100){
                            if(serverStat[ser] == 2){
                                $('.sever_status').addClass('status_weihu').show()
                            }else{
                                $('.sever_status').removeClass('status_weihu').hide()
                            }
                        }

                        // 老服
                        if(ser == 1100){
                            if(serverStat[ser] == 2){
                                $('.oldstus').removeClass('status_99').addClass('status_weihu').show()
                            }else{
                                $('.oldstus').removeClass('status_weihu').addClass('status_99').show()
                            }

                        }

                    }

                    // 账号有特殊字符要弹提示
                    if(res.data.is_special == 1){
                        $('.mask').show();
                        $('#hasInvaliText').show();
                    }


                    // 实名认证弹层
                    if(res.data.is_real_name == 0){
                        window.ISUSERNEEDIDAUTH = true
                        // $('#prizeSer_'+serverId).show().siblings('.prize-list').hide();
                        // $('#authWrapP').show();
                    }



                }else{
                    alert(res.msg)
                    return;
                }
            }
        });

    }


    // 获取老服的公告
    function getOldMsg(){
        $.ajax({
            type: "GET",
            url: '/login/notice_old.html',
            data:{},
            datetype: 'html',
            success: function (res) {
                if(res.code == 0){
                    $('#versonContent').html(res.data);
                    $('.mask').show();
                    $("#pop2").show();
                }else{
                    alert(res.msg)
                    return;
                }
            }
        })
    }


    // 获取新服公告
    function getNewserNote(){
        // 判断版本号
        // 先判断本地有没有保存版本号。如果没有，就不传version。 如果有传递
        var localCookie = getCookie('SGSCLIENT_VERSION');
        var url = localCookie != null ? '/login/notice.html?version='+ localCookie : '/login/notice.html'

        $.ajax({
            type: "GET",
            url: url,
            datetype: 'html',
            success: function (res) {
                if(res.code == 0){
                    var ver = res.data.version;
                    var notice = res.data.notice;
                    var isPop = res.data.is_remind;

                    $('#versonContent').html(notice);
                    $('.mask').show();
                    $("#pop2").show();
                    setCookie('SGSCLIENT_VERSION',ver, 1111)

                    // if(isPop){
                    //    showNoticeTip()
                    // }
                }
            }
        });
    }




    // 老服的公告
    $('#oldtelNote').on('click', function () {
        getOldMsg()
    })

    // 新服的公告
    $('#telNote,#telNote2').on('click', function () {
        getNewserNote()
    })

    $('.closPopBtn').on('click', function () {
        $('.mask').hide();
        $(this).parents('.pop2').hide()
    })

    $('#getBtn').on('click', function () {
        $('.mask').hide();
        $('.pop2').hide()
    })

    // 微端下载
    $('#wdDonw').on('click', function () {
        $('.mask').show();
        $('.downldPp').show()
    })


    $(".user_degree label").on("click", function () {
        $(this).toggleClass('checked');
        $('.other-enter').toggle();
        if ($(this).hasClass('checked')) {
            $("#dobest_login_app").show();
            $(".noread").hide();
        } else {
            $("#dobest_login_app").hide();
            $(".enter").hide();
            $(".noread").show();
        }

    });



    // 公告
    function showNoticeTip() {
        $('.mask').show();
        $("#pop2").show();
    }

    $('#rlogin').on('click', function () {
        $('.mask').hide();
        $("#pop1").hide();
    })


    $("#oSwith").on("click", function () {
        $(this).parent().hide();
        $(this).parent().siblings('.enter').toggle();
    });

    $(".aswitch").on("click", function () {
        $(this).parent().hide();
        $(this).parent().siblings('.enter_1').toggle();
    });







    // 新老服 选择

    if(ceFVer == 101){
        var serverId = 100;
    }else{
        var serverId = getCookie('CHOOSEVERID') || null;
    }

    $('[data-serId="'+ serverId +'"]').addClass('on');



    // 切换 老服还是新服
    $('.new_ser1').on('click',function(e){
        // 选择服的时候判断实名认证

        var sId = $(this).attr('data-serId')
        serverId = sId;
        $(this).addClass('on').siblings().removeClass('on')
        // 老服的nickname 不显示
        if(sId == 1100){
            if(window.oldSerName){
                $('#nickname').html(window.oldSerName);
            }else{
                getOldServName(window.inputUserId)
            }


        }else{
            $('#nickname').html(window.newSerNickName);
        }

    })


    // 效验身份证
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    $('#authBtn').on('click',function(){
        var uNname = $('#uName').val();
        var idCard = $('#idCard').val();
        if(uNname == ''){
            alert('姓名不能为空！');
            return;
        }

        if(idCard == ''){
            alert('身份证不能为空！');
            return;
        }else if(!idcard_patter.test(idCard)){
            alert('请输入正确的身份证号！');
            return;
        }

        getAuthS(uNname,idCard)



    })


    function getAuthS(uNname,idCard){
        $.ajax({
            type: "POST",
            url: '/api/web/realname/set',
            data:{
                name: uNname,
                id_card:idCard,
                ticket: window.ticket,
                account: window.inputUserId,
                snda_id: window.SNDAID,
                area_id: serverId
            },

            success: function (res) {
                if(res.code == 0){
                    $('#authWrapP').hide();
                    window.ISUSERNEEDIDAUTH = false;
                }else if(res.code == -2){
                    // 需要换个ticket再提交一次
                    h5GameLogin.authSsoLogin(function(){
                        getAuthS(uNname,idCard)
                    })

                }else{
                    alert(res.msg);
                    return;
                }
            }
        });
    }




    // 进入游戏，是老服还是新服
    $('#newGoInGame').on('click',function(){
        if(!serverId){
            alert('请选择老服还是新服！')
            return
        }else{
            if(window.ISUSERNEEDIDAUTH){
                // 先实名认证
                $('#prizeSer_'+serverId).show().siblings('.prize-list').hide();
                $('#authWrapP').show();
            }else{

                h5GameLogin.authSsoLogin(function(){
                    play(serverId)
                    setCookie('CHOOSEVERID', serverId , 1111)
                })



            }

        }
    })



    // 退出登录 fix 自动登录的bug
    $('#logoutBtn').on('click', function () {
        logout()
    })


})


// 退出登录逻辑
function logout(){
    delCookie('CAS_AUTO_LOGIN');
    location.href = '/login/logout.html';
}



var h5GameLogin = {
    init: function(url){
        var popFrame = '<div id="gameContainer" style="position:fixed;left:0;top:0;right:0;bottom:0;z-index:5000000"><iframe src="'+url+'" frameborder="0" allowtransparency="true" hidefocus="true" scrolling="no" width="100%" height="100%"></iframe></div>';
        $(document.body).append(popFrame);
    },

    /**
     * 登录失效，需要重新登录，重新调取登录框，第一次ticket 失效。
     * @return {[type]} [description]
     */
    relogin: function(){
        // 改成刷新页面就可以重新拿到的ticket了
        window.ticket = null;
        window.autoLoginMaxAge = null;

        location.reload();
        // $('#gameContainer').remove();
        // logout();

    },

    /**
     * 游戏中点击返回，需要将游戏iframe隐藏掉，显示登录框
     * @return {[type]} [description]
     */
    close: function(){
        // $('#gameContainer').hide();

        window.ticket = null;


        $('#gameContainer').remove();
    },

    authSsoLogin: function(callback){
        var me = this;
        var url = 'https://cas.dobest.cn/authen/ssoLogin.jsonp';
        this.ajaxHps('ssoLogin_JSONPMethod', this.formParams, url, function (e) {
            if (e.return_code === 0) {
                window.ticket = e.data['ticket']
                callback(e.data['ticket'])

            }
        })
    },

    ssoLogin: function(num){
        var me = this;
        var url = 'https://cas.dobest.cn/authen/ssoLogin.jsonp';
        this.ajaxHps('ssoLogin_JSONPMethod', this.formParams, url, function (e) {
            if (e.return_code === 0) {
                if (e.data['nextAction'] == 0) { //登录成功
                    goInGame(num,e.data['ticket']);
                }
            }
        })
    },

    autoLogin: function(num) {
        var me = this;
        var url = 'https://cas.dobest.cn/authen/autoLogin.jsonp';
        this.ajaxHps('ssoLogin_JSONPMethod', this.formParams, url, function (e) {
            if (e.return_code === 0) {
                if (e.data['nextAction'] == 0) { //登录成功
                    goInGame(num,e.data['ticket']);
                }
            }
        })
    },

    // 客户端退出的时候调用这个方法，来清空客户的cookie。要不然会出现重复登录的提示
    delClientCas: function(){
        delCookie('CAS_AUTO_LOGIN');
    },

    formParams:{
        appId:485,
        areaId:0,
        serviceUrl:'http://www.sanguosha.com',
        authenSource: 2,
        locale: 'zh_CN',
        productId: 8,
        productVersion: 'v5',
        version: 21,
        tag: 20,
        frameType: 3
    },

    ajaxHps: function(method, data, url, success, error, timeout) {
        var me = this;
        if (!navigator.cookieEnabled) {
            alert("浏览器cookie被禁用，请开启后再登录。");
            return
        }
        error = error || function(jqXHR, textStatus, errorThrown) {
            if (method.indexOf("checkAccountType") > -1 || method.indexOf("ssoLogin") > -1) {
                switch (textStatus) {
                    case "error":
                    case "parsererror":
                        me.showError("对不起，本地网络异常请确认");
                        break
                }
            } else {
                switch (textStatus) {
                    case "timeout":
                        me.showError("对不起，网络超时请重试");
                        break;
                    case "parsererror":
                        me.showError('对不起服务端返回数据格式错误，请稍后再试');
                    /*default:
                        alert("对不起，网络繁忙请重试");
                        break;*/
                }
            }
        };
        timeout = typeof timeout == "number" ? timeout : 5000;
        var obj = {
            type: "GET",
            crossDomain: true,
            url: url,
            cache: false,
            data: data,
            dataType: "jsonp",
            jsonpCallback: method,
            jsonp: "callback",
            success: success,
            error: error,
            timeout: timeout,
            complete: function(jqXHR, textStatus) {}
        };
        if (method == "random") delete obj.jsonpCallback
        return $.ajax(obj)
    }

}



$('#dobest_login_app').delegate('.dobest_ex_checkbox','click',function(){
    var isCheck = $(this).find('input[type="checkbox"]').prop("checked");
    if(isCheck){
        $(this).addClass('self_checkbox')
    }else{
        $(this).removeClass('self_checkbox')
    }
})


// 老服和flash客户端约定 关闭弹出层接口
function sgsClose() {
    h5GameLogin.close()
}





