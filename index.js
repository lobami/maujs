const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const { pokemon } = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.get("/", (req, res, next) =>{
    res.status(200);
    res.send('Bienvenido al pokedex')
})

app.get("/all", (req, res, next) =>{
    res.status(200);
    res.send(pokemon);
})

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) =>{
    const id = req.params.id
    if (id >= 0 && id <=150){
        return res.status(200).send(pokemon[req.params.id - 1]);
    }
    return res.status(404).send('pokemon no encontrado');
})

app.get("/pokemon/:name(A-Za-z)", (req, res, next) =>{
    const name = req.params.name;

    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    })
    res.status(404);
    res.send('pokemon no encontrado')
})
app.listen(process.env.PORT || 3000, () =>{
    console.log('El servidor esta corriendo...');
})