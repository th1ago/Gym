const express = require('express')
const routes = express.Router()
const instructores = require('./instructores')

routes.get("/", function(req, res) {
    return res.redirect("/instrutores")
})

routes.get("/instrutores", function(req, res) {
    return res.render("instrutores/index")
})

routes.get("/instrutores/create", function(req, res) {
    return res.render("instrutores/create")
})

routes.get("/instrutores/:id", instructores.show)

routes.get("/instrutores/:id/edit", function(req, res) {
    return res.render("instrutores/edit")
})

routes.post("/instrutores", instructores.post)

routes.get("/membros", function(req, res) {
    return res.send("membros")
})

module.exports = routes
