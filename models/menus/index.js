const { Markup } = require('telegraf')

const mainMenu = Markup.keyboard([
    // ['/adventure 🌇'],
    ['/player 😄', '/pet 🐾'],
    // ['/market 🎰', '/adventurers_guild 🏨'],
])

const bagMenu = Markup.keyboard(([
    ['/bag head', '/bag body', '/bag legs'],
    ['/bag weapon', '/bag shield'],
    ['/bag trinket', '/bag ring'],
    ['/back_to_player 🔙'],
]))

const playerMenu = Markup.keyboard(([
    ['/bags 💰'],
    ['/equipments 🛡️'],
    ['/levelup_stats 🆙'],
    ['/show_player_stats 😄'],
    ['/back 🔙'],
]))

const battleMenu = Markup.keyboard(([
    ['/attack', '/heal'],
    ['/defend', '/surrender'],
    ['/back 🔙'],
]))

const petMenu = Markup.keyboard(([
    ['/pet_expedition ⏱️'],
    ['/collect 🥇', '/pet_info 🐾'],
    ['/back 🔙'],
]))

const levelUpMenu = Markup.keyboard(([
    ['/levelup str', '/levelup dex', '/levelup agi'],
    ['/levelup con', '/levelup int', '/levelup wis'],
    ['/levelup wil', '/levelup luk'],
    ['/back_to_player 🔙']
]))

const grindSpots = Markup.keyboard(([
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