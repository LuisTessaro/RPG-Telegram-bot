module.exports = {
  name: 'Voodoo Doll',
  description: `oof.`,
  type: 'trinket',
  availableClasses: [0, 1, 2, 3, 4],
  baseBonuses: {
    str: 0,
    dex: 0,
    agi: -2,
    con: 0,
    int: 5,
    wis: 5,
    wil: 5,
    luk: -10,
    defense: 0,
  },

  possibleModifiers: [
    {
      prefix: 'Spooky',
      odds: 90,
      modifier: {
      }
    },
    {
      prefix: 'Cursed',
      odds: 10,
      modifier: {
        str: -20,
        dex: -20,
        agi: -20,
        con: -20,
        int: -20,
        wis: -20,
        wil: -20,
        luk: -20,
        defense: -20,
      }
    },
  ],
}