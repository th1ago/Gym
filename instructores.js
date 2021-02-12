const fs = require('fs')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha os campos')
        }
    }

    fs.writeFile("data.json", JSON.stringify(req.body), (err) => {
        if (err) return res.send("Write file error")

        return res.redirect("/instructores")
    })

    return res.send(req.body)
}