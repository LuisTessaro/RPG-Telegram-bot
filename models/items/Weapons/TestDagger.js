module.exports = {
  name: 'Test Dagger',
  description: `Weird Test Dagger.`,
  type: 'weapon',
  availableClasses: [0, 1, 2, 3, 4],
  baseBonuses: {
    str: 99,
    dex: 99,
    agi: 99,
    con: 99,
    int: 99,
    wis: 99,
    wil: 99,
    luk: 99,
    defense: 99
  },
  possibleModifiers: [
    {
      prefix: 'Godly',
      odds: 40,
      modifier: {}
    },
  ],
}