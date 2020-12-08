const { buildKeyboard } = require('../../../util/build-target-keyboard')

const { getCombatFullByTelegramId } = require('../../../services/gameplay/CombatService')

const buildTargetKeyboard = async ctx => {
  const { telegramId } = ctx.session.userInfo
  try {
    const skillName = ctx.message.text.replace(/\/cast /g, '').split('(')[0].trim()
    const combatObject = await getCombatFullByTelegramId(ctx.session.userInfo)

    const usedSkill = findUsedSkill(skillName, combatObject, telegramId)

    let possibleTargets = []

    if (usedSkill.allowedTargets.includes(0))
      possibleTargets.push(...combatObject.monsterObjects.map(monster => monster.targetId))

    if (usedSkill.allowedTargets.includes(1))
      possibleTargets.push('Yourself')

    if (usedSkill.allowedTargets.includes(2)) {
      const allies = getAllies(combatObject, telegramId)
      if (allies)
        possibleTargets.push(...allies)
    }
    const targetKeyboard = buildKeyboard(possibleTargets, skillName)
    ctx.reply('Pick a target', targetKeyboard)
  } catch (err) {
    console.log(err)
    throw err
  }
}


const getAllies = ({ playerObjects }, telegramId) => {
  if (playerObjects.length === 1) return undefined

  return playerObjects
    .filter(playerObj => playerObj.playerDbObj.telegramId !== telegramId)
    .map(playerObj => playerObj.playerDbObj.characterName ? playerObj.playerDbObj.characterName : playerObj.playerDbObj.userName)
}


const castSpell = async ctx => {
  try {
    const [skillName, targetId] = ctx.message.text.replace(/\/cast_spell /g, '').split(' on ')

    console.log(`user cast ${skillName} on ${targetId}`)
    // const playerObject = combatObject.playerObjects.find(player => player.id === ctx.session.userInfo.telegramId)

    // const skillUsedObject = playerObject.damageSkills.find(skill => skill.name === skillName)

    // const targets = combatObject.monsterObjects.map(monster => monster.targetId)
    // const targetKeyboard = buildKeyboard(targets, skillName)
    // ctx.reply('Pick a target', targetKeyboard)
  } catch (err) {
    console.log(err)
  }
}


const findUsedSkill = (skillName, combatObject, telegramId) => {
  const playerObject = combatObject.playerObjects.find(player => player.id === telegramId)


  const skills = [
    ...playerObject.damageSkills,
    ...playerObject.healingSkills,
    ...playerObject.protectionSkills,
  ]

  return skills.find(skill => skill.name === skillName)
}

module.exports = {
  castSpell,
  buildTargetKeyboard,
}
