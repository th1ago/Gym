const fs = require('fs')
const data = require("../data.json")
const {age, date} = require("../utils")


exports.index =  function(req, res) {
    return res.render("instructors/index", {instructors: data.instructors})
}

exports.show = function (req, res) {
    // send direto para url
    const {id} = req.params

    const foundInstructor = data.instructors.find(function(instructors) {
        return instructors.id == id
    })
    
    if(!foundInstructor) return res.send("Not found")

    const instructors = {
        // espalhamento everything inside foundInstructor
        ... foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", {instructors})
}

exports.create = function(req, res) {
    return res.render("instructors/create")
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
    const id = Number(data.instructors.length + 1);

    // add body para o array
    data.instructors.push({
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

    const foundInstructor = data.instructors.find(function(instructors) {
        return instructors.id == id
    })
    
    if(!foundInstructor) return res.send("Not found")

    const instructors = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render("instructors/edit", {instructors})
}

exports.put = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructors, foundIndex) {
        if (id == instructors.id) {
            index = foundIndex
            return true
        }
    })
    
    if(!foundInstructor) return res.send("Not found")

    const instructor =  {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error")

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredInstructor = data.instructors.filter(function(instructors) {
        return instructors.id != id
    })

    data.instructors = filteredInstructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")

        return res.redirect("/instructors")
    })

}