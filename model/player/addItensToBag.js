const Player = require('../mongoose-models/Player')

module.exports.addItensToBag = async (ctx, newItens) => {
    if (newItens.lenght <= 0) return'done'
    const newBag = [...ctx.session.player.bag, ...newItens]
    await Player.findByIdAndUpdate(ctx.session.player._id,
        {
            $set: {
                bag: newBag
            }
        }, {
            new: true
        })
    ctx.session.player.bag = newBag
    return 'done'
}