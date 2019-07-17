const actionFactory = require('../../actionsFactory')
const encounterMessage =
    `From a far you can see why this temple as regarded as the biggest in the land, the sheer size of its skull shapped entrance sends chills down your spine, at first glance it looks like it was abandoned a long time ago.`

const possibleMonsters = []

module.exports = (url, encounterType) => {
    const knot = actionFactory.actionsObj(
        encounterMessage,
        encounterType,
        url,
        possibleMonsters
    )

    knot.possibleActions['inspect'].message = 'You find an [Old Rag] and some [Torn Priest Clothes].'
    knot.possibleActions['inspect'].odds = 15
    knot.possibleActions['inspect'].reward = {
        xp: 500,
        loot: ['OldRags', 'TornPriestAttire']
    }

    return knot
}