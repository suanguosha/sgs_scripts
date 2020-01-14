// ==UserScript==
// @name         三国杀助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  三国杀助手,不用手打三国杀！
// @author       LDY681
// @match        http*://web.sanguosha.com/*
// @grant        none
// ==/UserScript==

//如果协议是http，重定向，然后登录
window.onload = function () {
    if (window.name !== "") {
        window.name = "";
        logIn();
    }
};

if (window.location.protocol !== "https:") {
    reloadP();
}

function reloadP() {
    window.name = "重定向。。。";
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

function logIn() {
    setTimeout(function(){
        if (document.getElementsByClassName('dobest_de_btn')[0] === undefined || document.getElementsByTagName("input")[0].value === "" || document.getElementsByTagName("input")[1].value === "") {
            alert("已屏蔽before.min.js，请重新登录");
        }else{
            document.getElementsByClassName('dobest_de_btn')[0].click();
            setTimeout(function () {
                if (document.getElementsByClassName('dobest_btn_blue dobest_btn_login')[0] !== undefined) {
                    alert("请输入验证码");
                }
            }, 500);
        }
    },2000);
}

$(document).ready(function(){
    function simulateKeyPress(character) {
        jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
    }

    $(function() {
        $('body').keypress(function(e) {
            alert(e.which);
        });
        simulateKeyPress("e");
    });

});
/*
x = document.getElementsByTagName("iframe")[0];
y = x.contentWindow.document.getElementsByTagName("iframe")[0]
y.contentWindow.document.gameGuildManager
*/