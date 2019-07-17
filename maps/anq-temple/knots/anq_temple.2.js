const actionFactory = require('../../actionsFactory')

const encounterMessage =
    `You reach deeper into the temple untill you find an altar, unlike the rest of the temple it seems somehow well conserved. There\'s a giant marble angel with no face behind the altar, he is holding what appears to be a sculpture of Earth, but the continents are all wrong.`

const possibleMonsters = []

module.exports = (url, encounterType) => {
    const knot = actionFactory.actionsObj(
        encounterMessage,
        encounterType,
        url,
        possibleMonsters
    )

    knot.possibleActions['inspect'].message = 'You inspect the altar and find a [Old battered Ring].'
    knot.possibleActions['inspect'].odds = 20
    knot.possibleActions['inspect'].reward = {
        xp: 500,
        loot: ['OldBatteredRing']
    }

    knot.possibleActions['fight'].message = 'You try to attack the angel and a massive bolder falls right on your head, better luck next time.'
    knot.possibleActions['fight'].after = 'dead'

    return knot
}