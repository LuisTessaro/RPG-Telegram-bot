module.exports = {
  name: 'Wooden Ring',
  description: `Wood loop, looks good.`,
  type: 'ring',
  availableClasses: [0, 1, 2, 3, 4],
  baseBonuses: {
    str: 1,
    dex: 1,
    agi: 1,
    con: 0,
    int: 0,
    wis: 0,
    wil: 0,
    luk: 0,
    defense: 3
  },
  possibleModifiers: [
    {
      prefix: 'Regular',
      odds: 10,
      modifier: {}
    },
  ],
}