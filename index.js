require('dotenv').config()
require('./model/mongoose')

const configServer = require('./config/configServer')
const configBot = require('./config/configBot')

const port = process.env.PORT
const token = process.env.BOT_TOKEN

const bot = configBot.setUpBot(token)
const app = configServer.setUpServer()

app.listen(port, () => {
    console.log('Listening on port ' + port + '!')
})

bot.launch()