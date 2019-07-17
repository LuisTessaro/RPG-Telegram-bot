const actionFactory = require('../../actionsFactory')

const encounterMessage =
    `You see skeletons again, this time you are sure they are not dead, being that they are walking around, what the frik is happening here?`

const possibleMonsters = ['SkeletonArcher', 'SkeletonWarrior']

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

    knot.possibleActions['sneak'].message = 'You sneak pass the skeletons.'
    knot.possibleActions['sneak'].odds = 20
    knot.possibleActions['sneak'].after = 'fight'
    knot.possibleActions['sneak'].reward = {
        xp: 500,
        loot: []
    }

    return knot
}