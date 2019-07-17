const actionFactory = require('../../actionsFactory')
const encounterMessage =
    `BIG BOY SKELLY BOY`

const possibleMonsters = []

module.exports = (url, encounterType) => {
    const knot = actionFactory.actionsObj(
        encounterMessage,
        encounterType,
        url,
        possibleMonsters
    )

    return knot
}