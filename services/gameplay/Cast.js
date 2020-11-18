const { getPlayer } = require('../player/info-service')
const { buildPlayer } = require('../../models/factories/player-factory')

const { compoundBonus } = require('../player/inventory-service')

const dice = require('../../util/dice')

const cast = (casterInst, skill, targetInst) => {
  const skillType = skill.type
  const buffs = skill.buffs ? skill.buffs : {}
  const debuffs = skill.debuffs ? skill.debuffs : {}

  const targetTypeId = getTargetTypeId(casterInst, targetInst)

  if (skillType === 'protection') {
    return {
      successful: skill.protection.odds >= dice(100) ? true : false,
      target: targetTypeId,
      skillType,
      protection: skill.protection
    }
  }

  const successful = skillType === 'healing' ? true : calcAcc(casterInst.accuracy, targetInst.flee, skill.accuracyMod)


  const playerAtt = buffDebuff(casterInst)
  const targetAtt = buffDebuff(targetInst)

  const formulaValue = skill.formula({
    att: playerAtt,
    level: casterInst.level
  }, {
    att: targetAtt,
    level: targetInst.level
  })

  const value = skillType === 'healing' ? formulaValue : targetInst.protected ? formulaValue - ((formulaValue / 100) * targetInst.protection.factor) : formulaValue

  const agro = skill.agroGeneration ? skill.agroGeneration({
    att: playerAtt,
    level: casterInst.level
  }) : 0

  return {
    successful,
    target: targetTypeId,
    skillType,
    value,
    buffs,
    debuffs,
    agro,
  }
}

const baseAttributes = {
  str: 0,
  dex: 0,
  agi: 0,
  con: 0,
  int: 0,
  wis: 0,
  wil: 0,
  luk: 0,
  defense: 0,
}

const buffDebuff = player => {
  const { compoundedAttributes, buffs, debuffs } = player

  const sumBuff = (sum, buff) => {
    const { values } = buff
    return compoundBonus(sum, values)
  }

  const buff = buffs.reduce(sumBuff, baseAttributes)
  const debuff = debuffs.reduce(sumBuff, baseAttributes)


  const totalBuffDebuff = compoundBonus(buff, debuff)
  const total = compoundBonus(compoundedAttributes, totalBuffDebuff)

  const totalNoNegatives = Object.keys(total).reduce((acc, key) => {
    return {
      ...acc,
      [key]: total[key] < 1 ? 1 : total[key]
    }
  }, total)

  return totalNoNegatives
}

const calcAcc = (accuracy, flee, accuracyMod) => {
  const accMod = accuracyMod ? accuracyMod : 1
  return (accuracy * accMod) >= flee
}

const getTargetTypeId = (player, target) => {
  const targetId = target.id

  if (!target.isPlayer)
    return {
      type: 'enemy',
      targetId
    }

  if (player.id === target.id) {
    return {
      type: 'self',
      targetId
    }
  }

  return {
    type: 'ally',
    targetId
  }
}

module.exports = { cast }