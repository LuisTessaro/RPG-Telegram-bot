const Telegraf = require('telegraf')
const Itens = require('../../../../model/itens/equipment')

module.exports.getItens = async (ctx) => {
    const msg = (ctx.session.player.bag.reduce((inventoryMessage, equipName) => {
        const equip = Itens[equipName]
        inventoryMessage += `Name: ${equip.name}\n`
        inventoryMessage += `Type: ${equip.type}\n`
        inventoryMessage += `Description: ${equip.description}\n`
        inventoryMessage += `Bonus: ${JSON.stringify(equip.bonuses)}\n\n`
        return inventoryMessage
    }, 'Bags: \n'))

    return ctx.reply(msg, buildInventoryMenu(ctx.session.player.bag))

}

module.exports.getEquipments = async (ctx) => {
    const msg = ctx.session.player.inventory
    return ctx.reply(msg)

}


const buildInventoryMenu = (bag) => {
    const inventoryButtons = (m) => {
        return [...bag.reduce((inventoryButtons, equipName) => {
            console.log('/equip ' + equipName)
            return [...inventoryButtons, m.callbackButton('/equip ' + equipName)]
        }, []), m.callbackButton('/back ')]
    }
    const inventoryMenu = Telegraf.Extra
        .markdown()
        .markup((m) => m.keyboard(
            inventoryButtons(m)
        ).resize())

    return inventoryMenu
}