module.exports.imgUrl = (index) => `https://raw.githubusercontent.com/LuisTessaro/RPG-Telegram-bot/master/maps/anq-temple/images/anq_temple.${index}.png`
/**
 * encouterTypes 
 * explorational
 * combative
 * bossFight
 * trap
 *  */


module.exports.nots = [
    {
        possibleActions: {
            'inspect': {
                possible: true,
                message: 'You find an [Old Rag] and some [Torn Priest Clothes]',
                reward: {
                    xp: 500,
                    loot: ['OldRags', 'TornPriestAttire']
                },
                odds: 15,
                after: 'next',
            },
            'fight': {
                possible: false,
                message: 'You dont seem to find anything to fight with.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'bargain': {
                possible: false,
                message: 'You dont seem to find anything to bargain with.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'sneak': {
                possible: true,
                message: 'You sneak pass the entrance.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 1,
                after: 'next',
            },
            'colect': {
                possible: true,
                message: 'Theres nothing to collect.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'flee': {
                possible: true,
                message: 'You run away with your loot.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'back',
            }
        },
        textMessage: 'From a far you can see why this temple as regarded as the biggest in the land, the sheer size of its skull shapped entrance sends chills down your spine, at first glance it looks like it was abandoned a long time ago.',
        encounterType: 'explorational'
    },
    {
        possibleActions: {
            'inspect': {
                possible: true,
                message: 'You inspect the skelletons just a bit too close and they atack you.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'fight'
            },
            'fight': {
                possible: true,
                message: 'You attack the skeletons.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'fight'
            },
            'bargain': {
                possible: false,
                message: 'You dont seem to be able to bargain with the undead monster (What did you expect).',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'fight'
            },
            'sneak': {
                possible: true,
                message: 'You sneak pass the skeletons on the main hall.',
                reward: {
                    xp: 500,
                    loot: []
                },
                odds: 15,
                after: 'next'
            },
            'flee': {
                possible: true,
                message: 'You run away with your loot.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'back'
            }
        },
        textMessage: 'As you venture deeper into the temple you see just how abandoned and ruined it really is, although still gorgeous is utterly ruined beyond repair. You notice a couple of skeletons with bows and arrows scattered across the grounds of the main room, as soon as you get closer to them they immediately standup',
        monster: ['SkeletonArcher'],
        encounterType: 'combative'
    },
    {
        possibleActions: {
            'inspect': {
                possible: true,
                message: 'You inspect the altar and find a [Old battered Ring].',
                reward: {
                    xp: 500,
                    loot: ['OldBatteredRing']
                },
                odds: 20,
                after: 'next'
            },
            'fight': {
                possible: true,
                message: 'You try to attack the angel and a massive bolder falls right on your head, better luck next time.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'dead'
            },
            'bargain': {
                possible: false,
                message: 'You dont seem to find anything to bargain with.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'sneak': {
                possible: true,
                message: 'You sneak pass the altar room.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'flee': {
                possible: true,
                message: 'You run away with your loot.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'back'
            }
        },
        textMessage: 'As you explore deeper into the temple you find an altar, unlike the rest of the temple it seems somehow well conserved. There\'s a giant marble angel with no face behind the altar, he is holding what appears to be a sculpture of Earth, but the continents are all wrong.',
        monster: ['SkeletonArcher'],
        encounterType: 'explorational'
    },
    {
        possibleActions: ['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'],
        textMessage: '',
        monster: [],
        treasure: [],
        hidden: [],
        sneakyLevel: 1,
        bargainLevel: 1,
        encounterType: 'humanoidMonster'
    },
    {
        possibleActions: ['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'],
        textMessage: '',
        monster: [],
        treasure: [],
        hidden: [],
        sneakyLevel: 1,
        bargainLevel: 1,
        encounterType: 'humanoidMonster'
    },
    {
        possibleActions: ['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'],
        textMessage: '',
        monster: [],
        treasure: [],
        hidden: [],
        sneakyLevel: 1,
        bargainLevel: 1,
        encounterType: 'humanoidMonster'
    },
    {
        possibleActions: ['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'],
        textMessage: '',
        monster: [],
        treasure: [],
        hidden: [],
        sneakyLevel: 1,
        bargainLevel: 1,
        encounterType: 'humanoidMonster'
    },
    {
        possibleActions: ['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'],
        textMessage: '',
        monster: [],
        treasure: [],
        hidden: [],
        sneakyLevel: 1,
        bargainLevel: 1,
        encounterType: 'humanoidMonster'
    },
]