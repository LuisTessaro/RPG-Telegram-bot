let warriorDescription = 'Warrior: [insert weak warrior meme here].'
warriorDescription += '\n\nCan be either a tank with the Protection spec or a damage dealer the Berserk spec.'
warriorDescription += '\n\nProtection is the only true tank in the game. Can protect allies and itself.'
warriorDescription += '\n\nBerserk can use any weapon type in the game but cannot use any type of healing spells.'
warriorDescription += '\n\nDamage ⚔️: Low/Mid\nDefense 🛡: High/Low\nAgro 😡: High/Low'

let mageDescription = 'Mage: Where do I train? On the library.'
mageDescription += '\n\nAll Specs of the mage are damage dealers but each behaves a little bit different.'
mageDescription += '\n\nFire: high damage, no defense, high agro, pure glass cannon. Can cast auto healing spells.'
mageDescription += '\n\nFrost: mid to high damage, no defense to low, mid to high agro, the closest you can get to a glass cannon but with some defensiveness. Can cast auto healing spells.'
mageDescription += '\n\nEarth: low to mid damage, high defense, high agro, can be run as a pseudo-tank. Can cast auto healing spells.'
mageDescription += '\n\nWind: mid damage, no defense, low agro, (i dont know its nieche yet :C). Can cast auto healing spells.'
mageDescription += '\n\nDamage ⚔️: Mid/High\nDefense 🛡: None/Mid\nAgro 😡: Mid/High'

let archerDescription = 'Archer: Holy shit, is that a gun in your pocket or are you happy to see me?.'
archerDescription += '\n\nAll archer specs are damage dealers, can protect allies by luring monsters to their pets.'
archerDescription += '\n\nMarksmen: middle damage defense and agro. Can protect itself and allies'
archerDescription += '\n\nBeast Master: low damage, high defense and agro. Can be run as pseudo tank and protect itself and allies'
archerDescription += '\n\nDamage ⚔️: Mid\nDefense 🛡: Mid\nAgro 😡: Mid/High'

let thiefDescription = 'Thief: Me? I hate a lot of things, and dont particularly like anything. What I have its not a dream, because i will make it a reality.'
thiefDescription += '\n\nThe thief can competently fill any role, it is still subpar as a pure tank/pure healer.'
thiefDescription += '\n\nAssassin: middle damage defense and agro. Can heal and protect itself'
thiefDescription += '\n\nPoison Master: low damage, agro, medium defense. Can use their poisons and concoctions to buffs allies and/or debuff enemies.'
thiefDescription += '\n\nPirate: low damage, high defense and agro. Can be run as tank.'
thiefDescription += '\n\nDamage ⚔️: Low/Mid\nDefense 🛡: Mid\nAgro 😡: Mid/High'

let clericDescription = 'Cleric: Its time for a crusade.'
clericDescription += '\n\nAll archer specs are damage dealers, can protect allies by luring monsters to their pets.'
clericDescription += '\n\nHealer: low damage, defense, high agro. The pure healing class. Can protect allies.'
clericDescription += '\n\nPaladin: mid damage, defense and agro. Can deal damage and heal allies while doing it'
clericDescription += '\n\nHoly warrior: low damage (high), high defense and agro. You need to kill undead monsters? this is what you are looking for.'
clericDescription += '\n\nDamage ⚔️: Low/Mid\nDefense 🛡: Mid\nAgro 😡: Mid/High'



module.exports = [
  {
    description: warriorDescription,
    className: 'Warrior',
    classImage: 'https://cdna.artstation.com/p/assets/images/images/014/610/024/original/hugues-laborde-runr01.gif?1544690216',
    specs: [
      {
        name: 'Protection',
        implemented: '✅',
        id: 0,
      },
      {
        name: 'Arms Master',
        implemented: '❌',
        id: 1
      },
    ],
    id: 0,
  },
  {
    description: mageDescription,
    className: 'Mage',
    classImage: 'https://i.pinimg.com/originals/13/10/25/131025b58f5976e879071d1788ad1023.gif',
    specs: [
      {
        name: 'Water',
        implemented: '❌',
        id: 0,
      },
      {
        name: 'Fire',
        implemented: '✅',
        id: 1
      },
      {
        name: 'Earth',
        implemented: '❌',
        id: 2
      },
      {
        name: 'Wind',
        implemented: '❌',
        id: 3
      },
    ],
    id: 1,
  },
  {
    description: archerDescription,
    className: 'Archer',
    classImage: 'https://pbs.twimg.com/media/DizhpgyWAAMnQqz.jpg',
    specs: [
      {
        name: 'Marksman',
        implemented: '❌',
        id: 0
      },
      {
        name: 'Beast Master',
        implemented: '❌',
        id: 1
      },
    ],
    id: 2,
  },
  {
    description: thiefDescription,
    className: 'Thief',
    classImage: 'https://pbs.twimg.com/media/C7E53IgXwAA-RM6.jpg',
    specs: [
      {
        name: 'Assassin',
        implemented: '❌',
        id: 0
      },
      {
        name: 'Poison Master',
        implemented: '❌',
        id: 1
      },
      {
        name: 'Pirate',
        implemented: '❌',
        id: 2
      },
    ],
    id: 3,
  },
  {
    description: clericDescription,
    className: 'Cleric',
    classImage: 'https://pbs.twimg.com/media/CuQEf4MWEAELpc9.png',
    specs: [
      {
        name: 'Healer',
        implemented: '✅',
        id: 0
      },
      {
        name: 'Paladin',
        implemented: '❌',
        id: 1
      },
      {
        name: 'Holy Warrior',
        implemented: '❌',
        id: 2
      },
    ],
    id: 4,
  },
]