const Telegraf = require('telegraf')

const popupMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/register warrior'),
        m.callbackButton('/register mage'),
        m.callbackButton('/register archer'),
        m.callbackButton('/register thief'),
        m.callbackButton('/register cleric'),
        m.callbackButton('/back'),
    ]).resize())

module.exports = (ctx) => {
    ctx.reply('Pick a class using the popup menu:', popupMenu)
}