const Player = require('../../../../model/mongoose-models/Player')

module.exports.addItensToBag = async (ctx) => {
    const newBag = ['FireWhip', 'HylianShield', 'CursedHand', 'BronzeDagger']
    await Player.findByIdAndUpdate(ctx.session.player._id,
        {
            $set: {
                bag: newBag
            }
        },{
            new: true
        })
    ctx.session.player.bag = newBag
    ctx.reply(await Player.findById(ctx.session.player._id))
}