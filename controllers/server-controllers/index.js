const express = require('express'),
    router = express.Router()

const Player = require('../../model/mongoose-models/Player')

router.get('/', async (req, res) => {
    const registeredPlayers = await Player.find()
    res.status(200).send(registeredPlayers.map(p => p.username))
})

router.get('/players', async (req, res) => {
    const registeredPlayers = await Player.find()
    res.status(200).send(registeredPlayers)
})

router.get('/dropPlayers', async (req, res) => {
    await Player.deleteMany()
    console.log('[INFO] Registered Players dropped')
    res.status(200).send('Registered Players dropped')
})

router.use('*', (req, res) => {
    res.status(404).send('Resource not found')
})

module.exports = router