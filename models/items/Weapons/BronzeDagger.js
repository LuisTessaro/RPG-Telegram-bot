module.exports = {
  name: 'Bronze Dagger',
  description: `A beaten Bronze Dagger.`,
  type: 'weapon',
  availableClasses: [0, 1, 2, 3, 4],
  baseBonuses: {
    str: 1,
    dex: 0,
    agi: 2,
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
        agi: -2,
      }
    },
    {
      prefix: 'Rusted',
      odds: 10,
      modifier: {
        str: -1,
        agi: -1,
      }
    },
    {
      prefix: 'Sharpened',
      odds: 8,
      modifier: {
        str: 0,
        agi: 0,
      }
    },
    {
      prefix: 'Pristine',
      odds: 2,
      modifier: {
        str: 1,
        agi: 1,
      }
    },
  ],
}