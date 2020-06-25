require('dotenv').config()

const configBot = require('./config/configBot')
const serverConfig = require('./config/configServer')

const port = process.env.PORT || 3000
const token = process.env.BOT_TOKEN

const botControllers = require('./controllers/bot-controllers')
const serverControllers = require('./controllers/server-controllers')

const startBot = async () => {
    const app = await serverConfig()
    app.use(serverControllers)

    const bot = configBot(token)
    botControllers(bot)

    bot.launch()
    console.log('[INFO] Telegraf started.')
    
    app.listen(port, () => {
        console.log(`[INFO] Listening on port ${port}!`)
        console.log('[INFO] Bot Ready.')
    })
}

startBot()