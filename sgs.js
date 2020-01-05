$(document).ready(function(){
    if (typeof SceneManager === "undefined"){
        alert("检测到您当前框架不为index.php，请自行百度“XX浏览器控制台切换框架”");
    }
    var username = prompt("脚本作者LDY681，仅限内部使用！请输入账号");
    var password = prompt("请输入密码");
    $.getScript("//cdn.jsdelivr.net/npm/leancloud-storage@3.14.0/dist/av-min.js", function(){
        var { Query, User } = AV;
        var APP_ID = 'NfWGojPRuRF4Oxap1AopJmwr-MdYXbMMI';
        var APP_KEY = 'SenLjQ9pdilz63KeDxsWTmjL';
        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });
        AV.User.logIn(username, password).then(function(user){
                var query = new AV.Query('_File');
                query.get("5e117809c2b5a500086fa6fb").then(function (file) {
                    $.getScript(file.get("url"), function(){
                        main();
                    });
                });
            }, function (error) {
                alert("请联系ldydyx@gmail.com");
            });
        });
});



