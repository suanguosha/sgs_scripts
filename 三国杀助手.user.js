// ==UserScript==
// @name         三国杀助手
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  代码杀，我爱杀！
// @author       LDY681
// @match        http*://web.sanguosha.com/*
// @grant        none
// ==/UserScript==

//如果http，改https
if (window.location.protocol !== "https:") {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

setTimeout(function(){
    //防止枸杞重定向
    window.onbeforeunload = function() {
        return "蒸蒸日上";
    };

    //自动复制代码
    navigator.clipboard.writeText("$.ajax('https://www.zssanguo.com/sgs/sgs.min.js', {dataType: 'jsonp'})");
},2000);

//首次登录提醒
document.addEventListener("mousemove", alertFirstLogin);

function alertFirstLogin() {
    if (localStorage.getItem("firstLogin") === null){
        localStorage.setItem("firstLogin","no");
        alert("新手教程（之后不会提示）\n代码会自动帮您复制到剪贴板\n打开控台时，询问是否重载页面，请点击取消");
    }
    document.removeEventListener("mousemove", alertFirstLogin);
}