const { addEquipment } = require('../../../services/player/inventory-service')

module.exports = async (ctx) => {
    try {
        const item1 = await addEquipment(ctx.session.userInfo, 'WoodenArmor')
        const item2 = await addEquipment(ctx.session.userInfo, 'BronzeDagger')
        ctx.reply(item1 + ' added')
        return ctx.reply(item2 + ' added')
    } catch (err) {
        console.log('err', err)
        throw err
    }

}
