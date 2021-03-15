const fs = require('fs')
const data = require("./data.json")
const {age, date} = require("./utils")


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
        age: age(foundInstructor.birth),
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

    let {avatar_url, name, birth, gender, services} = req.body

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instrutor.length + 1);

    // add body para o array
    data.instrutor.push({
        avatar_url,
        name, 
        birth, 
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

    const instrutor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render("instructors/edit", {instrutor})
}

exports.put = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundInstructor = data.instrutor.find(function(instrutor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })
    
    if(!foundInstructor) return res.send("Not found")

    const instructor =  {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)   
    }

    date.instructor[index]= instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error")

        return res.redirect(`/instructors/${id}`)
    })
}