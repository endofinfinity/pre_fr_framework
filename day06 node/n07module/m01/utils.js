const baseURL = 'http://hmajax.itheima.net'
// const getArraySum = arr => arr.reduce((sum,item) => sum += item ,0)

function getArraySum(arr) {
    return arr.reduce((sum, item) => sum += item, 0)
}
module.exports={
    url:baseURL,
    arraySum:getArraySum
}