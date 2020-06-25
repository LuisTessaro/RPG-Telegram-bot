const limao = {
  username: 'bunda_mole',
  classe: 'warrior',
  level: 1,
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
      skillName: 'Weapon Swing',
      levelRequired: 1,
      odds: 70,
      emoji: '���'
    },
    {
      skillName: 'Furious Slash',
      levelRequired: 1,
      odds: 40,
      emoji: '���'
    },
    {
      skillName: 'Rage!!!',
      levelRequired: 1,
      odds: 5,
      emoji: '���'
    }
  ],
  healingSkills: [
    {
      skillName: 'Second wind',
      levelRequired: 1,
      odds: 30,
      emoji: '���'
    }
  ],
  hp: 11,
  maxHp: 11,
  autoAttackDmg: 8,
  flee: 5,
  accuracy: 3,
  iniciativeBonus: 1,
  defense: 0,
  equipmentBonus: {
    str: 1,
    dex: 0,
    agi: 3,
    con: 0,
    int: 0,
    wis: 0,
    car: 0,
    wil: 0,
    luk: 0,
    defense: 0
  },
  playerAttributes: { str: 2, dex: 1, agi: 4, con: 1, int: 1, wis: 1, wil: 1, luk: 1 }
}

console.log(Object.keys(limao))