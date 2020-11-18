const Telegraf = require('telegraf')

const mainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        // ['/adventure 🌇', '/grindSpots ⏱️'],
        ['/adventure 🌇', '/pet_expedition ⏱️'],
        ['/player 😄', '/pet 🐾'],
    ]))

const bagMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/bag head', '/bag body', '/bag legs'],
        ['/bag weapon', '/bag shield'],
        ['/bag trinket', '/bag ring'],
        ['/back_to_player 🔙'],
    ]))

const playerMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/bags 💰'],
        ['/equipments 🛡️'],
        ['/levelup_stats 🆙'],
        ['/show_player_stats 😄'],
        ['/back 🔙'],
    ]))

const battleMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/attack', '/heal'],
        ['/defend', '/surrender'],
        ['/back 🔙'],
    ]))

const petMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/collect 🥇', '/pet_info 🐾'],
        ['/back 🔙'],
    ]))

const levelUpMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/levelup str', '/levelup dex', '/levelup agi'],
        ['/levelup con', '/levelup int', '/levelup wis'],
        ['/levelup wil', '/levelup luk'],
        ['/back_to_player 🔙']
    ]))

const grindSpots = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/grind outskirts_of_town'],
        // ['/grind green_woods'],
        // ['/grind bat_cave'],
        // ['/grind dark_forest'],
        // ['/grind dragons_cave_entrance'],
        ['/back 🔙'],
    ]))

module.exports = {
    mainMenu,
    levelUpMenu,
    grindSpots,
    playerMenu,
    petMenu,
    bagMenu,
    battleMenu,
}