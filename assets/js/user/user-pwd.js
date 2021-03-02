$(function(){
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            if(value === $("[name=oldPwd]").val()){
                return "新密码能和旧密码一样！"
            }
        },
        rePwd:function(value){
            if(value !== $("[name=newPwd]").val()){
                return "请保证输入的密码保持一致！"
            }
        }
    })
    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            
            success: function (res) {
                if(res.status !== 0){
                    return layui.layer.msg("更新密码失败！")
                }
                 layui.layer.msg("更新密码成功,请重新登录！")
                 localStorage.removeItem("token")
                 window.parent.location.href = "/login.html"
                 $(".layui-form")[0].reset()
            }
        });
    })
})