// const express = require('express')
const express = require('../lib/express')

const app = express();
// app.get('/', (req, res)=> {

//     const a = {name: 'ming'}
//     res.end(JSON.stringify(a))
// })
/**
 * statc 栈  简单理解是一个数组
 * layer 是数组中的元素
 */
app.get('/', (req, res, next) => {
    console.log(1)
    next()
}, (req, res, next) => {
    console.log(11)
    next()
}).get('/', (req, res, next) => {
    console.log(2)
    next()
}).get('/', (req, res, next) => {
    console.log(3)
    res.end('ok')
})


app.listen(3000, () => {
    console.log('listen on 3000')
})