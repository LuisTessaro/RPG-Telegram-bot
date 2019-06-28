const Player = require('../mongoose-models/Player')

module.exports.addExp = async (ctx, exp) => {
    const newExp = ctx.session.player.exp + exp
    ctx.session.player.exp = newExp
    await Player.findByIdAndUpdate(ctx.session.player._id, {
        $set: {
            exp: newExp
        }
    }, {
            new: true
        })
}

module.exports.removeExp = async (ctx, exp) => {
    const newExp = ctx.session.player.exp - exp
    ctx.session.player.exp = newExp
    await Player.findByIdAndUpdate(ctx.session.player._id, {
        $set: {
            exp: newExp
        }
    }, {
            new: true
        })
}

module.exports.addLevel = async (ctx) => {
    const newLevel = ctx.session.player.level + 1
    ctx.session.player.level = newLevel
    await Player.findByIdAndUpdate(ctx.session.player._id, {
        $set: {
            level: newLevel
        }
    }, {
            new: true
        })
}