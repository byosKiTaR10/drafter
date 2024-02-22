//importo el express y el cors
const express = require('express')
const { connectToDb, getDb } = require('./db')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port = 3030

const app = express()
let db
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
        .find()
        .sort({ name: 1 })
        .forEach(champion => champions.push(champion))
        .then(() => {
            res.status(200).json(champions)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})


