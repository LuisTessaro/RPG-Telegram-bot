module.exports = {
  name: 'Wooden Helmet',
  description: 'Is that a coconut?.',
  type: 'head',
  availableClasses: [0, 1, 2, 3, 4],
  baseBonuses: {
    str: 1,
    dex: 0,
    agi: 0,
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
    {
      prefix: 'Broken',
      odds: 10,
      modifier: {
        str: -1,
        defense: -3,
      }
    },
    {
      prefix: 'Heavy',
      odds: 80,
      modifier: {
        agi: -2,
        defense: 5,
      }
    },
  ],
}