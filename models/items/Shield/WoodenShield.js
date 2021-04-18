module.exports = {
  name: 'Wooden Shield',
  description: `A block of wood, that does not look comfortable.`,
  type: 'shield',
  availableClasses: [0, 2, 3, 4],
  baseBonuses: {
    str: 0,
    dex: 0,
    agi: -2,
    con: 0,
    int: 0,
    wis: 0,
    wil: 0,
    luk: 0,
    defense: 20
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
        defense: -5,
      }
    },
    {
      prefix: 'Heavy',
      odds: 80,
      modifier: {
        agi: -2,
        defense: 10,
      }
    },
  ],
}