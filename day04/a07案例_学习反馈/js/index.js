/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
// 1.1 设置省份下拉菜单数据
axios({
  url:'http://hmajax.itheima.net/api/province',
}).then(result=>{
  const optionStr = result.data.list.map(pname=>`<option value="${pname}">${pname}</option>`).join('')
  document.querySelector('.province').innerHTML = `<option value="">省份</option>` + optionStr
})

// 1.2 切换省份，设置城市下拉菜单数据，注意要清空地区下拉菜单
document.querySelector('.province').addEventListener('change',async e=>{
  // 上面设置的value属性在这里确定省份
  // console.log(e.target.value);
  const cityObj = await axios({
    url:'http://hmajax.itheima.net/api/city',
    params:{
      pname:e.target.value
    }
  })
  console.log(cityObj);
  const cityOptionStr = cityObj.data.list.map(cname=>`<option value="${cname}">${cname}</option>`).join('')
  document.querySelector('.city').innerHTML = `<option value="">城市</option>` + cityOptionStr
  document.querySelector('.area').innerHTML = `<option value="">地区</option>` 
  
})
// 1.3 切换城市，设置地区下拉菜单数据
document.querySelector('.city').addEventListener('change',async e=>{
  // 上面设置的value属性在这里确定省份
  // console.log(e.target.value);
  const areaObj = await axios({
    url:'http://hmajax.itheima.net/api/area',
    params:{
      cname:e.target.value,
      pname:document.querySelector('.province').value

    }
  })
  console.log(areaObj);
  const areaOptionStr = areaObj.data.list.map(aname=>`<option value="${aname}">${aname}</option>`).join('')
  document.querySelector('.area').innerHTML = `<option value="">地区</option>` + areaOptionStr
})
/**
 * 目标2：收集数据提交保存
 *  2.1 监听提交的点击事件
 *  2.2 依靠插件收集表单数据
 *  2.3 基于axios提交保存，显示结果
 */
// 2.1 监听提交的点击事件
document.querySelector('.submit').addEventListener('click',async ()=>{
  const form = document.querySelector('.info-form')
  const data = serialize(form,{empty:true,hash:true})
  try {
    const result = await axios({
      url:'http://hmajax.itheima.net/api/feedback',
      method:'post',
      data
    })
    console.log(result);
    alert(result.data.message)
    
  } catch (error) {
    console.dir(error)
    alert(error.response.data.message)
    
  }
})
