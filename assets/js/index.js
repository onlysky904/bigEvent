$(function () {
    getUserInfo()
   var layer = layui.layer
    $("#indexout").on("click",function(){
        layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem("token");
            location.href="/login.html"
            
            layer.close(index);
          });
    })

})
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            headPortrait(res.data);
        }
        
    });
}

function headPortrait(user) {
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp" + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-head").hide();
    }else{
        var first = name[0].toUpperCase();
        $(".text-head").html(first).show();
        $(".layui-nav-img").hide();
    }
}
