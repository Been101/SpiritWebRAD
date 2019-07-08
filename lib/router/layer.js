function Layer(path, handler){
    this.path = path
    this.handler = handler
}

// 判断这一层与传入的path 是否一致
Layer.prototype.math = function(path) {
    return this.path === path
}

Layer.prototype.handle_request = function(req, res, next) {
    this.handler(req, res, next)
}

module.exports = Layer