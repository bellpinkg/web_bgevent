$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义用户昵称校验规则
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    });

    // 调用函数初始化用户信息
    initUserinfo();

    // 实现重置效果
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认的重置行为
        e.preventDefault();
        // 再重新获取用户信息
        initUserinfo();
    })

    // 监听表单提交
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认的提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            // data: form.val('formUserInfo'), 两种方式都可以
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // <iframe>中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
                window.parent.getUserInfo();
            }
        })
    })

    // 初始化用户信息
    function initUserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用lay的form.val快速为表单赋值，没有第二个参数则为取值
                form.val('formUserInfo', res.data)
            }
        })
    }
})