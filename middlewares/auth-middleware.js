const Player = require('../models/mongoose-models/Player')

module.exports = async (ctx, next) => {
  const { authed } = ctx.session

  if (authed)
    return next()

  try {
    const player = await Player.findOne({ telegramId: ctx.message.from.id })

    if (!player) {
      throw 'You must register before playing the game /register'
    }

    ctx.session.userInfo = {
      username: ctx.message.from.username,
      first_name: ctx.message.from.first_name,
      telegramId: ctx.message.from.id,
    }

    ctx.session.authed = true

    console.log(`[INFO] ${ctx.message.from.id} authed`)
    return next()
  } catch (err) {
    if (err)
      throw err

    throw 'Auth Server Error Please try again later'
  }
}
