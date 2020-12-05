const BaseClass = require('../BaseClass')()
const ProtectionClass = require('./Protection')
const BerserkClass = require('./Berserk')

BaseClass.allowedEquipmentTypes = [1]

BaseClass.damageSkills = [
  {
    name: 'Weapon Swing',
    formula: (att, lvl) => {
      return att.str + lvl
    },
    buffs: {},
    debuffs: {},
    allowedTargets: [0],
    level: 1,
    cooldown: 1,
    emoji: '😤',
    agroMultiplier: 1,
  },
]

module.exports = {
  Protection: ProtectionClass(Object.assign({}, BaseClass)),
  Berserk: BerserkClass(Object.assign({}, BaseClass))
}