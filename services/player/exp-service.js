const Player = require('../../models/mongoose-models/Player')

const addExp = async (telegramId, amount) => {
  const player = await Player.findOne({ telegramId })
  player.exp += amount
  await player.save()
  return true
}

const removeExp = async (telegramId, amount) => {
  const player = await Player.findOne({ telegramId })
  player.exp -= amount
  await player.save()
  return true
}

const addLevel = async (telegramId, statName) => {
  try {
    const player = await Player.findOne({ telegramId })
    const cost = Math.pow(player.level * process.env.LEVEL_WEIGHT, 2)

    if (cost > player.exp)
      return { err: `You dont have enough exp ${player.exp}/${cost}` }

    player.level += 1
    player.attributes[statName] += 1
    player.exp -= cost

    await player.save()

    return true

  } catch (err) {
    throw err
  }
}

module.exports = {
  addExp,
  removeExp,
  addLevel,
}