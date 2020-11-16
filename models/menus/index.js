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
        // ['/adventure 🌇', '/grindSpots ⏱️'],
        ['/adventure 🌇'],
        ['/player', '/pet 🐾'],
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

const petMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/pet_info'],
        ['/back 🔙'],
    ]))

const registerPetMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/create_pet'],
        ['/back 🔙'],
    ]))


const levelUpMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        ['/levelup str', '/levelup dex', '/levelup agi'],
        ['/levelup con', '/levelup int', '/levelup wis'],
        ['/levelup car', '/levelup wil', '/levelup luk'],
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
    classMenu,
    mainMenu,
    levelUpMenu,
    grindSpots,
    playerMenu,
    petMenu,
    registerPetMenu,
}