// https://core.telegram.org/bots#deep-linking
require('dotenv').config()
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch((errMessage, ctx) => {
  ctx.reply(errMessage)
})

bot.start((ctx) => {
  throw 'deu ruim'
})
bot.launch()