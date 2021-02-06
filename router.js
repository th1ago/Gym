const express = require('express')
const routes = express.Router()

routes.get("/", function(req, res) {
    return res.redirect("/instrutores")
})

routes.get("/instrutores", function(req, res) {
    return res.render("instrutores/index")
})

routes.post("/instrutores", function(req, res) {
    return res.send("recebido")
})

routes.get("/instrutores/create", function(req, res) {
    return res.render("instrutores/create")
})

routes.get("/menbros", function(req, res) {
    return res.send("membros")
})

module.exports = routes
