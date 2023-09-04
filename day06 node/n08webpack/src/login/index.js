// 目标1 体验webpack
import {checkPhone,checkCode} from '../utils/check.js'
console.log(checkPhone('13212345678'));
console.log(checkCode('13212345'));

// 目标2 用户登录判断
document.querySelector('.btn').addEventListener('click',()=>{
    const phone = document.querySelector('.login-form [name = mobile]').value
    const code = document.querySelector('.login-form [name = code]').value

    if (!checkPhone(phone)) {
        console.log('手机号长度必须是11位');
        return
    }
    if (!checkCode(code)) {
        console.log('密码长度必须是6位');
        return
    }
    console.log('提交到服务器');
})
//  目标3 HtmlWebpackPlugin插件自动打包html
//  目标4 cssloader自动打包css
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// 目标5 css抽离打包 mini-css-extract-plugin
// 目标6 css抽离压缩打包 css-minimizer-webpack-plugin
// 目标7 less打包
import './index.less'
// 目标8 资源打包
// 创建 img 标签并动态添加到页面，配置 webpack.config.js
import imgObj from  './assets/logo.png'
const theImg = document.createElement('img')
theImg.src = imgObj
document.querySelector('.login-wrap').appendChild(theImg)
