const { petMenu } = require('../../models/menus')
const { registerPet } = require('../../services/player/register-pet')

module.exports = async ctx => {
  const [petName, petId, playerId] = ctx.match.input.replace(/register_pet /g, '').split(' ')

  try {
    await ctx.answerCbQuery()

    const { err, message } = await registerPet(petId, playerId)

    if (err)
      throw err

    await ctx.reply(`${petName} picked! ${message}`, petMenu)

  } catch (err) {
    console.log(err)
    throw err
  }
}
