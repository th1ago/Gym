const express = require('express')
const routes = express.Router()

routes.get("/", function(req, res) {
    return res.redirect("/instrutores")
})

routes.get("/instrutores", function(req, res) {
    return res.render("instrutores/index")
})

routes.get("/menbros", function(req, res) {
    return res.send("membros")
})

module.exports = routes
