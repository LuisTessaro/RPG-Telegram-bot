const Player = require('../../models/mongoose-models/Player')

const changePetName = async ({ telegramId }, newName) => {
  const player = await Player.findOne({ telegramId })
  player.pet.name = newName
  return await player.save()
}

module.exports = {
  changePetName,
}