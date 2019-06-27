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
        m.callbackButton('/grindSpots'),
        m.callbackButton('/adventureMenu'),
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


module.exports.adventuresMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/explore aq_temple'),
        m.callbackButton('/explore moten_core'),
        m.callbackButton('/explore drachengard'),
        m.callbackButton('/explore olimpus'),
        m.callbackButton('/back'),
    ]).resize())

module.exports.grindSpots = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/grind aq_temple'),
        m.callbackButton('/grind moten_core'),
        m.callbackButton('/grind drachengard'),
        m.callbackButton('/grind olimpus'),
        m.callbackButton('/back'),
    ]).resize())