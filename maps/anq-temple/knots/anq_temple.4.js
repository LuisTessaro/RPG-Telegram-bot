const actionFactory = require('../../actionsFactory')
const encounterMessage =
    `You see an old rudumentary settlement, everything looks raged and abandoned a log time ago. You wonder who built this and where they are right now.`

const possibleMonsters = []

module.exports = (url, encounterType) => {
    const knot = actionFactory.actionsObj(
        encounterMessage,
        encounterType,
        url,
        possibleMonsters
    )

    knot.possibleActions['inspect'].message = 'You find a [Rusty Sword] and a [Red Jewel].'
    knot.possibleActions['inspect'].odds = 10
    knot.possibleActions['inspect'].reward = {
        xp: 500,
        loot: ['RustySword', 'RedJewel']
    }

    return knot
}