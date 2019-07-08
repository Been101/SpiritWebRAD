const Layer = require('./layer')
function Route(path) {
    this.path = path
    this.stack = []
    // 表示此路由有此方法的处理函数
    this.methods = {}
}
Route.prototype.get = function(handler) {
    let layer = new Layer('/', handler)

    layer.method = method
    this.methods['get'] = true
    this.stack.push(layer)
}

Route.prototype.handle_method = function(method) {
    method = method.toLowerCase()
    return this.methods[method]
}

Route.prototype.dispatch = function(req, res, out) {
    let index = 0, self = this;
    function next() {
        if(index >= this.stack.length){
            return out()
        }
        const layer = this.stack[index++]
        if(layer.method === req.method.toLowerCase()){
            layer.handle_request(req, res, next)
        }else{
            next()
        }
    }
    next()
}

module.exports = Route