//importo el express y el cors
const express = require('express')
const { connectToDb, getDb } = require('./db')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port = 3030

const app = express()
let db
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log('API escuchando en el puerto ' + port)
        })
        db = getDb()
    }
})
app.get('/Champions', (req, res) => {
    let champions = []
    db.collection('Champions')
        .find()                   // .find({}, { name: 1, img: 1, _id: 0 }) // Proyectar los campos 'name' y 'img', excluir '_id'
        .sort({ name: 1 })
        .forEach(champion => champions.push({ name: champion.name, position: champion.position })) // .forEach(champion => championsData.push({ name: champion.name, img: champion.img })) // Agregar nombre y img al array
        .then(() => {
            res.status(200).json(champions)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})


