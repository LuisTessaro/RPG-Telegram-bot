module.exports.getSkills = []

module.exports.getHealingSkills = [
  {
    skillName: 'Heal',
    heal: (att) => {
      return att.int * 3
    },
    levelRequired: 1,
    odds: 30,
    emoji: '✝️'
  }]
module.exports.hpFormula = (att, lvl) => {
  return (att.con * 10) + lvl
}

module.exports.accuracyFormula = (att, lvl) => {
  return (att.dex * 2) + lvl
}

module.exports.fleeFormula = (att, lvl) => {
  return att.agi + lvl
}
module.exports.autoAttackFormula = (att, lvl) => {
  return att.str
}

module.exports.sneakyFormula = (att, lvl) => {
  return 1
}

module.exports.bargainFormula = (att, lvl) => {
  return 1
}