const Telegraf = require('telegraf')
const { buildPlayer } = require('../../../model/factories/player-factory')
const { buildMonster } = require('../../../model/factories/monster-factory')
const Treant = require('../../../model/monsters/Treant')

const { mainMenu } = require('../../../menus/menus')

const dice = require('../../../util/dice')

const { playersTurn, monsterTurn, buildSkillKeyboard } = require('./adventure-functions/turnFunctions')

const adventure = async ctx => {
  const playerInstance = buildPlayer(ctx.session.player)
  const { skills } = playerInstance
  const playerSkillsKeyboard = buildSkillKeyboard(skills)

  if (ctx.session.isOnAdventure)
    return await ctx.reply('You are already on an adventure!', playerSkillsKeyboard)


  await ctx.reply('Adventure started!')


  const monster = buildMonster(Treant, 1)

  ctx.session = {
    ...ctx.session,
    isOnAdventure: true,
    monster,
    playerInstance,
  }


  await ctx.reply(`You are fighting: ${monster.name}\nRolling iniciative...`)

  const playerRoll = dice(20)
  const monsterRoll = dice(20)

  await ctx.reply(`Player roll: ${playerRoll}\nMonster roll: ${monsterRoll}`)

  if (playerRoll > monsterRoll) {
    ctx.session.playerTurn = true
    return await ctx.reply('Your turn to attack', playerSkillsKeyboard)
  }
  else {
    await ctx.reply('Monsters Turn to attack')
    return monsterTurn(ctx)
  }
}

const cast = async ctx => {
  const playerInstance = buildPlayer(ctx.session.player)
  const { skills } = playerInstance
  const playerSkillsKeyboard = buildSkillKeyboard(skills)

  if (!ctx.session.isOnAdventure)
    return ctx.reply('You are not in an /adventure', mainMenu)

  if (!ctx.session.playerTurn)
    return ctx.reply('Not your turn', playerSkillsKeyboard)

  const [spell] = ctx.message.text.replace(/[/]|cast /g, '').split(':')

  playersTurn(ctx, spell)
}

module.exports = {
  adventure,
  cast,
}