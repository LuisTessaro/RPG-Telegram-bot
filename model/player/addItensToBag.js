const Player = require('../mongoose-models/Player')

const addItensToBag = async (ctx, newItens) => {
    if (newItens.lenght <= 0) return true

    const newBag = [...ctx.session.player.bag, ...newItens]
    await Player.findByIdAndUpdate(ctx.session.player._id, { bag: newBag })

    return true
}

module.exports = {
    addItensToBag,
}