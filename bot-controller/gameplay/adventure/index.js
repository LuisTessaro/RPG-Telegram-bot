const { battleMenu } = require('../../../models/menus')

const { getPlayer } = require('../../../services/player/info-service')
const { buildPlayer } = require('../../../models/factories/player-factory')

const { buildKeyboard } = require('../../../util/build-combat-keyboard')

const { startAdventure } = require('../../../services/gameplay/AdventureService')

const { buildTargetKeyboard, castSpell } = require('./cast')

module.exports = bot => {

  bot.command('start_adventure', async ctx => {
    const userInfo = {
      telegramId: ctx.message.from.id
    }
    try {
      await startAdventure([userInfo.telegramId, 373675794], ['outskirts_slime'], bot)

      return ctx.reply('Adventure Started!', battleMenu)
    } catch (err) {
      console.log(err)
      throw err
    }
  })

  bot.command('adventure', async ctx => {
    return ctx.reply('Adventure Menu:', battleMenu)
  })

  bot.command('attack', async ctx => {
    const builtPlayer = await buildPlayer(await getPlayer(ctx.message.from.id))
    ctx.reply('Choose a spell', buildKeyboard(builtPlayer.damageSkills))
  })

  bot.command('heal', async ctx => {
    const builtPlayer = await buildPlayer(await getPlayer(ctx.message.from.id))
    ctx.reply('Choose a spell', buildKeyboard(builtPlayer.healingSkills))
  })

  bot.command('defend', async ctx => {
    const builtPlayer = await buildPlayer(await getPlayer(ctx.message.from.id))
    ctx.reply('Choose a spell', buildKeyboard(builtPlayer.protectionSkills))
  })

  bot.command('cast', buildTargetKeyboard)
  bot.command('cast_spell', castSpell)

  bot.command('back_to_action', ctx => ctx.reply('Pick an action', battleMenu))

  bot.command('surrender', ctx => ctx.reply('surrender not implemented'))
}