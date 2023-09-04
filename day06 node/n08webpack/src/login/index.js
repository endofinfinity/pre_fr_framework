// 目标1 体验webpack
import {checkPhone,checkCode} from '../utils/check.js'
console.log(checkPhone('13212345678'));
console.log(checkCode('13212345'));

// 目标2 用户登录判断
// document.querySelector('.btn').addEventListener('click',()=>{
//     const phone = document.querySelector('.login-form [name = mobile]').value
//     const code = document.querySelector('.login-form [name = code]').value

//     if (!checkPhone(phone)) {
//         console.log('手机号长度必须是11位');
//         return
//     }
//     if (!checkCode(code)) {
//         console.log('密码长度必须是6位');
//         return
//     }
//     console.log('提交到服务器');
// })
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

// 目标9 登录功能
// 9.1 npm 安装axios
// 9.2 utils里对应文件导出实现函数
// 9.3 逻辑代码编写
// 普通导入
import myAxios from '../utils/request.js'
// 命名导入
import { myAlert } from '../utils/alert.js';
document.querySelector('.btn').addEventListener('click', () => {
    const phone = document.querySelector('.login-form [name=mobile]').value
    const code = document.querySelector('.login-form [name=code]').value
  
    if (!checkPhone(phone)) {
      myAlert(false, '手机号长度必须是11位')
      console.log('手机号长度必须是11位')
      return
    }
  
    if (!checkCode(code)) {
      myAlert(false, '验证码长度必须是6位')
      console.log('验证码长度必须是6位')
      return
    }
  
    myAxios({
      url: '/v1_0/authorizations',
      method: 'POST',
      data: {
        mobile: phone,
        code: code
      }
    }).then(res => { 
      myAlert(true, '登录成功')
      
    }).catch(error => {
      myAlert(false, error.response.data.message)
    })
  })

/**
 * 目标11：配置开发服务器环境 webpack-dev-server
 *  11.1 下载 webpack-dev-server 软件包到当前项目
 *  11.2 设置打包的模式为开发模式，配置自定义命令
 *  11.3 使用 npm run dev 来启动开发服务器，试试热更新效果
 */ 
// 注意1：webpack-dev-server 借助 http 模块创建 8080 默认 Web 服务
// 注意2：默认以 public 文件夹作为服务器根目录
// 注意3：webpack-dev-server 根据配置，打包相关代码在内存当中，以 output.path 的值作为服务器根目录（所以可以直接自己拼接访问 dist 目录下内容）
// 目标10 配置开发环境 
// 默认localhost：8080，默认找public文件夹的资源，首先找index.html
// 实际配置了dist默认根目录output.path,但是在内存中，和webpack打包生成的dist无关
console.log('观察页面是否有自动打包更新')
