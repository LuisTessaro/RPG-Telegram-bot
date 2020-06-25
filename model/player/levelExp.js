const Player = require('../mongoose-models/Player')

const addExp = async (ctx, exp) => await Player.findByIdAndUpdate(ctx.session.player._id, { exp: ctx.session.player.exp + exp })

const removeExp = async (ctx, exp) => await Player.findByIdAndUpdate(ctx.session.player._id, { exp: ctx.session.player.exp - exp })

const addLevel = async (ctx) => await Player.findByIdAndUpdate(ctx.session.player._id, { level: ctx.session.player.level + 1 })

module.exports = {
    addExp,
    removeExp,
    addLevel,
}