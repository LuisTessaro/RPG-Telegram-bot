const Telegraf = require('telegraf')

module.exports.actionsMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/inspect'),
        m.callbackButton('/fight'),
        m.callbackButton('/bargain'),
        m.callbackButton('/sneak'),
        m.callbackButton('/colect'),
        m.callbackButton('/flee'),
        m.callbackButton('/back'),
    ]).resize())

module.exports.classMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/register warrior'),
        m.callbackButton('/register mage'),
        m.callbackButton('/register archer'),
        m.callbackButton('/register thief'),
        m.callbackButton('/register cleric'),
        m.callbackButton('/back'),
    ]).resize())

module.exports.mainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/adventures'),
        m.callbackButton('/grind'),
        m.callbackButton('/bags'),
        m.callbackButton('/equipments'),
        m.callbackButton('/levelUp'),
        m.callbackButton('/resetSession'),
        m.callbackButton('/me'),
    ]).resize())

module.exports.levelUpMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/levelup str'),
        m.callbackButton('/levelup dex'),
        m.callbackButton('/levelup agi'),
        m.callbackButton('/levelup con'),
        m.callbackButton('/levelup int'),
        m.callbackButton('/levelup wis'),
        m.callbackButton('/levelup car'),
        m.callbackButton('/levelup wil'),
        m.callbackButton('/levelup luk'),
        m.callbackButton('/back'),
    ]).resize())