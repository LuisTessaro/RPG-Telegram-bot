module.exports.getSkills = [
  {
    skillName: 'Double Strife',
    damage: (att) => {
      return att.dex
    },
    levelRequired: 1,
    odds: 90,
    emoji: '🏹'
  },
  {
    skillName: 'Headshot!',
    damage: (att) => {
      return att.dex * 10
    },
    levelRequired: 1,
    odds: 5,
    emoji: '🏹'
  },
  {
    skillName: 'Snipe',
    damage: (att) => {
      return att.dex * 10
    },
    levelRequired: 1,
    odds: 5,
    emoji: '🏹'
  },
  {
    skillName: 'Arrow Storm',
    damage: (att) => {
      return att.dex * 25
    },
    levelRequired: 1,
    odds: 3,
    emoji: '🏹'
  }
]

module.exports.getHealingSkills = [
  {
    skillName: 'Pet lick',
    heal: (att) => {
      return att.dex
    },
    levelRequired: 1,
    odds: 30,
    emoji: '👅'
  }]

module.exports.hpFormula = (att, lvl) => {
  return (att.con * 10) + lvl
}

module.exports.accuracyFormula = (att, lvl) => {
  return (att.dex * 2) + lvl
}

module.exports.fleeFormula = (att, lvl) => {
  return att.agi + lvl + att.agi / 2
}

module.exports.autoAttackFormula = (att, lvl) => {
  return att.dex + lvl
}

module.exports.sneakyFormula = (att, lvl) => {
  return 1
}

module.exports.bargainFormula = (att, lvl) => {
  return 1
}