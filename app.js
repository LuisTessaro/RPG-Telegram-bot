require('dotenv').config()
const mongoose = require('mongoose')

const serverConfig = require('./config/config-server')
const configBot = require('./config/config-bot')

const port = process.env.PORT || process.argv[2] || 3000
const token = process.env.BOT_TOKEN

const botController = require('./bot-controller')
const serverController = require('./server-controller')

const startBot = async () => {
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

    const app = await serverConfig()
    app.use(serverController)

    const bot = configBot(token)
    botController(bot)

    bot.launch()
    console.log('[INFO] Telegraf started.')

    app.listen(port, () => {
        console.log(`[INFO] Listening on port ${port}!`)
        console.log('[INFO] Bot Ready.')
    })
}

startBot()