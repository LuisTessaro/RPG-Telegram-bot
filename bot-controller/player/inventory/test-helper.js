const { addEquipment } = require('../../../services/player/inventory-service')

module.exports = async (ctx) => {
    try {
        const weap = await addEquipment(ctx.session.userInfo, 'BronzeDagger')
        return ctx.reply(weap + ' added')
    } catch (err) {
        console.log('err', err)
        throw err
    }

}
