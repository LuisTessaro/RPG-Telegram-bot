const actionFactory = require('../../actionsFactory')

const encounterMessage =
    `"This AGAIN??". You find more skeletons, they look angry.`

const possibleMonsters = ['BigSkeletonArcher', 'BigSkeletonWarrior', 'SkeletonMage']

module.exports = (url, encounterType) => {
    const knot = actionFactory.actionsObj(
        encounterMessage,
        encounterType,
        url,
        possibleMonsters
    )

    knot.possibleActions['inspect'].message = 'You inspect the skelletons just a bit too close and they atack you'
    knot.possibleActions['inspect'].after = 'fight'

    knot.possibleActions['fight'].message = 'You attack the skeletons.'
    knot.possibleActions['fight'].after = 'fight'

    knot.possibleActions['bargain'].message = 'You dont seem to be able to bargain with the undead monster (What did you expect).'
    knot.possibleActions['bargain'].after = 'fight'

    knot.possibleActions['sneak'].message = 'You sneak pass the skeletons on the main hall.'
    knot.possibleActions['sneak'].odds = 5000
    knot.possibleActions['sneak'].after = 'fight'
    knot.possibleActions['sneak'].reward = {
        xp: 500,
        loot: []
    }

    return knot
}