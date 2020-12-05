const { levelUpMenu, mainMenu, playerMenu, petMenu, bagMenu } = require('../../models/menus')
const playerInfo = require('./info')

const {
    getBag,
    getEquipment,
    equipItem,
    testHelper,
} = require('./inventory')

const levelup = require('./stats/')

const { addExp, removeExp } = require('../../services/player/exp-service')

module.exports = (bot) => {
    bot.command('player', (ctx) => ctx.reply('Player menu:', playerMenu))

    bot.command('show_player_stats', playerInfo)

    bot.command('bags', (ctx) => ctx.reply('Choose a slot:', bagMenu))
    bot.command('bag', getBag)

    bot.command('equipments', getEquipment)


    bot.action(/equip (.*?)/, equipItem)

    bot.command('item_helper', testHelper)

    bot.command('levelup', levelup)
    bot.command('levelup_stats', (ctx) => ctx.reply('Pick a stat to levelup', levelUpMenu))

    bot.command('back_to_player', (ctx) => ctx.reply('Player menu:', playerMenu))

    bot.command('add_exp', async (ctx) => {
        await addExp(ctx.session.userInfo, 500)
        ctx.reply('500exp added')
    })
    bot.command('remove_exp', async (ctx) => {
        await removeExp(ctx.session.userInfo, 500)
        ctx.reply('500exp removed')
    })
}