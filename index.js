const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const app = express()
const pokemon = require('./routes/pokemon')
const user = require ('./routes/user')
const auth = require ('./middleware/auth')
const notFound = require ('./middleware/notFound')
const wellcome = require ('./middleware/wellcome')
const cors = require('./middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.get("/", wellcome)

app.get(auth)

app.use("/pokemon", pokemon);
app.use("/user", user)

app.use(notFound)

app.listen(process.env.PORT || 3000, () =>{
    console.log('El servidor esta corriendo...');
})