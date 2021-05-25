const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');


user.post("/login", async(req, res, next) => {
    let is_admin = false
    const { user_email, user_password } = req.body
    console.log('llego a aqui!!!!!!!!!', user_email, user_password)
    const query = `SELECT * FROM user where user_mail='${user_email}' and user_password='${user_password}'`
    const rows = await db.query(query);
    console.log('llego a aqui!!!!!!!!!', rows[0]['is_admin'])
    if (user_email && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_email,

            },"debugkey")
            if (rows[0]['is_admin'] === 1){
                is_admin = true
            }
            return res.status(200).json({ code: 200, message: token, is_admin: is_admin})
        }
        else {
            return res.status(401).json({ code: 401, message: "usuario y/o contraseña incorrectos"})
        }
    }
    return res.status(500).json({ code: 500, message: "campos imcompletos"})
})


user.post("/", async(req, res, next) => {
    const { user_name, user_email, user_password } = req.body;
    if (user_name && user_email && user_password) {
        let query = `INSERT INTO user (user_name, user_mail, user_password) VALUES ('${user_name}', '${user_email}', '${user_password}')`;
        const rows = await db.query(query)
        if (rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "usuario creado correctamente"})
        }
        return res.status(404).json({ code: 404, message: "usuario no creado"})
    }
    console.log('aqui fue crack')
    return res.status(500).json({ code: 500, message: "campos imcompletos"})
})

user.delete("/:id([0-9]{1,3})", async(req, res, next) =>{
    const id = req.params.id
    const query_delete = "DELETE FROM user WHERE user_id=" + id;
    const rows = await db.query(query_delete);
    if (rows.affectedRows == 1){
        return res.status(200).json({ code: 200, message: "usuario borrado correctamente"})
    }
    return res.status(404).json({ code: 404, message: "usuario no encontrado"})
})

user.put("/:id([0-9]{1,3})", async(req, res, next) =>{
    const { user_name, user_email, user_password } = req.body;
    if (user_name && user_email && user_password) {
        let query = `UPDATE user SET user_name='${user_name}', user_mail='${user_email}', user_password='${user_password}'`;
        const rows = await db.query(query)
        if (rows.affectedRows == 1){
            return res.status(201).json({ code: 200, message: "usuario editado correctamente"})
        }
        return res.status(500).json({ code: 500, message: "ocurrio un error"})
    }
    return res.status(500).json({ code: 404, message: "campos imcompletos"})
})

user.get("/", async(req, res, next) =>{
    const pkmn = await db.query('select * from user')
    return res.status(201).json({code: 1, message: pkmn})
})

user.get("/:id([0-9]{1,3})", async(req, res, next) =>{
    const id = req.params.id
    const pkmn = await db.query('select * from user where user_id = ' + id)
    if (pkmn.length === 0) {
        return res.status(404).json({code: 404, message: 'usuarop no encontrado'})
    }
    return res.status(200).json({code: 1, message: pkmn})
    
})

user.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const name = req.params.name;

    const pkmn = await db.query('select * from pokemon where pok_name = "' + name + '"')
    if (pkmn.length === 0) {
        return res.status(404).json({code: 404, message: 'pokemon no encontrado'})
    }
    return res.status(200).json({code: 1, message: pkmn})
})

module.exports = user;