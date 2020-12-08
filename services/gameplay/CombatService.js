const Combat = require('../../models/mongoose-models/Combat')

const getCombatFullByTelegramId = async ({ telegramId }) => {
  const combat = await Combat.findOne({ participants: { "$in": [telegramId] } })

  return combat
}

module.exports = {
  getCombatFullByTelegramId,
}