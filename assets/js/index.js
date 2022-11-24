var layer = layui.layer;
$(function() {

    //获取用户信息
    getUserInfo();

    //点击退出按钮，进行退出
    $("#tuichu").on("click", function() {
        logout();
    })

});
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token") || " "
        },
        success: function(res) {
            if (res.status === 0) {
                renderAvater(res.data);
            }
        },
        complete: function(res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //清空token
                localStorage.removeItem("token");
                //跳转页面
                location.href = "./login.html";
            } else {
                console.log(res.responseJSON.message);
            }
        }

    });
}
// 退出功能方法
function logout() {
    console.log("haha11");
    location.href = '/login.html'
        //location.href = "./login.html";
    console.log("haha2");
    localStorage.removeItem("token");
}
// 渲染用户头像的方法
function renderAvater(data) {
    //渲染用户名
    if (data.nickname === null || data.nickname === '') {
        $("#username").text("欢迎" + data.username);
        let username = data.username.charAt(0);
        $(".avaterText").text(username);
    } else {
        $("#username").text("欢迎" + data.nickname);
        let username = data.nickname.charAt(0);
        $(".avaterText").text(username);
    }

    //渲染个人头像
    if (data.user_pic !== null) {
        console.log("1");
        $(".layui-nav-img").prop("src", data.user_pic).show();
        $(".avaterText").hide();
    } else {
        console.log("2");
        $(".layui-nav-img").hide();
        $(".avaterText").show();
    }
}