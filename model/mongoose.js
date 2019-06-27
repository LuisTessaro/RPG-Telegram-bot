const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err) return err
    console.log('[INFO] Mongo connected.')
})