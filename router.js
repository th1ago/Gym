const express = require('express')
const routes = express.Router()
const instructores = require('./instructores')

routes.get("/", function(req, res) {
    return res.redirect("/instrutores")
})

routes.get("/instrutores", function(req, res) {
    return res.render("instrutores/index")
})

routes.get("/instrutores/:id", instructores.show)

routes.get("/instrutores/create", function(req, res) {
    return res.render("instrutores/create")
})

routes.get("/menbros", function(req, res) {
    return res.send("membros")
})

routes.post("/instrutores", instructores.post)

module.exports = routes
