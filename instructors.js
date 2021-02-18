const fs = require('fs')
const data = require("./data.json")
const {age} = require("./utils")


exports.show = function (req, res) {
    // send direto para url
    const {id} = req.params

    const foundInstructor = data.instrutor.find(function(instrutor) {
        return instrutor.id == id
    })
    
    if(!foundInstructor) return res.send("Not found")

    const instrutor = {
        // espalhamento everything inside foundInstructor
        ... foundInstructor,
        age: age(foundInstructor.niver),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", {instrutor})
}

// create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha os campos')
        }
    }

    let {avatar_url, name, niver, gender, services} = req.body

    niver = Date.parse(niver);
    const created_at = Date.now();
    const id = Number(data.instrutor.length + 1);

    // add body para o array
    data.instrutor.push({
        avatar_url,
        name, 
        niver, 
        gender, 
        services,
        created_at,
        id
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })    
}


exports.edit = function(req, res) {
    const {id} = req.params

    const foundInstructor = data.instrutor.find(function(instrutor) {
        return instrutor.id == id
    })
    
    if(!foundInstructor) return res.send("Not found")

    return res.render("instructors/edit", {instrutor: foundInstructor})
}