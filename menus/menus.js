const Telegraf = require('telegraf')

module.exports.actionsMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/inspect 🕵️', '/colect 💰', '/sneak 🚶'],
        ['/fight ⚔️', '/bargain 😄', '/flee 🏃'],
        ['/back 🔙'],
    ]))

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
        ['/adventures 🏕️', '/grindSpots ⏱️'],
        ['/adventureMenu ⚔️'],
        ['/bags 💰', '/equipments 🛡️'],
        ['/levelUp 🆙', '/me 😄'],
        ['/getplayers']
    ]))

// module.exports.levelUpMenu = Telegraf.Extra
//     .HTML()
//     .markup((m) => m.inlineKeyboard([
//         m.callbackButton('Add 1', 'add:1'),
//         m.callbackButton('Add 10', 'add:10'),
//         m.callbackButton('Add 100', 'add:100'),
//         m.callbackButton('Subtract 1', 'sub:1'),
//         m.callbackButton('Subtract 10', 'sub:10'),
//         m.callbackButton('Subtract 100', 'sub:100'),
//         m.callbackButton('🐈', Math.random().toString(36).slice(2)),
//         m.callbackButton('Clear', 'clear')
//     ], { columns: 3 }))

module.exports.levelUpMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/levelup str', '/levelup dex', '/levelup agi'],
        ['/levelup con', '/levelup int', '/levelup wis'],
        ['/levelup car', '/levelup wil', '/levelup luk'],
        ['/back 🔙']
    ]))


module.exports.adventuresMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/explore aq_temple'),
        m.callbackButton('/explore moten_core'),
        m.callbackButton('/explore olimpus'),
        m.callbackButton('/explore drachengard'),
        m.callbackButton('/back 🔙'),
    ]).resize())

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