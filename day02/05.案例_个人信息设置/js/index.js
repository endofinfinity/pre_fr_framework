/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'mai'
// 1.1 获取用户的数据
axios({
  url: 'http://hmajax.itheima.net/api/settings',
  params: {
    creator
  }
}).then(result => {
  // console.log(result.data.data);
  const userObj = result.data.data
  const keys = Object.keys(userObj)
  keys.forEach(key => {
    if (key === 'avatar') {
      document.querySelector('.prew').src = userObj[key]
    } else if (key === 'gender') {
      const genderList = document.querySelectorAll('.gender')
      const genderNum = userObj[key]
      genderList[genderNum].checked = true
    } else {
      document.querySelector(`.${key}`).value = userObj[key]
    }
  })
})

/**
 * 目标2：修改头像
 *  2.1 获取头像文件
 *  2.2 提交服务器并更新头像
 * */
// 文件选择元素->change事件
document.querySelector('.upload').addEventListener('change', e => {
  // 构造form对象
  const fd = new FormData()
  fd.append('avatar', e.target.files[0])
  fd.append('creator', creator)
  // 提交put请求
  axios({
    url: 'http://hmajax.itheima.net/api/avatar',
    method: 'PUT',
    data: fd,
  }).then(result => {
    // console.log(result.data.data);
    const imgUrl = result.data.data.avatar
    document.querySelector('.prew').src = imgUrl
  })

})

/**
 * 目标3：提交表单
 *  3.1 收集表单信息
 *  3.2 提交到服务器保存
 */

document.querySelector('.submit').addEventListener('click', e => {
  // 利用form-serialize获取对象并序列化
  const userForm = document.querySelector('.user-form')
  const userObj = serialize(userForm, { hash: true, empty: true })
  // 对象属性整理
  userObj.creator = creator
  userObj.gender = +userObj.gender
  // console.log(userObj);

  // ajax发送请求提交修改
  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'put',
    data: userObj,
  }).then(() => {
    /**
     * 目标4：结果提示
     *  4.1 创建toast对象
     *  4.2 调用show方法->显示提示框
     */
    const toastDom = document.querySelector('.my-toast')
    const toastObj = new bootstrap.Toast(toastDom)
    toastObj.show()
  })

})
