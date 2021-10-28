$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了pwd这个校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义再次确认密码校验规则
        repwd: function(value) {
            var newpwd = $('[name=newPwd]').val();
            if (newpwd != value) {
                return '两次密码输入不一致'
            }
        },
        // 定义新旧密码不能相同的校验规则
        samepwd: function(value) {
            var oldpwd = $('[name=oldPwd]').val();
            if (value == oldpwd) {
                return '新旧密码不能相同!'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！');
                // 重置表单
                // 将jQuery对象转换为Dom对象
                $('.layui-form')[0].reset()
            }
        })
    })

})