let add_item = function (pid, id, title, type) {
    var item = '        <ul>\n' +
        '            <li itemId="' + id + '">\n' +
        '                <div class="tree-title tree-ico close">\n' +
        '                    <span><i></i>' + title + '</span>\n' +
        '                </div>\n' +
        '            </li>\n' +
        '        </ul>'
    if (type != 'Folder')
        var item = item.replace('tree-ico', '')
    $('[itemId=' + pid + ']').append(item)
}
let init_tree = function () {
    $('li[itemId="-1"]').html('')
    for (let d in data) {
        add_item(data[d]['pid'], d, data[d]['title'], data[d]['type'])
    }
    $('.open').siblings().show()
    $('.close').siblings().hide()
    $('.tree-title').dblclick(function () {
        if ($(this).hasClass('open')) {
            $(this).siblings().hide()
            $(this).removeClass('open')
            $(this).addClass('close')
        } else {
            $(this).siblings().show()
            $(this).siblings().css('margin-left', '12px')
            $(this).removeClass('close')
            $(this).addClass('open')
        }
    })

    $('.tree-title').click(function () {
        var itemId = $(this).parent().attr('itemid')
        let id = itemId * 1
        //只要双击进文件夹，先把当前对应数据的布尔值清掉
        $checkedAll.removeClass('checked'); //清掉全选
        render(id);
        createMenu(id); //为了联动面包屑
        var title_list = []
        for (let d in data) {
            if (data[d]['pid'] == itemId) {
                title_list.push(data[d])
            }
        }
    })
}
let del_node = function (id) {
    $('li[itemId="' + id + '"]').html('')
}


init_tree()


