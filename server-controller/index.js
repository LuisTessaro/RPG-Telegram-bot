const express = require('express'),
    router = express.Router()

const Player = require('../models/mongoose-models/Player')
const Combat = require('../models/mongoose-models/Combat')

router.get('/', async (req, res) => {
    const registeredPlayers = await Player.find()
    res.status(200).send(registeredPlayers.map(p => p.username))
})

router.get('/players', async (req, res) => {
    const registeredPlayers = await Player.find()
    res.status(200).send(registeredPlayers)
})
router.get('/combat', async (req, res) => {
    const combat = await Combat.find()
    res.status(200).send(combat)
})

router.delete('/players', async (req, res) => {
    await Player.deleteMany()
    console.log('[INFO] Registered Players dropped')
    res.status(200).send('Registered Players dropped')
})

router.delete('/combat', async (req, res) => {
    await Combat.deleteMany()
    console.log('[INFO] combat dropped')
    res.status(200).send('combat dropped')
})

router.use('*', (req, res) => {
    res.status(404).send('Resource not found')
})

module.exports = router