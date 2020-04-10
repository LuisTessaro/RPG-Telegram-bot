const Telegraf = require('telegraf')
const Items = require('../../../../model/items/equipment')

module.exports.getItems = async (ctx) => {
    const parsedBags = []
    ctx.session.player.bag.forEach((item) => {
        if (!parsedBags.includes(item))
            parsedBags.push(item)
    })
    const msg = (parsedBags.reduce((inventoryMessage, equipName) => {
        const equip = Items[equipName]
        inventoryMessage += `Name: ${equip.name}\n`
        inventoryMessage += `Type: ${equip.type.charAt(0).toUpperCase() + equip.type.slice(1)}\n`
        inventoryMessage += `Description: ${equip.description}\n`
        inventoryMessage += `Bonus: ${calculateBonus(equip.bonuses)}\n\n`
        return inventoryMessage
    }, 'Bags: \n'))

    return ctx.reply(msg, buildInventoryMenu(parsedBags))
}

module.exports.getEquipments = async (ctx) => {
    const inventory = ctx.session.player.inventory

    const msg = Object.keys(inventory).reduce((inventoryText, itemSlot) => {
        const slotName = itemSlot.charAt(0).toUpperCase() + itemSlot.slice(1)
        const itemName = inventory[itemSlot].name
        const bonus = calculateBonus(inventory[itemSlot].bonuses)
        return inventoryText +
            `${slotName}: ${itemName}\nBonus:${bonus}
            \n`
    }, '')
    return ctx.reply('Your equiped Items\n' + msg)
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
        }, []), m.callbackButton('/back 🔙')]
    }
    const inventoryMenu = Telegraf.Extra
        .markdown()
        .markup((m) => m.keyboard(
            inventoryButtons(m)
        ).resize())

    return inventoryMenu
}