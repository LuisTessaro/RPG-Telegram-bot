const mongoose = require('mongoose')

mongoose.connect(process.env.SERVER_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err) return console.log(err)
    console.log('Mongoose Connected!')
})