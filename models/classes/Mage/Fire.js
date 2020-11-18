module.exports = spec => {

  spec.damageSkills = [
    ...spec.damageSkills,
    {
      name: 'Fire Blast',
      formula: (att) => {
        return att.int
      },
      buffs: {},
      debuffs: {},
      allowedTargets: [0],
      level: 1,
      cooldown: 1,
      emoji: '🔥',
      agroMultiplier: 10,
    },
  ]

  spec.healingSkills = [
    ...spec.healingSkills,
    {
      name: 'Cauterize',
      formula: (att) => {
        return att.int
      },
      buffs: {},
      debuffs: {},
      allowedTargets: [1],
      level: 1,
      cooldown: 1,
      emoji: '🔥',
      agroMultiplier: 1,
    },
  ]

  spec.protectionSkills = [
    ...spec.protectionSkills,
    {
      name: 'Fire Barrier',
      formula: (att) => {
        return att.str
      },
      buffs: {},
      debuffs: {},
      allowedTargets: [1],
      protection: {
        amount: 25,
        turns: 3,
        odds: 85,
      },
      level: 1,
      cooldown: 1,
      emoji: '🔥',
      agroMultiplier: 1,
    },
  ]

  return spec
}