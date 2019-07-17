const actionFactory = require('../../actionsFactory')

const encounterMessage =
    `"No skeletons, this is great!" After that tough path through the fores you see a clear path.`

const possibleMonsters = []

module.exports = (url, encounterType) => {
    const knot = actionFactory.actionsObj(
        encounterMessage,
        encounterType,
        url,
        possibleMonsters
    )

    knot.possibleActions['inspect'].message = 'You inspect the area and find a [Old battered Ring] on the ground.'
    knot.possibleActions['inspect'].odds = 20
    knot.possibleActions['inspect'].reward = {
        xp: 500,
        loot: ['OldBatteredRing']
    }

    return knot
}