module.exports.actionsObj = (textMessage, encounterType, url) => {
    const cleanObj = {
        possibleActions: {
            'inspect': {
                possible: true,
                message: 'You dont find anything out of the ordinary',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
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
                odds: 0,
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
        textMessage: textMessage,
        encounterType: encounterType,
        imgUrl: url,
    }
    return cleanObj

    // if (encounterType === 'explorational' || encounterType === 'trap')
    //     return cleanObj

    // if (encounterType === 'bossFight')
    //     return cleanObj

    // if (encounterType === 'trap')
    //     return cleanObj

    // return -1
}
