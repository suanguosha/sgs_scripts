// ==UserScript==
// @name         三国杀助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  三国杀助手,让你重新打开控台搞事情！
// @author       LDY681
// @match        http*://web.sanguosha.com/*
// @grant        none
// ==/UserScript==

//防止枸杞重定向
window.onbeforeunload = function() {
    return "蒸蒸日上";
};

window.onload = function () {
    autologIn();
};

function autologIn() {
    setTimeout(function(){

    },1000);

    setInterval(function(){ document.getElementsByClassName('dobest_de_btn')[0].click();
        document.getElementById('newGoInGame').click(); }, 300);
}