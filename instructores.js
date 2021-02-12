const fs = require('fs')
const data = require("./data.json")

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha os campos')
        }
    }

    // add body para o array
    data.instrutor.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error")

        return res.redirect("/instrutores")
    })

    // return res.send(req.body)
}