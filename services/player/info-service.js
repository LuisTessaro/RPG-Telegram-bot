const Player = require('../../models/mongoose-models/Player')

const getPlayer = async (telegramId) => {
  const player = await Player.findOne({ telegramId })
  return player
}

module.exports = {
  getPlayer
}