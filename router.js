const express = require('express')
const routes = express.Router()

server.get("/", function(req, res) {
    return res.redirect("/instrutores")
})

server.get("/instrutores", function(req, res) {
    return res.render("instrutores/index")
})

server.get("/menbros", function(req, res) {
    return res.send("membros")
})

module.exports = routes
