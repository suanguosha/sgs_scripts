// ==UserScript==
// @name         三国杀助手
// @namespace    http://tampermonkey.net/
// @version      1.0.7
// @description  代码杀，我爱杀！
// @author       DaiMaSha
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_notification
// ==/UserScript==

//如果http，改https
if (window.location.host === "web.sanguosha.com"){
    if (window.location.protocol !== "https:") {
        window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }else{
        //首次登录提醒
        if (localStorage.getItem("firstLogin") === null){
            localStorage.setItem("firstLogin","no");
            alert("新手教程\n（在游戏页任意位置点下鼠标）代码会自动复制到剪贴板\n打开控台时，询问是否重载页面，请点击取消");
        }

        //防止枸杞重定向
        window.onbeforeunload = function() {
            return "蒸蒸日上";
        };

        //自动复制代码
        window.onclick = function(){
            navigator.clipboard.writeText("$.ajax('https://daimasha.github.io/sgs/sgs.js', {dataType: 'jsonp'})");
            GM_setValue("elfReminder",localStorage.getItem("elfReminder"));
        }
    }
}
window.onload = () => {
    var pushback = [];
    GM.getValue("elfReminder").then(function(reminder){
        var currTime = Math.round((new Date()).getTime() / 1000);
        var elfReminder = JSON.parse(reminder);
        console.log(elfReminder);
        var leftReminder = [];
        elfReminder.forEach(function (elf,index) {
            var notified = false;
            if (currTime > parseInt(elf[1])){
                GM_notification(elf[0]+ '的将灵可以出征了',"将灵出征提醒");
                notified = true;
            }
            if (currTime > parseInt(elf[2])){
                GM_notification(elf[0]+ '的将灵可以领取聚宝盆了',"将灵聚宝盆提醒");
                notified = true;
            }
            if (notified === false){
                leftReminder.push(elf);
            }
        });
        GM.setValue("elfReminder",JSON.stringify(leftReminder));
    });
};