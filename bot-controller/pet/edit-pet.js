const { changePetName } = require('../../services/player/edit-pet-service')

module.exports = async ctx => {
  const name = ctx.message.text.split(' ')[1]

  if (!name)
    throw 'Please write a new pet name after the command (1~25 characters)'

  if (name.length > 25)
    throw 'Pet name cant have more than 25 characters'

  try {
    await changePetName(ctx.session.userInfo, name)
    return ctx.reply('Pet name changed to: ' + name)
  } catch (err) {
    throw 'Err ' + err
  }
}