const Player = require('../../../../model/mongoose-models/Player')

const addItensToBag = async (ctx) => {
    const newBag = ['FireWhip', 'HylianShield', 'CursedHand', 'BronzeDagger']

    await Player.findByIdAndUpdate(ctx.session.player._id, { bag: newBag })

    return ctx.reply('Items added')
}

module.exports = {
    addItensToBag
}