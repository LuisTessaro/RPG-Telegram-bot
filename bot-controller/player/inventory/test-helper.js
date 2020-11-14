const Player = require('../../../models/mongoose-models/Player')

module.exports = async (ctx) => {
    try {
        const newBag = ['FireWhip', 'HylianShield', 'CursedHand', 'BronzeDagger']
        const player = await Player.findOne({ telegramId: ctx.session.userInfo.telegramId })

        player.bag = newBag
        console.log(player)
        await player.save()

        return ctx.reply('Items added')
    } catch (err) {
        console.log('err', err)
        throw err
    }

}
