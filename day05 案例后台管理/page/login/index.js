/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */
 document.querySelector('.btn').addEventListener('click',()=>{
    // 拾取表单
    const form = document.querySelector('.login-form')
    const data = serialize(form,{empty:true,hash:true})
    console.log(data);
    // axios请求
    axios({
        url:'/v1_0/authorizations',
        method:'post',
        data
    }).then((result) => {
        console.log(result);
        localStorage.setItem('token',result.data.data.token),
        myAlert(true, '登录成功')
        setTimeout(()=>{
            location.href = '../content/index.html'
    
        },1500)
            
        

    }).catch((err) => {
        // console.dir(err)
        myAlert(false, err.response.data.message)
    });
 })