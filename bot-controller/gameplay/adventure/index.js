const { v4: uuidv4 } = require('uuid')
const { battleMenu } = require('../../../models/menus')

const { getPlayer } = require('../../../services/player/info-service')
const { buildPlayer } = require('../../../models/factories/player-factory')

const { buildKeyboard } = require('../../../util/build-combat-keyboard')

const { SlimeObj, BuildSlime } = require('../../../models/monsters/outskirts-of-town/Slime')
const { buildMonster } = require('../../../models/factories/monster-factory')

const { startAdventure } = require('../../../services/gameplay/AdventureService')

module.exports = bot => {

  // Creates adventure
  bot.command('adventure', async ctx => {
    try {
      const [player1, player2] = await Promise.all([getPlayer(ctx.session.userInfo), getPlayer({ telegramId: 216953316 })])
      const [builtPlayer, builtPlayer2] = await Promise.all([await buildPlayer(player1), await buildPlayer(player2)])

      const builtMonster1 = buildMonster(BuildSlime(1), SlimeObj, uuidv4())
      const builtMonster2 = buildMonster(BuildSlime(2), SlimeObj, uuidv4())


      await startAdventure([builtPlayer, builtPlayer2], [builtMonster1, builtMonster2])

      return ctx.reply('Adventure Started!')
    } catch (err) {
      console.log(err)
      throw err
    }
  })

  bot.command('humn', async ctx => {

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