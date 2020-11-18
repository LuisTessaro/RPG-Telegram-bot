const { grindSpots, battleMenu } = require('../../models/menus')
const grind = require('./grind')

const { v4: uuidv4 } = require('uuid')

const { getPlayer } = require('../../services/player/info-service')
const { buildPlayer } = require('../../models/factories/player-factory')

const { buildKeyboard } = require('../../util/build-combat-keyboard')

const cast_spell = require('./adventure/cast')

const { cast } = require('../../services/gameplay/Cast')

const { SlimeObj, BuildSlime } = require('../../models/monsters/outskirts-of-town/Slime')
const { buildMonster } = require('../../models/factories/monster-factory')

module.exports = (bot) => {
  bot.command('pet_expedition', ctx => ctx.reply('Pick a grind spot', grindSpots))

  bot.command('grind', grind)

  bot.command('humn', async ctx => {
    try {
      const player = await getPlayer(ctx.session.userInfo)
      const player2 = await getPlayer({ telegramId: 216953316 })
      const builtPlayer = await buildPlayer(player)
      const builtPlayer2 = await buildPlayer(player2)
      const builtMonster = buildMonster(BuildSlime(1), SlimeObj, uuidv4())
      const builtMonster2 = buildMonster(BuildSlime(2), SlimeObj, uuidv4())

      const skillUsed = builtPlayer.damageSkills[0]
      const monsterSkill = builtMonster.damageSkills[0]

      // const response = playerTurn(builtPlayer, skillUsed, 'healing', builtPlayer)
      // const response = cast(builtPlayer, skillUsed, builtPlayer2)
      // console.log(builtPlayer)
      // console.log(builtMonster)
      // const response = cast(builtPlayer, skillUsed, builtPlayer)
      // const response = cast(builtPlayer, skillUsed, builtPlayer2)
      // const response2 = cast(builtMonster, monsterSkill, builtPlayer)
      // const response2 = cast(builtMonster, monsterSkill, builtMonster)
      const response2 = cast(builtMonster, monsterSkill, builtMonster2)
      // const response = playerTurn(builtPlayer, skillUsed, 'damage', builtPlayer2)
      // const response = playerTurn(builtPlayer2, skillUsed, 'healing', builtPlayer)

      // console.log(buildMonster(BuildSlime(1), SlimeObj))

      // console.log(response)
      console.log(response2)
    } catch (err) {
      console.log(err)
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

  bot.command('adventure', async (ctx) => {
    ctx.reply('Pick an action', battleMenu)

  })

  bot.command('cast', cast_spell)
}
