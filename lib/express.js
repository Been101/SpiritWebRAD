const http = require('http')
const url = require('url')

// 这是一个路由规则的容器
let router = [
    {
        path: '*',
        method: '*',
        handler(req, res){
            res.end(`Cannot ${req.method} ${req.url}`)
        }
    }
]

module.exports = function createApplication(){
    return {
        get(path, handler) {
            router.push({
                path,
                method: 'get',
                handler
            })
        },
        listen() {
            const server = http.createServer((req, res) => {
                const { pathname } = url.parse(req.url, true) // => {}  解析成对象形式
                const req_method = req.method.toLocaleLowerCase()
                for(let i = 1; i < router.length; i++){
                    const { path, method, handler } = router[i]
                    if(pathname === path && method === req_method){
                        return handler(req, res)
                    }
                }
                router[0]['handler'](req, res)


            })
            server.listen.apply(server, arguments)

        }
    }
}