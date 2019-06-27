const Telegraf = require('telegraf')
const Itens = require('../../../../model/itens/equipment')

module.exports.getItens = async (ctx) => {
    const msg = (ctx.session.player.bag.reduce((inventoryMessage, equipName) => {
        const equip = Itens[equipName]
        inventoryMessage += `Name: ${equip.name}\n`
        inventoryMessage += `Type: ${equip.type.charAt(0).toUpperCase() + equip.type.slice(1)}\n`
        inventoryMessage += `Description: ${equip.description}\n`
        inventoryMessage += `Bonus: ${calculateBonus(equip.bonuses)}\n\n`
        return inventoryMessage
    }, 'Bags: \n'))

    return ctx.reply(msg, buildInventoryMenu(ctx.session.player.bag))
}

module.exports.getEquipments = async (ctx) => {
    const inventory = ctx.session.player.inventory

    const msg = Object.keys(inventory).reduce((inventoryText, itenSlot) => {
        const slotName = itenSlot.charAt(0).toUpperCase() + itenSlot.slice(1)
        const itemName = inventory[itenSlot].name
        const bonus = calculateBonus(inventory[itenSlot].bonuses)
        return inventoryText +
            `${slotName}: ${itemName}\nBonus:${bonus}
            \n`
    }, '')
    return ctx.reply('You equiped Itens\n' + msg)
}

const calculateBonus = (bonuses) => {
    const bonusParsed = Object.keys(bonuses).reduce((bonusesAcc, stat, i) => {
        if (bonuses[stat] > 0)
            return bonusesAcc + `\n${stat}: +${bonuses[stat]}`
        return bonusesAcc
    }, '')
    if (bonusParsed)
        return bonusParsed
    return 'No bonus!'
}

const buildInventoryMenu = (bag) => {
    const inventoryButtons = (m) => {
        return [...bag.reduce((inventoryButtons, equipName) => {
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