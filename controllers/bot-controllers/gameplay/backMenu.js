const Telegraf = require('telegraf')

const popupMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/explore aq_temple'),
        m.callbackButton('/inventory'),
        m.callbackButton('/equipment'),
        m.callbackButton('/me'),
        m.callbackButton('/addItensToBag'),
        m.callbackButton('/reset'),
        m.callbackButton('/resetSession'),
    ]).resize())

module.exports = (ctx) => {
    ctx.reply('Use the buttons to choose what to do:', popupMenu)
}