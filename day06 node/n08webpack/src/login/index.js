// 目标1 体验webpack
import { checkPhone, checkCode } from '../utils/check.js'
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
import imgObj from './assets/logo.png'
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
        localStorage.setItem('token', res.data.token)
        location.href = '../content/index.html'

    }).catch(error => {
        myAlert(false, error.response.data.message)
    })
})

// 目标10 配置开发环境 
// 默认localhost：8080，默认找public文件夹的资源，首先找index.html
// 实际配置了dist默认根目录output.path,但是在内存中，和webpack打包生成的dist无关
/**
 * 目标11：配置开发服务器环境 webpack-dev-server
 *  11.1 下载 webpack-dev-server 软件包到当前项目
 *  11.2 设置打包的模式为开发模式，配置自定义命令
 *  11.3 使用 npm run dev 来启动开发服务器，试试热更新效果
 */
// 注意1：webpack-dev-server 借助 http 模块创建 8080 默认 Web 服务
// 注意2：默认以 public 文件夹作为服务器根目录
// 注意3：webpack-dev-server 根据配置，打包相关代码在内存当中，以 output.path 的值作为服务器根目录（所以可以直接自己拼接访问 dist 目录下内容）

console.log('观察页面是否有自动打包更新')

// 目标11 webpack cross-env配置
// * 目标13：webpack 环境下区分两种模式
//  *  开发模式：style-loader 内嵌 css 代码在 js 中，让热替换更快
//  *  生产模式：提取 css 代码，让浏览器缓存和并行下载 js 和 css 文件
//  *  13.1 下载 cross-env 软件包到当前项目中
//  *  13.2 配置自定义命令，传入参数名和值到 process.env 对象上（它是 Node.js 环境变量）
//  *  13.3 在 webpack.config.js 调用使用做判断区分
//  *  13.4 重新打包观察两种模式区别

// 目标12 前端参数注入
// webpack 中配置 DefinePlugin 插件
if (process.env.NODE_ENV === 'production') {
    console.log = function () { }
}
console.log('开发模式下好用，生产模式下失效')

// 目标13 source-map调试代码
/**
 * 目标15：source-map 调试代码
 *  问题：error 和 warning 代码的位置和源代码对不上，不方便我们调试！
 *  解决：启动 webpack 的 source-map 资源地图功能
 *  15.1 在 webpack.config.js 配置 devtool 选项和值开启功能（注意：只在开发环境下使用）
 *  15.2 代码中造成错误，并在开发服务器环境下查看效果
 */
//  consolee.warn('123')

//  目标14 alias别名设置
// 作用：让我们前端代码引入路径更简单（而且使用绝度路径）
// *  16.1 在 webpack.config.js 中配置 resolve.alias 选项
// *  16.2 在代码中尝试并在开发环境和生产环境测试效果
// */
import youAxios from '@/utils/request.js'
console.log(youAxios)
// 目标15 生产环境下的cdn分发
// * 目标17：第三方库使用 CDN 加载引入
// *  17.1 在 html 中引入第三方库的 CDN 地址并用模板语法判断
// *  17.2 配置 webpack.config.js 中 externals 外部扩展选项（防止某些 import 的包被打包）

// 目标16 多页面打包
//  *  18.1 准备源码（html，css，js）放入相应位置，并改用模块化语法导出
//  *  18.2 下载 form-serialize 包并导入到核心代码中使用（略过）
//  *  18.3 配置 webpack.config.js 多入口和多页面的设置
//  *  18.4 重新打包观察效果