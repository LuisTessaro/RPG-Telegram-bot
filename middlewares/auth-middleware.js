const Player = require('../models/mongoose-models/Player')

module.exports = async (ctx, next) => {
  // try {
  //   const player = await Player.findOne({ telegramId: ctx.message.from.id })

  //   if (!player) {
  //     throw 'You must register before playing the game /register'
  //   }

  return next()
  // } catch (err) {
  //   if (err)
  //     throw err

  //   throw 'Auth Server Error Please try again later'
  // }
}
