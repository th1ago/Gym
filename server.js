const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./router")

const server = express()

// chamado middle
server.use(express.urlencoded({ extended: true}))
server.use(express.static('public'))
server.use(routes)

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