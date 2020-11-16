const { registerPlayer } = require('../../services/player/register-service')
const { mainMenu } = require('../../models/menus')

module.exports = async ctx => {
  const [classId, specId, username, first_name, id] = ctx.match.input.replace(/register_player /g, '').split(' ')

  try {
    const data = {
      username,
      first_name,
      id,
      classId,
      specId,
    }

    await ctx.answerCbQuery()

    const { err, message } = await registerPlayer(data)

    if (err)
      throw err

    await ctx.reply(message, mainMenu)
    return ctx.reply('Be sure to create a /pet, they can help you collet items, equipments and exp, semi-afk!')

  } catch (err) {
    throw err
  }
}