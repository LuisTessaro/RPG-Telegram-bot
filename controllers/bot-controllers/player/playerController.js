const {
    getBagItems,
    getEquipmentItems,
} = require('./inventory/getItemFunctions')

const levelup = require('./stats/statsController')
const playerInfo = require('./player-routes/playerInfo')

const { addItensToBag } = require('./inventory/inventoryTestFunctions')
const equipItem = require('./inventory/equipItem')
const { levelUpMenu, mainMenu } = require('../../../menus/menus')

const { buildPlayer } = require('../../../model/factories/player-factory')

const { addExp } = require('../../../model/player/levelExp')

module.exports.playerControllerRoute = (bot) => {
    bot.command('me', playerInfo)
    bot.command('equip', equipItem)
    bot.command('bags', getBagItems)
    bot.command('equipments', getEquipmentItems)
    bot.command('levelup', levelup)
    bot.command('levelUp', (ctx) => ctx.reply('Pick a stat to levelup', levelUpMenu))

    bot.command('back', (ctx) => ctx.reply('Main menu:', mainMenu))

    bot.command('info_as_json', (ctx) => ctx.reply(buildPlayer(ctx.session.player, ctx.session.player.classe)))

    bot.command('add_items', addItensToBag)

    bot.command('add_exp', async (ctx) => {
        await addExp(ctx, 500)
        ctx.reply('500exp added')
    })
}