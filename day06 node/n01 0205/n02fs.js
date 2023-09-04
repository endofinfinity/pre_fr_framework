const fs = require('fs')
fs.writeFile('./test.txt','hello, node.js',(err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
})

fs.readFile('./test.txt',(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
})

const path = require('path')
console.log(__dirname);
// console.log(path);