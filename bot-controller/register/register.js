const { registerPlayer } = require('../../services/player/register-service')
const { writeLog } = require('../../services/logs/log-service')
const { mainMenu } = require('../../models/menus')

module.exports = async ctx => {
  const [classId, specId, username, id] = ctx.match.input.replace(/register_player /g, '').split(' ')

  try {
    const data = {
      username,
      id,
      classId,
      specId,
    }

    console.log(data)

    await ctx.answerCbQuery()

    const { err, message } = await registerPlayer(data)

    writeLog('register', Date.now(), {
      username: data.username
    })

    if (err)
      throw err

    await ctx.reply(message, mainMenu)
    return ctx.reply('Be sure to create a /pet, they can help you collet items, equipments and exp, semi-afk!')

  } catch (err) {
    throw err
  }
}