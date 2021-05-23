const express = require('express')
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database')


pokemon.post("/", async(req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience) VALUES ('${pok_name}', '${pok_height}', '${pok_weight}', '${pok_base_experience}')`;
        const rows = await db.query(query)
        if (rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "pokemon creado correctamente"})
        }
        return res.status(404).json({ code: 404, message: "pokemon no creado"})
    }
})

pokemon.delete("/:id([0-9]{1,3})", async(req, res, next) =>{
    const id = req.params.id
    const query_delete = "DELETE FROM pokemon WHERE pok_id=" + id;
    const rows = await db.query(query_delete);
    if (rows.affectedRows == 1){
        return res.status(200).json({ code: 200, message: "pokemon borrado correctamente"})
    }
    return res.status(404).json({ code: 404, message: "pokemon no encontrado"})
})

pokemon.put("/:id([0-9]{1,3})", async(req, res, next) =>{
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height='${pok_height}', `;
        query += `pok_weight='${pok_weight}', pok_base_experience=${pok_base_experience}, WHERE pok_id=${pok_id}`;
        const rows = await db.query(query)
        if (rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "pokemon actualizado correctamente"})
        }
        return res.status(404).json({ code: 404, message: "pokemon no creado"})
    }
})

pokemon.get("/", async(req, res, next) =>{
    const pkmn = await db.query('select * from pokemon')
    return res.status(200).json({code: 1, message: pkmn})
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