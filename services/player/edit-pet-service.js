const Player = require('../../models/mongoose-models/Player')

const changePetName = async ({ telegramId }, newName) => {

  try {
    const player = await Player.findOne({ telegramId })

    if (!player)
      throw 'Player does not exist'

    if (!player.has_registered_pet)
      throw 'Player does not have a pet registered'

    player.pet.name = newName
    return await player.save()
  } catch (err) {
    throw err
  }
}

module.exports = {
  changePetName,
}