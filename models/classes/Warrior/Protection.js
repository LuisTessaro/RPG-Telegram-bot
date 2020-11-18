module.exports = spec => {
  spec.allowedEquipmentTypes = [...spec.allowedEquipmentTypes, 0]
  spec.defense = (att, lvl) => (att.defense * 4) + lvl

  spec.damageSkills = [
    ...spec.damageSkills,
    {
      name: 'Taunt',
      formula: (att) => {
        return att.str
      },
      buffs: {},
      debuffs: {},
      allowedTargets: [0],
      level: 1,
      cooldown: 1,
      emoji: '😤',
      agroMultiplier: 10,
    },
  ]

  spec.healingSkills = [
    ...spec.healingSkills,
    {
      name: 'Second Wind',
      formula: (att) => {
        return att.str
      },
      buffs: {},
      debuffs: {},
      allowedTargets: [1],
      level: 1,
      cooldown: 1,
      emoji: '😤',
      agroMultiplier: 1,
    },
  ]

  spec.protectionSkills = [
    ...spec.protectionSkills,
    {
      name: 'Shield Up',
      formula: (att) => {
        return att.str
      },
      buffs: {},
      debuffs: {},
      allowedTargets: [1, 2],
      protection: {
        amount: 100,
        turns: 1,
        odds: 100,
      },
      level: 1,
      cooldown: 1,
      emoji: '😤',
      agroMultiplier: 1,
    },
  ]

  return spec
}