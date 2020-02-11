// ==UserScript==
// @name         将灵出征聚宝提醒
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  代码杀，我爱杀！
// @author       DaiMaSha
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_notification
// ==/UserScript==


//自动复制代码
window.onclick = function() {
    if (window.location.host === "web.sanguosha.com" && localStorage.getItem("elfReminder") !== null && localStorage.getItem("elfReminder") !== JSON.stringify([])) {
        GM.getValue("elfReminder").then(function (reminder) {
            if (typeof reminder !== "undefined") {
                var elfList = JSON.parse(reminder);
                if (elfList.length !== 0) {
                    elfList = elfList.concat(JSON.parse(localStorage.getItem("elfReminder")));
                } else {
                    elfList = JSON.parse(localStorage.getItem("elfReminder"));
                }
                GM.setValue("elfReminder", JSON.stringify(elfList));
                localStorage.setItem("elfReminder", JSON.stringify([]));
            } else {
                GM.setValue("elfReminder", localStorage.getItem("elfReminder"));
                localStorage.setItem("elfReminder", JSON.stringify([]));
            }
        });
    }
};

window.onload = () => {
    GM.getValue("elfReminder").then(function(reminder){
        if (typeof reminder !== "undefined"){
            var currTime = Math.round((new Date()).getTime() / 1000);
            var elfList = JSON.parse(reminder);
            console.log(elfList.length);
            if (elfList.length !== 0){
                var leftReminder = [];
                elfList.forEach(function (elf,index) {
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
            }
        }
    });
};