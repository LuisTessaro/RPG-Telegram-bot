const Player = require('../../models/mongoose-models/Player')

const editName = async ({ telegramId }, newName) => {
  try {
    const player = await Player.findOne({ telegramId })
    if (!player)
      throw 'Player does not exist'
    player.characterName = newName
    return await player.save()
  } catch (err) {
    throw err
  }
}

module.exports = {
  editName,
}