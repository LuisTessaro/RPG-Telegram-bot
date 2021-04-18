module.exports = {
  name: 'Wooden Dagger',
  description: `A beaten Wooden Dagger.`,
  type: 'weapon',
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
    defense: 0
  },
  possibleModifiers: [
    {
      prefix: 'Regular',
      odds: 40,
      modifier: {}
    },
    {
      prefix: 'Broken',
      odds: 40,
      modifier: {
        str: -1,
      }
    },
  ],
}