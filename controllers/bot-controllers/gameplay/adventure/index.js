const Telegraf = require('telegraf')
const { buildPlayer } = require('../../../../model/factories/player-factory')
const { buildMonster } = require('../../../../model/factories/monster-factory')
const Treant = require('../../../../model/monsters/Treant')

const { mainMenu } = require('../../../../menus/menus')

const dice = require('../../../../util/dice')

const adventure = async ctx => {
  ctx.reply('Adventure started!')
  startAdventure(ctx)
}

const cast = async ctx => {
  const { isOnAdventure, monster, playerInstance } = ctx.session
  if (!isOnAdventure) return ctx.reply('You are not in an /adventure', mainMenu)
  const [spell] = ctx.message.text.replace(/[/]|cast /g, '').split(':')

  playersTurn(ctx, spell)
}

const monsterTurn = async ctx => {
  const { playerInstance, monster } = ctx.session

  const { name, skills, healingSkills, hp, maxHp, autoAttackDmg, attributes } = monster
  const autoDamage = dice(autoAttackDmg)

  let message = `${name} attacked for ${autoDamage} damage.\n\n`
  let skillsDamage = 0

  skills.forEach(skill => {
    const odds = dice(100)
    if (odds > skill.odds) {
      const skillDamage = dice(skill.damage(attributes))
      message += `${skill.skillName}${skill.emoji} delt: ${skillDamage} damage to you\n`
      skillsDamage += skillDamage
    }
  })

  let healing = 0
  healingSkills.forEach(skill => {
    const odds = dice(100)
    if (odds > skill.odds) {
      const skillHealing = dice(skill.heal(attributes))
      message += `${skill.skillName}${skill.emoji} healed ${name} for: ${skillHealing}\n`
      healing += skillHealing
    }
  })

  const finalLife = hp + healing
  if (finalLife < maxHp)
    ctx.session.monster.hp = finalLife
  else
    ctx.session.monster.hp = maxHp

  ctx.session.playerInstance.hp = ctx.session.playerInstance.hp - (autoDamage + skillsDamage)

  await ctx.reply(`${name}: ${ctx.session.monster.hp}/${maxHp}\nYour HP: ${ctx.session.playerInstance.hp}/ ${ctx.session.playerInstance.maxHp}\n\n${message} `)

  if (ctx.session.playerInstance.hp <= 0) {
    ctx.session.isOnAdventure = false
    return await ctx.reply(`YOU DEAD MEN`)
  }

  ctx.session.playerTurn = true
  return await ctx.reply('Your Turn', buildSkillKeyboard(playerInstance.skills))
}

const playersTurn = async (ctx, spell) => {
  const { playerTurn, playerInstance } = ctx.session
  if (!playerTurn)
    return ctx.reply('Not your turn to atack')

  ctx.session.playerTurn = false

  const {
    username,
    classe,
    skills,
    healingSkills,
    hp,
    maxHp,
    autoAttackDmg,
    playerAttributes
  } = playerInstance

  const autoDamage = dice(autoAttackDmg)

  const skillCasted = skills.find(skill => skill.skillName === spell)
  const skillDamage = skillCasted.damage(playerAttributes)


  const skillDamageCalculated = Math.ceil((skillDamage / 2) + dice(skillDamage / 2))

  const totalDamage = skillDamageCalculated + autoDamage
  const finalMonsterHp = ctx.session.monster.hp - totalDamage


  const message = `Hit for ${autoDamage} damage.\n${skillCasted.skillName}${skillCasted.emoji} delt: ${skillDamageCalculated} to ${ctx.session.monster.name} ${finalMonsterHp}/${ctx.session.monster.maxHp}`

  await ctx.reply(`${username} the ${classe} Attacked:\n\n${message}`)

  ctx.session.monster.hp = finalMonsterHp

  console.log('finalMonsterHp', finalMonsterHp)
  console.log('skillDamageCalculated', skillDamageCalculated)
  console.log('autoDamage', autoDamage)

  if (finalMonsterHp <= 0) {
    return ctx.reply('Monster is DEAD')
  }

  await ctx.reply(`Monsters turn`)
  return monsterTurn(ctx)
}

const buildSkillKeyboard = skills => {
  const skillArr =
    skills
      .map(skill => `/cast ${skill.skillName}: ${skill.emoji}`)

  let gbyTwo = []

  for (let i = 0; i < skillArr.length; i++) {
    gbyTwo.push(skillArr.slice(i, i + 2))
    i++
  }

  const menu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard(
      [
        ...gbyTwo,
        ['/surrender'],
      ]
    ))

  return menu
}

const startAdventure = async ctx => {
  const playerInstance = buildPlayer(ctx.session.player)
  const { playerAttributes, skills } = playerInstance
  const playerSkillsKeyboard = buildSkillKeyboard(skills)

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

module.exports = {
  adventure,
  cast,
}