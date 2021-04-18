const { addEquipment } = require('../../../services/player/inventory-service')

module.exports = async (ctx) => {
    const userInfo = {
        telegramId: ctx.message.from.id
    }
    try {
        const item1 = await addEquipment(userInfo, 'WoodenArmor')
        const item2 = await addEquipment(userInfo, 'BronzeDagger')
        const item3 = await addEquipment(userInfo, 'GoldDagger')
        ctx.reply(item1 + ' added')
        ctx.reply(item2 + ' added')
        return ctx.reply(item3 + ' added')
    } catch (err) {
        console.log('err', err)
        throw err
    }

}
