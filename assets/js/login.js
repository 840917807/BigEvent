$(function() {

    $("#GoRigister").on("click", function() {
        $(".register").show();
        $(".login").hide();

    });
    $("#GoLogin").on("click", function() {
        $(".login").show();
        $(".register").hide();
    });



    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value, item) {
            if (value != $("#password").val()) {
                return "两次输入的密码不一致";
            }
        }
    });

    //注册ajax事件
    $("#register").on("submit", function(e) {
            e.preventDefault();
            let data = $("#register").serialize();
            $.ajax({
                method: 'POST',
                url: "http://www.liulongbin.top:3007/api/reguser",
                data: data,
                success: function(res) {
                    if (res.status == 0) {
                        layer.msg("注册成功!");
                        $("#GoLogin").click();
                    } else {
                        layer.msg(res.message);
                    }
                }
            })
        })
        //登录ajax事件
    $("#login").on("submit", function(e) {
        console.log("haahha");
        e.preventDefault();
        let data = $("#login").serialize();
        $.ajax({
            method: 'POST',
            url: "http://www.liulongbin.top:3007/api/login",
            data: data,
            success: function(res) {
                if (res.status == 0) {
                    layer.msg("登录成功!");
                    localStorage.setItem("token", res.token);
                    location.href = "./index.html";
                } else {
                    layer.msg(res.message);
                    $("#login")[0].reset(); //表单重置
                }
            }
        })
    })
})