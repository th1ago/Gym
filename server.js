const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./router")

const server = express()

server.use(express.static('public'))

// motor de view - tudo que for html
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.listen(5000, function() {
    console.log("server run")
})