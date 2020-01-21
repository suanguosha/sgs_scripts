// ==UserScript==
// @name         三国杀助手
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  代码杀，我爱杀！
// @author       DaiMaSha
// @match        http*://web.sanguosha.com/*
// @grant        none
// ==/UserScript==

//如果http，改https
if (window.location.protocol !== "https:") {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}else{
    //首次登录提醒
    if (localStorage.getItem("firstLogin") === null){
        localStorage.setItem("firstLogin","no");
        alert("新手教程（之后不会提示）\n代码会自动帮您复制到剪贴板\n打开控台时，询问是否重载页面，请点击取消");
    }

    //防止枸杞重定向
    window.onbeforeunload = function() {
        return "蒸蒸日上";
    };

    //自动复制代码
    navigator.clipboard.writeText("$.ajax('https://daimasha.github.io/sgs/sgs.js', {dataType: 'jsonp'})");
}