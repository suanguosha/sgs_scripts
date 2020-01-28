$(document).ready(function(){
    var currUser = localStorage.getItem("AVusername");
    var currPass =  localStorage.getItem("AVpassword");
    var message;
    var username;
    var password;
    if (!currUser || !currPass){    //如果没有user和password
        message = "欢迎来到代码杀-最强三国杀代码辅助\n已成为代码杀会员?会员登录请输1\n还不是会员？获取会员请输2（一键加群）"
    }else{
        message = "您当前代码杀账号为："+ currUser+" 切换账号请按1，获取会员请按2，自动登录请按3";
    }
    var loginStr = prompt(message);
    var login = parseInt(loginStr);
    if (login === 2){
        window.open(
            'https://jq.qq.com/?_wv=1027&k=57gQxzG',
            '_blank' // <- This is what makes it open in a new window.
        );
        return;
    }else if (login === 1){
        username = prompt("请输入代码杀会员账号");
        password = prompt("请输入代码杀会员密码");
    }else{
        username = currUser;
        password = currPass;
    }
    if (username !== null && password !== null){
        $.getScript("//cdn.jsdelivr.net/npm/leancloud-storage@3.14.0/dist/av-min.js", function(){
            var { Query, User } = AV;
            AV.init({appId: "NfWGojPRuRF4Oxap1AopJmwr-MdYXbMMI", appKey: "SenLjQ9pdilz63KeDxsWTmjL"});
            AV.User.logOut();
            AV.User.logIn(username, password).then(function(){
                localStorage.setItem("AVusername",username);
                localStorage.setItem("AVpassword",password);
                var query = new AV.Query('_File');
                query.first().then(function (file){
                    $.getScript(file.get("url"));
                });
            }, function () {
                window.open(
                    'https://jq.qq.com/?_wv=1027&k=57gQxzG',
                    '_blank' // <- This is what makes it open in a new window.
                );
            });
        });
    }
});




