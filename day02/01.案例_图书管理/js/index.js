// 1、读取渲染表格
// 1.1 读取
const creator = 'ithei'
// 基本上每次执行动作都需要刷新读取，定义方法，方便调用
function getBooksList() {
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      creator: creator
    }
  }).then((result) => {
    // console.log(result.data.data)
    // 1.2 渲染
    // 1.2.1 数据模版组装
    const bookList = result.data.data
    const htmlStr = bookList.map((item, index) => {
      return `<tr>
      <td>${index + 1}</td>
      <td>${item.bookname}</td>
      <td>${item.author}</td>
      <td>${item.publisher}</td>
      <td>
        <span class="del" data-id = ${item.id}>删除</span>
        <span class="edit">编辑</span>
      </td>
    </tr>`
    }).join('')
    // 1.2.2 获取标签元素 替换
    document.querySelector('.list').innerHTML = htmlStr
  });
}

getBooksList()
// 2、新增图书
// 2.1 利用js的bootstrap插件添加弹框
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)

document.querySelector('.add-btn').addEventListener('click', () => {
  // console.log('1111');
  // 2.2 利用form插件获取post数据
  const addForm = document.querySelector('.add-form')
  // 序列化数据
  const addBook = serialize(addForm, { hash: true, empty: true })
  console.log(addBook);
  // 2.3 发送ajax请求post提交
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'post',
    data: {
      // 不用解构，直接展开运算符就行,addBook不含id，可以直接展开，下面的4、修改图书里的包括id，不能直接展开
      ...addBook,
      creator: creator,
    }
  }).then(result => {
    addForm.reset()
    addModal.hide()
    // 点击事件异步，所以需要在里面刷新请求
    getBooksList()
  })
})

// 3 删除图书
// 活动添加的html标签，用父级的委托来实现点击事件监听
document.querySelector('.list').addEventListener('click', e => {
  // data-id自定义的id属性保存在dataset属性里
  const theId = e.target.dataset.id
  if (e.target.classList.contains('del')) {
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`,
      method: 'DELETE',
    }).then(target => {
      getBooksList()
    })
  }
})

// 4 修改图书
// 4.1 编辑弹框->显示和隐藏，类似新增图书
const editModal = document.querySelector('.edit-modal')
const editBook = new bootstrap.Modal(editModal)
document.querySelector('.list').addEventListener('click', e => {
  // console.log('修改图书');
  if (e.target.classList.contains('edit')) {
    const theId = e.target.previousElementSibling.dataset.id
    // 4.2 获取当前编辑图书数据->回显到编辑表单中
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`,

    }).then(result => {
      const editBookInfo = result.data.data
      const keys = Object.keys(editBookInfo)
      // console.log(keys);
      // 遍历方法填充表格
      keys.forEach(element => {
        document.querySelector(`.edit-form .${element}`).value = editBookInfo[element]
      });
    })

    editBook.show()
  }
})

// 4.3 提交保存修改，并刷新列表
document.querySelector('.edit-btn').addEventListener('click', () => {
  // 利用form-serialize插件获取表单信息
  const editDom = document.querySelector('.edit-form')
  const editBookInfo = serialize(editDom, { hash: true, empty: true })
  // console.log(editBookInfo);
  // 提交put请求
  axios({
    url: `http://hmajax.itheima.net/api/books/${editBookInfo.id}`,
    method: 'put',
    data: {
       // 添加图书逻辑中的 addBook不含id，可以直接展开。这里的包括id，不能直接展开运算符，可以做解构，直接点方法也可以更直白
      bookname: editBookInfo.bookname,
      author: editBookInfo.author,
      publisher: editBookInfo.publisher,
      creator
    }
  }).then(result => {
    getBooksList()
    editBook.hide()
  })
})





