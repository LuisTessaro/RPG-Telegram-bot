const Player = require('../../models/mongoose-models/Player')

module.exports = async ({ telegramId }) => {
  const player = await Player.findOne({ telegramId })
  return player
}