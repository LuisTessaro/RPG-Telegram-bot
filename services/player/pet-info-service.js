const Player = require('../../models/mongoose-models/Player')

const getPet = async (telegramId) => {
  const player = await Player.findOne({ telegramId })
  return player.pet
}

module.exports = {
  getPet
}