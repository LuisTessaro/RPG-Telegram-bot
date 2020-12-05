module.exports = spec => {

  spec.accuracy = (att, lvl) => {
    return att.dex + lvl
  }

  spec.damageSkills = [
    ...spec.damageSkills,
    {
      name: 'Smite',
      formula: (player, target) => {
        return player.att.int
      },
      type: 'damage',
      accuracyMod: 1,
      allowedTargets: [0],
      debuffs: {
        int: -1,
      },
      level: 1,
      cooldown: 1,
      emoji: '⛑',
      agroGeneration: ({ att, level }) => 2
    },
  ]

  spec.healingSkills = [
    ...spec.healingSkills,
    {
      name: 'Holy Light',
      formula: (player, target) => {
        return player.att.int
      },
      type: 'healing',
      allowedTargets: [1, 2],
      level: 1,
      cooldown: 1,
      emoji: '⛑',
    },
  ]

  spec.protectionSkills = [
    ...spec.protectionSkills,
    {
      name: 'Divine Blessing',
      buffs: {},
      debuffs: {},
      allowedTargets: [1, 2],
      type: 'protection',
      protection: {
        amount: 100,
        turns: 1,
        odds: 50,
      },
      level: 1,
      cooldown: 1,
      emoji: '⛑',
    },
  ]

  return spec
}