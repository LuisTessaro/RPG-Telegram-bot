const Telegraf = require('telegraf')

const classMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/register warrior ⚔️'],
        ['/register mage 🧙'],
        ['/register archer 🏹'],
        ['/register thief 🗡️'],
        ['/register cleric ✝️'],
        ['/back 🔙'],
    ]))

const mainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/adventure 🌇', '/grindSpots ⏱️'],
        ['/bags 💰', '/equipments 🛡️'],
        ['/levelup_stats 🆙', '/me 😄'],
    ]))


const levelUpMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/levelup str', '/levelup dex', '/levelup agi'],
        ['/levelup con', '/levelup int', '/levelup wis'],
        ['/levelup car', '/levelup wil', '/levelup luk'],
        ['/back 🔙']
    ]))


const grindSpots = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/grind outskirts_of_town'],
        ['/grind green_woods'],
        ['/grind bat_cave'],
        ['/grind dark_forest'],
        ['/grind dragons_cave_entrance'],
        ['/back 🔙'],
    ]))

module.exports = {
    classMenu,
    mainMenu,
    levelUpMenu,
    grindSpots
}