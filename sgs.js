$(document).ready(function(){
    var currUser = localStorage.getItem("AVusername");
    var currPass =  localStorage.getItem("AVpassword");
    var message;
    var username;
    var password;
    if (!currUser || !currPass){    //如果没有user和password
        message = "欢迎使用代码杀：登录请按1，注册请按2"
    }else{
        message = "您当前代码杀账户为："+ currUser+" 切换账号请按1，注册请按2，自动登录请按3";
    }
    var loginStr = prompt(message);
    var login = parseInt(loginStr);
    if (login === 2){
        window.open(
            'https://docs.qq.com/doc/DVERHVU5vdkFzVGpX',
            '_blank' // <- This is what makes it open in a new window.
        );
        return;
    }else if (login === 1){
        username = prompt("请输入用户");
        password = prompt("请输入密码");
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
                    'https://docs.qq.com/doc/DVERHVU5vdkFzVGpX',
                    '_blank' // <- This is what makes it open in a new window.
                );
            });
        });
    }
});




