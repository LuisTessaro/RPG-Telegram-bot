const express = require('express')

module.exports.setUpServer = () => {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(require('../controllers/serverIndex'))

    return app
}