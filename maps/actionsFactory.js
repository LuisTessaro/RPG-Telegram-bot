module.exports.actionsObj = (startMessage, encounterType, url, monsters) => {
    const cleanObj = {
        possibleActions: {
            'inspect': {
                message: 'You dont find anything out of the ordinary',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'fight': {
                message: 'You dont seem to find anything to fight with.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'bargain': {
                message: 'You dont seem to find anything to bargain with.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'sneak': {
                message: 'You sneak pass the entrance.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'colect': {
                message: 'Theres nothing to collect.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'next',
            },
            'flee': {
                message: 'You run away with your loot.',
                reward: {
                    xp: 0,
                    loot: []
                },
                odds: 0,
                after: 'back',
            }
        },
        startMessage: startMessage,
        encounterType: encounterType,
        imgUrl: url,
        monsters: monsters || []
    }
    return cleanObj
}
