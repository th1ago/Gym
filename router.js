const express = require('express')
const routes = express.Router()

server.get("/", function(req, res) {
    return res.render("OK")
})

module.exports = routes
