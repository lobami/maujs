const express = require('express')
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database')


pokemon.post("/", (req, res, next) =>{
    return res.status(201).send(req.body)
})

pokemon.get("/", async(req, res, next) =>{
    const pkmn = await db.query('select * from pokemon')
    return res.status(201).json({code: 1, message: pkmn})
})

pokemon.get("/:id([0-9]{1,3})", async(req, res, next) =>{
    const id = req.params.id
    const pkmn = await db.query('select * from pokemon where pok_id = ' + id)
    if (pkmn.length === 0) {
        return res.status(404).json({code: 404, message: 'pokemon no encontrado'})
    }
    return res.status(200).json({code: 1, message: pkmn})
    
})

pokemon.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const name = req.params.name;

    const pkmn = await db.query('select * from pokemon where pok_name = "' + name + '"')
    if (pkmn.length === 0) {
        return res.status(404).json({code: 404, message: 'pokemon no encontrado'})
    }
    return res.status(200).json({code: 1, message: pkmn})
})

module.exports = pokemon