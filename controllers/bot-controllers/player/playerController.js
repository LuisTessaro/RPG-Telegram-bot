const getItems = require('./inventory/getItemFunctions')
const testFunctions = require('./inventory/inventoryTestFunctions')
const equipItem = require('./inventory/equipItem')
const playerFunctions = require('./player-routes/playerFunctions')

module.exports.playerControllerRoute = (bot) => {
    bot.command('addItensToBag', testFunctions.addItensToBag)

    bot.command('equip', equipItem)

    bot.command('inventory', getItems.getItens)

    bot.command('equipment', getItems.getEquipments)

    bot.command('me', playerFunctions.me)
}