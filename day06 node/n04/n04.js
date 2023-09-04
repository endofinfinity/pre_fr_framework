const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'public/index.html'),(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        const htmlStr = data.toString()
        const resStr = htmlStr.replace(/[\r\n]/g,'')
        console.log(resStr);

        fs.writeFile(path.join(__dirname,'disk/index.html'),resStr,err=>{
            if (err) console.log(err);
            else console.log('转换成功');
        })
    }
})