$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
          nickname:function(value){
              if(value.length > 6){
                  return "昵称长度必须在1~6个字符之间"
              }
          }
    })
    getUserInfo()

    function getUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg("请求用户信息失败！")
                }
                form.val('formUserInfo', res.data);
            }
        });
    }
    $("#bntReset").on("click",function(e){
        e.preventDefault()
        getUserInfo()
    })
    // 更新用户信息
    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            
            success: function (res) {
               if(res.status !== 0){
                   return layer.msg("更新用户信息失败！")
               } 
               layer.msg("更新用户信息成功！")
               window.parent.getUserInfo()
            }
        });
    })
})