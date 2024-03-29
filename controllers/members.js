const fs = require('fs')
const data = require("../data.json")
const {date} = require("../utils")


exports.index =  function(req, res) {
    return res.render("members/index", {members: data.members})
}

exports.show = function (req, res) {
    // send direto para url
    const {id} = req.params

    const foundMember = data.members.find(function(members) {
        return members.id == id
    })
    
    if(!foundMember) return res.send("Not found")

    const members = {
        // espalhamento everything inside foundMember
        ... foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render("members/show", {members})
}

exports.create = function(req, res) {
    return res.render('members/create')
}

// create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha os campos')
        }
    }

    birth = Date.parse(req.body.birth);
    const id = 1
    const lastMember = data.members[data.members.length - 1];

    if(lastMember) {
        id = lastMember.id + 1
    }

    // add body para o array
    data.members.push({
        ...req.body,
        id,
        birth
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error")

        return res.redirect("/members")
    })    
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundMember = data.members.find(function(members) {
        return members.id == id
    })
    
    if(!foundMember) return res.send("Not found")

    const members = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render("members/edit", {members})
}

exports.put = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundMember = data.members.find(function(members, foundIndex) {
        if (id == members.id) {
            index = foundIndex
            return true
        }
    })
    
    if(!foundMember) return res.send("Not found")

    const member =  {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredmember = data.members.filter(function(members) {
        return members.id != id
    })

    data.members = filteredmember

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")

        return res.redirect("/members")
    })

}