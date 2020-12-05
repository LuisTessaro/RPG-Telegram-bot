const SlimeObj = require('../BaseMonster')()

const dice = require('../../../util/dice')

const BuildSlime = (level) => {
  return {
    id: 'outskirts_slime',
    monsterImage: 'https://i.redd.it/dou4sj6lpo821.png',
    level,
    attributes: {
      str: dice(level),
      dex: dice(level),
      agi: dice(level),
      con: dice(level),
      int: 1,
      wis: 1,
      wil: 1,
      luk: 1,
      defense: dice(level),
    }
  }
}

SlimeObj.damageSkills = [
  {
    name: 'Bash',
    formula: (monster, target) => {
      return monster.att.str
    },
    type: 'damage',
    accuracyMod: 1,
    allowedTargets: [0],
    level: 1,
    cooldown: 1,
    emoji: '🟢',
  },
]

SlimeObj.healingSkills = [
  {
    name: 'Repair',
    formula: (monster, target) => {
      return monster.att.con
    },
    type: 'healing',
    allowedTargets: [1],
    level: 1,
    cooldown: 1,
    emoji: '🟢',
  },
]

SlimeObj.protectionSkills = [
  {
    name: 'Harden',
    buffs: {},
    debuffs: {},
    allowedTargets: [1],
    type: 'protection',
    protection: {
      amount: 30,
      turns: 2,
      odds: 50,
    },
    level: 1,
    cooldown: 1,
    emoji: '🟢',
  },
]

module.exports = {
  BuildSlime,
  SlimeObj,
}