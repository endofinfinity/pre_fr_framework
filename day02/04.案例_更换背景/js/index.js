/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
document.querySelector('.bg-ipt').addEventListener('change',e=>{
    // console.log(e.target.files[0]);
    // 创建FormData接收对象
    const fd = new FormData()
    fd.append('img',e.target.files[0])
    // 2. 上传成功时，浏览器"保存"图片url网址
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'POST',
        data: fd
    }).then((result) => {
        console.log(result);
        const imgUrl = result.data.data.url
        document.body.style.backgroundImage = `url(${imgUrl})`
        // 本地存储地址链接
        localStorage.setItem('imgUrl',result.data.data.url)
    }).catch((err) => {
        pass
    });
})
const imgUrl = localStorage.getItem('imgUrl')
imgUrl && (document.body.style.backgroundImage = `url(${imgUrl})`)