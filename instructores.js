const fs = require('fs')
const data = require("./data.json")

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha os campos')
        }
    }

    let {avatar_url, name, niver, geneder, services} = req.body

    niver = Date.parse(niver);
    const created_at = Date.now();
    const id = Number(data.instrutor.length + 1);

    // add body para o array
    data.instrutor.push({
        avatar_url,
        name, 
        niver, 
        geneder, 
        services,
        created_at,
        id
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error")

        return res.redirect("/instrutores")
    })

    // return res.send(req.body)
}