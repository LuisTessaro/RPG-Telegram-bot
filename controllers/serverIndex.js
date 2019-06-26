const express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Players: 0')
})

router.use('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

module.exports = router