$(function () {
    $(".register").on("click", function () {
        $(".login_box_register").hide();
        $(".login_box_login").show();
    })
    $(".login").on("click", function () {
        $(".login_box_register").show();
        $(".login_box_login").hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify ({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        pwds:function(value){
            var pwd = $(".login_box_login [name=password]").val()
            if(pwd !== value){
                return "请保持两次输入的密码一致！"
            }
        }
    })
    $("#form2").on("submit",function(e){
        e.preventDefault();
        $.post("/api/reguser", 
        {username:$("#form2 [name=username]").val(),password:$("#form2 [name=password]").val()},
       function (res) {
            if(res.status !== 0){
                return layer.msg(res.message);
            }   
            layer.msg("注册成功请登录！")
            $(".login").click();
            
        });
    })
    $("#form1").submit(function(e){
        e.preventDefault();
        $.ajax({
            url:"/api/login",
            type:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                   return layer.msg("登陆失败！")
                }
                layer.msg("登陆成功！")
                localStorage.setItem("token",res.token)
                location.href="/index.html"
            }
        })
    })
})