const { levelUpMenu, mainMenu } = require('../../menus')
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
    bot.command('me', playerInfo)

    bot.command('bags', getBag)
    bot.command('equipments', getEquipment)
    bot.command('equip', equipItem)

    bot.command('item_helper', testHelper)

    bot.command('levelup', levelup)
    bot.command('levelup_stats', (ctx) => ctx.reply('Pick a stat to levelup', levelUpMenu))

    bot.command('back', (ctx) => ctx.reply('Main menu:', mainMenu))

    bot.command('add_exp', async (ctx) => {
        await addExp(ctx.session.userInfo, 500)
        ctx.reply('500exp added')
    })
    bot.command('remove_exp', async (ctx) => {
        await removeExp(ctx.session.userInfo, 500)
        ctx.reply('500exp removed')
    })
}