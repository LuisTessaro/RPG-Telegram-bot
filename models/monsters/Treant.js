module.exports = {
  name: 'Treant',
  attributes: {
    str: 1,
    dex: 1,
    agi: 1,
    con: 1,
    int: 1,
    wis: 1,
    car: 1,
    wil: 1,
    luk: 1
  },

  skills: [
    {
      skillName: 'StumpSmash',
      damage: (att) => {
        return att.str * 5
      },
      odds: 70,
      emoji: '🌳'
    },
    {
      skillName: 'ROOT',
      damage: (att) => {
        return att.str * 2
      },
      odds: 30,
      emoji: '🌲'
    },
  ],

  healingSkills: [{
    skillName: 'Regrowth',
    heal: (att) => {
      return att.con + att.int
    },
    odds: 30,
    emoji: '🌳'
  }],

  hpFormula: (att, partySize) => att.con * 10 * partySize,
  autoAttackFormula: (att) => att.str,
  fleeFormula: (att) => att.agi,
  accuracyFormula: (att) => att.dex,
  defenseFormula: (att) => att.con,
  magicalDefenseFormula: (att) => att.wis,
}