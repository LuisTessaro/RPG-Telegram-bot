module.exports = {
  name: 'Wooden Armor',
  description: `Looks like a stump with arms slots, cant be that bad, right?.`,
  type: 'body',
  availableClasses: [0, 2, 3, 4],
  baseBonuses: {
    str: 1,
    dex: 0,
    agi: -2,
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