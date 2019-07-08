const http = require('http')
const url = require('url')
const Application = require('./application')

function createApplication() {
    return new Application()
}

module.exports = createApplication

