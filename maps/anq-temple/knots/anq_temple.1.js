const actionFactory = require('../../actionsFactory')

const encounterMessage =
    `As you venture deeper into the temple you see just how abandoned and ruined it really is, although still gorgeous is utterly ruined beyond repair. You notice a couple of skeletons with bows and arrows scattered across the grounds of the main room, as soon as you get closer to them they immediately standup.`

const possibleMonsters = ['SkeletonArcher']

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
    knot.possibleActions['sneak'].odds = 10
    knot.possibleActions['sneak'].after = 'next'
    knot.possibleActions['sneak'].reward = {
        xp: 500,
        loot: []
    }

    return knot
}