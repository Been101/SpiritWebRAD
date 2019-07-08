// Router 和 应用的分离
const Router = require('./router')
class Application {
    lazyrouter() {
        if(!this._router){
            this._router = new Router()
        }
    }

    get(path, handler) {
        this.lazyrouter()
        this._router.get(path, handler)
    }

    listen(path, handler) {
        const self = this
        const server = http.createServer((req, res) => {
            function done() { // 如果没有任何路由规则匹配的话会走此函数
                res.end(`Cannot ${req.method} ${req.url}`)
            }
            // 如果路由系统无法处理， 也就是没有一条路由规则跟请求匹配， 是会把请求交给done
            self._router.handle(req, res, done)
    
        })
        server.listen.apply(server, arguments)
    }
}
    

module.exports = Application