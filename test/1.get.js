// const express = require('express')
const express = require('../lib/express')

const app = express();
app.get('/', (req, res)=> {

    const a = {name: 'ming'}
    res.end(JSON.stringify(a))
})

app.listen(3000, () => {
    console.log('listen on 3000')
})