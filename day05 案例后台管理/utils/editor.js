// 富文本编辑器 wangeditor
// 创建编辑器函数，创建工具栏函数

const { createEditor, createToolbar } = window.wangEditor

// 编辑栏配置
const editorConfig = {
    placeholder: '请输入...',
    // 编辑器变化的回调函数
    onChange(editor) {
        const html = editor.getHtml()
        console.log('editor content', html)
        // 也可以同步到 <textarea>
        document.querySelector('.publish-content').value = html
    }
}

const editor = createEditor({
    // 位置
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    // 编辑区附带表单的功能
    mode: 'default', // or 'simple'
})

// 工具栏配置
const toolbarConfig = {}

// 创建工具栏
const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
