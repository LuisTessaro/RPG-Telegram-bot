const dice = require('../../../../../util/dice')
const Telegraf = require('telegraf')
const { mainMenu } = require('../../../../../menus/menus')
const { removeResource } = require('../../../../../model/player/resource')

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

  console.log('cost', skillCasted.cost, 'resource', playerInstance.resource)

  if (skillCasted.cost > playerInstance.resource) {
    await ctx.reply(`You dont have enough resource to cast this skill`)
    await ctx.reply(`Monsters turn`)
    return monsterTurn(ctx)
  }

  ctx.session.playerInstance.resource = await removeResource(playerInstance.id, skillCasted.cost, playerInstance.resource)

  const skillDamage = skillCasted.damage(playerAttributes)

  const skillDamageCalculated = Math.ceil((skillDamage / 2) + dice(skillDamage / 2))

  const totalDamage = skillDamageCalculated + autoDamage
  const finalMonsterHp = ctx.session.monster.hp - totalDamage


  const message = `Hit for ${autoDamage} damage.\n${skillCasted.skillName}${skillCasted.emoji} delt: ${skillDamageCalculated} to ${ctx.session.monster.name} ${finalMonsterHp}/${ctx.session.monster.maxHp}`

  await ctx.reply(`${username} the ${classe} Attacked:\n\n${message}`)

  ctx.session.monster.hp = finalMonsterHp

  if (finalMonsterHp <= 0) {
    const mName = ctx.session.monster.name
    ctx.session.monster = {}
    ctx.session.playerInstance = {}
    ctx.session.isOnAdventure = false
    ctx.session.playerTurn = false
    return await ctx.reply(`You defeated ${mName}`, mainMenu)
  }

  await ctx.reply(`Monsters turn`)
  return monsterTurn(ctx)
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
    return await ctx.reply(`You were defeated!`, mainMenu)
  }

  ctx.session.playerTurn = true
  return await ctx.reply('Your Turn', buildSkillKeyboard(playerInstance.skills))
}

const buildSkillKeyboard = skills => {
  const skillArr =
    skills
      .map(skill => `/cast ${skill.skillName}: ${skill.emoji} cost: ${skill.cost}`)

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
        ['/surrender 🏳️', ' /back 🔙'],
      ]
    ))

  return menu
}


module.exports = {
  playersTurn,
  monsterTurn,
  buildSkillKeyboard,
}