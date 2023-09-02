/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
async function setChannleList() {
    const res = await axios({
        url: '/v1_0/channels'
    })
    // 1.2 展示到下拉菜单中
    const htmlStr = `<option value="" selected="">请选择文章频道</option>` + res.data.channels.map(item => `<option value="${item.id}">${item.name}</option>`).join('')
    document.querySelector('.form-select').innerHTML = htmlStr
}
// 网页运行后，默认调用一次
setChannleList()
/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document.querySelector('.img-file').addEventListener('change', async e => {
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('image', file)
    const res = await axios({
        url: '/v1_0/upload',
        method: 'post',
        data: fd
    })
    const imgUrl = res.data.url
    // 2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
    document.querySelector('.rounded').src = imgUrl
    document.querySelector('.rounded').classList.add('show')
    document.querySelector('.place').classList.add('hide')
})
// 已经有图片的情况下，点击图片修改功能
document.querySelector('.rounded').addEventListener('.click', () => {
    // click触发上面的’change‘事件监听
    document.querySelector('.img-file').click()
})

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector('.send').addEventListener('click', async (e) => {
    if (e.target.innerHTML !== '发布') {
        return
    }
    // 通过form-serialize插件获取表单数据
    const form = document.querySelector('.art-form')
    const data = serialize(form, { hash: true, empty: true })
    // 查接口文档，需要删除id，添加cover属性
    delete id
    data.cover = {
        type: 1,
        images: [document.querySelector('.rounded').src]
    }
    // 发送axios请求
    try {
        const res = await axios({
            url: '/v1_0/mp/articles',
            method: 'POST',
            data: data
        })

        myAlert(true, '发布成功')
        // 重置表单
        form.reset()
        // 2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）的取反操作
        // 封面需要手动重置
        document.querySelector('.rounded').src = ''
        document.querySelector('.rounded').classList.remove('show')
        document.querySelector('.place').classList.remove('hide')
        // 富文本编辑器重置
        editor.setHtml('')

        // 跳转内容管理页面
        setTimeout(() => {
            location.href = '../content/index.html'
        }, 1500)
    } catch (error) {
        myAlert(false, error.response.data.message)
    }
})
/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */
; (function () {
    // location和URLSearchParams方法获取查询参数字符串
    const paramsStr = location.search
    const params = new URLSearchParams(paramsStr)
    // 注意对象的forEach遍历参数位置对应的是value和key
    params.forEach(async (value, key) => {
        if (key === 'id') {
            document.querySelector('.title span').innerHTML = '修改文章'
            document.querySelector('.send').innerHTML = '修改'

            // 回显
            const res = await axios({
                url: `/v1_0/mp/articles/${value}`
            })
            console.log(res);
            // 根据id返回的文章对象，构建需要返回显示的对象内容
            const dataObj = {
                channel_id: res.data.channel_id,
                title: res.data.title,
                rounded: res.data.cover.images[0],
                content: res.data.content,
                id: res.data.id
            }

            // Object.keys来遍历keys，判断筛选，赋值
            Object.keys(dataObj).forEach(key => {
                if (key === 'rounded') {
                    // 判断封面是否有
                    if (dataObj[key]) {
                        // 类似发布时候的属性设置
                        document.querySelector('.rounded').src = dataObj[key]
                        document.querySelector('.rounded').classList.add('show')
                        document.querySelector('.place').classList.add('hide')
                    } else if (key === 'content') {
                        editor.setHtml(dataObj[key])
                    } else {
                        // 非id，class的属性选择器用[]
                        document.querySelector(`[name=${key}]`).value = dataObj[key]
                    }
                }
            })
        }
    })
})()
/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
 document.querySelector('.send').addEventListener('click', async e => {
    // 5.1 判断按钮文字，区分业务（因为共用一套表单）
    if (e.target.innerHTML !== '修改') return
    // 修改文章逻辑
    const form = document.querySelector('.art-form')
    const data = serialize(form, { hash: true, empty: true })
    // 5.2 调用编辑文章接口，保存信息到服务器
    try {
      const res = await axios({
        url: `/v1_0/mp/articles/${data.id}`,
        method: 'PUT',
        data: {
          ...data,
          cover: {
            type: document.querySelector('.rounded').src ? 1 : 0,
            images: [document.querySelector('.rounded').src]
          }
        }
      })
      console.log(res)
      myAlert(true, '修改文章成功')
    } catch (error) {
      myAlert(false, error.response.data.message)
    }
  })