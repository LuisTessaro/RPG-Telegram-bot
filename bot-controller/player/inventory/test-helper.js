const { addEquipment } = require('../../../services/player/inventory-service')

module.exports = async (ctx) => {
    try {
        const item1 = await addEquipment(ctx.session.userInfo, 'WoodenArmor')
        const item2 = await addEquipment(ctx.session.userInfo, 'BronzeDagger')
        const item3 = await addEquipment(ctx.session.userInfo, 'GoldDagger')
        ctx.reply(item1 + ' added')
        ctx.reply(item2 + ' added')
        return ctx.reply(item3 + ' added')
    } catch (err) {
        console.log('err', err)
        throw err
    }

}
