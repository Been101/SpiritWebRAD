const Route = require('./route')
const Layer = require('./layer')
const url = require('url')
function Router(){
    this.stack = []
}

// 创建一个Route实例， 向当前路由系统中添加一个层
Router.prototype.route = function(path) {
    const route = new Route(path)
    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}
Router.prototype.get = function(path, handler) {
    let route = this.route(path)  // 是在往Router 里添加一层
    route.get(handler)  // 向Route 里添加一层
}

Router.prototype.handle = function(req, res, out) {
    let index = 0, self = this;
    const { pathname } = url.parse(req.url, true)
    function next() {
        if(index >= self.stack.length){
            return out()
        }
        const layer = self.stack[index++]
        if(layer.math(pathname) && layer.route && layer.route.handle_method(req.method.toLowerCase())){
            layer.handle_request(req, res, next)
        }else{
            next()
        }
    }
    next()
}

module.exports = Router