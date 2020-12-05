const express = require('express'),
    router = express.Router()

const player = require('./player')
const logs = require('./logs')
const combat = require('./combat')

router.use('/api/player', player)
router.use('/api/logs', logs)
router.use('/api/combat', combat)

router.use('*', (req, res) => {
    res.status(404).send('Resource not found')
})


module.exports = router