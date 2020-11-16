const Extra = require('telegraf/extra')
const { getPlayer } = require('../../services/player/info-service')
const Pets = require('../../models/pets')

const { petMenu } = require('../../models/menus')

module.exports = async ctx => {
  const player = await getPlayer(ctx.session.userInfo)

  if (!player.has_registered_pet) {
    Pets.forEach(pet => {
      const extra = buildInline(pet, player._id)
      extra.caption = pet.description
      ctx.replyWithPhoto(pet.petImage, extra)
    })
    return
  }

  return ctx.reply('Pet menu:', petMenu)
}


const buildInline = (pet, id) => {
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      [m.callbackButton(`Pick ${pet.name}`, `register_pet ${pet.name} ${pet.id} ${id}`)]
    )
  )
}