$(document).ready(function(){
    main();
});

function main(){
        //检测框架
        if (typeof SceneManager !== "undefined"){   //TODO:改成 ===
            alert("您当前框架不为index.php，请自行百度“XX浏览器控制台切换框架”，然后重新运行脚本");
        }else{
            var username = prompt("请输入账号");
            var password = prompt("请输入密码");
            if (username !== null && password !== null){
                $.getScript("//cdn.jsdelivr.net/npm/leancloud-storage@3.14.0/dist/av-min.js", function(){
                    var { Query, User } = AV;
                    AV.init({appId: 'NfWGojPRuRF4Oxap1AopJmwr-MdYXbMMI', appKey: 'SenLjQ9pdilz63KeDxsWTmjL'});
                    AV.User.logOut();
                    AV.User.logIn(username, password).then(function(){
                        var query = new AV.Query('_File');
                        query.first().then(function (file){
                            $.getScript("sgs_scripts.js");   //改成file.get("url")
                        });
                    }, function () {
                        alert("请联系ldydyx@gmail.com");
                    });
                });
            }
        }
}



