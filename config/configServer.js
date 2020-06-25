const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.log('[ERROR] Mongoose ERROR')
            throw err
        }
        console.log('[INFO] Mongoose Started')
    })
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    return app
}