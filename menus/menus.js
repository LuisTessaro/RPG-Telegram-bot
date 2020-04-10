const Telegraf = require('telegraf')

module.exports.classMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/register warrior ⚔️'),
        m.callbackButton('/register mage 🧙'),
        m.callbackButton('/register archer 🏹'),
        m.callbackButton('/register thief 🗡️'),
        m.callbackButton('/register cleric ✝️'),
        m.callbackButton('/back 🔙'),
    ]).resize())

module.exports.mainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/grindSpots ⏱️'],
        ['/bags 💰', '/equipments 🛡️'],
        ['/levelUp 🆙', '/me 😄'],
        ['/getplayers'],
        ['/showCompleteStats'],
    ]))


module.exports.levelUpMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/levelup str', '/levelup dex', '/levelup agi'],
        ['/levelup con', '/levelup int', '/levelup wis'],
        ['/levelup car', '/levelup wil', '/levelup luk'],
        ['/back 🔙']
    ]))


module.exports.grindSpots = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/grind outskirts_of_town'),
        m.callbackButton('/grind green_woods'),
        m.callbackButton('/grind bat_cave'),
        m.callbackButton('/grind dark_forest'),
        m.callbackButton('/grind dragons_cave_entrance'),
        m.callbackButton('/back 🔙'),
    ]).resize())