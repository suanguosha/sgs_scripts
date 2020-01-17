$(document).ready(function(){
    main();
});

function main(){
            var confirm = confirm("欢迎使用代码杀：登录点确定，注册点取消");
            if (!confirm){
                window.open(
                    'https://docs.qq.com/doc/DVERHVU5vdkFzVGpX',
                    '_blank' // <- This is what makes it open in a new window.
                );
                return;
            }
            var username = prmopt("请输入用户");
            var password = prompt("请输入密码");
            if (username !== null && password !== null){
                $.getScript("//cdn.jsdelivr.net/npm/leancloud-storage@3.14.0/dist/av-min.js", function(){
                    var { Query, User } = AV;
                    AV.init({appId: 'NfWGojPRuRF4Oxap1AopJmwr-MdYXbMMI', appKey: 'SenLjQ9pdilz63KeDxsWTmjL'});
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
}



