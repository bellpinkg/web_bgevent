$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();

    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    layer.msg('获取文章分类列表失败！')
                }
                var strHtml = template('tpl-table', res);
                $('tbody').html(strHtml)
            }
        })
    }

    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 因为这个form-add 表单是点击添加后动态生成的，所以不能直接绑定
    // 要通过代理的方式，为后面动态添加的元素绑定事件
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('新增文章分类失败！');
                }
                layer.msg('新增文章分类成功！');
                initArtCateList();
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null;
    // 通过代理的形式，为动态添加的编辑按钮绑定点击事件
    $('body').on('click', '.btn-edit', function() {
        var id = $(this).attr('data-id');
        // console.log(id);
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，监听动态添加的修改分类弹出层表单
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('更新分类信息失败！');
                }
                layer.msg('更新分类信息成功！');
                initArtCateList();
                // 根据索引，关闭对应的弹出层
                layer.close(indexEdit)
            }
        })
    })

    // 通过代理的形式，为动态添加的删除按钮绑定点击事件
    $('body').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('删除文章分类失败！')
                    }
                    layer.msg('删除文章分类成功！');
                    initArtCateList();
                    layer.close(index);
                }
            })
        });
    })

})