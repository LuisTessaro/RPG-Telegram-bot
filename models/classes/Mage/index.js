const BaseClass = require('../BaseClass')()
const FireClass = require('./Fire')

BaseClass.allowedEquipmentTypes = [2]

BaseClass.damageSkills = [
  {
    name: 'Arcane Blast',
    formula: (att, lvl) => {
      return att.str + lvl
    },
    buffs: {},
    debuffs: {},
    allowedTargets: [0],
    level: 1,
    cooldown: 1,
    emoji: '🧙‍♂️',
    agroMultiplier: 1,
  },
]

module.exports = {
  Fire: FireClass(Object.assign({}, BaseClass)),
}