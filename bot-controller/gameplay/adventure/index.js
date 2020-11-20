const { battleMenu } = require('../../../models/menus')

const { getPlayer } = require('../../../services/player/info-service')
const { buildPlayer } = require('../../../models/factories/player-factory')

const { buildKeyboard } = require('../../../util/build-combat-keyboard')

const { startAdventure } = require('../../../services/gameplay/AdventureService')

module.exports = bot => {
  
  bot.command('adventure', async ctx => {
    try {
      await startAdventure([ctx.session.userInfo.telegramId], ['outskirts_slime'], bot)

      return ctx.reply('Adventure Started!')
    } catch (err) {
      console.log(err)
      throw err
    }
  })


  bot.command('attack', async ctx => {
    const builtPlayer = await buildPlayer(await getPlayer(ctx.session.userInfo))
    ctx.reply('Choose a spell', buildKeyboard(builtPlayer.damageSkills))
  })

  bot.command('heal', async ctx => {
    const builtPlayer = await buildPlayer(await getPlayer(ctx.session.userInfo))
    ctx.reply('Choose a spell', buildKeyboard(builtPlayer.healingSkills))
  })

  bot.command('defend', async ctx => {
    const builtPlayer = await buildPlayer(await getPlayer(ctx.session.userInfo))
    ctx.reply('Choose a spell', buildKeyboard(builtPlayer.protectionSkills))
  })

  bot.command('back_to_action', ctx => ctx.reply('Pick an action', battleMenu))

  bot.command('surrender', ctx => ctx.reply('surrender not implemented'))
}