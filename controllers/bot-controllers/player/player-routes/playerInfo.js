const { buildPlayer } = require('../../../../model/factories/player-factory')

module.exports = async (ctx) => {
    const {
        playerAttributes,
        username,
        classe,
        maxHp,
        skills,
        level,
    } = buildPlayer(ctx.session.player)

    const atributesText =
        Object.keys(playerAttributes)
            .reduce((text, attribute) => {
                return text + `${attribute}: ${playerAttributes[attribute]}\n`
            }, '')

    const message =
        `Name: ${username}
        Class: ${classe}
        Exp: ${ctx.session.player.exp}
        Hp: ${maxHp}
        Level: ${level}
        Skills: ${skills.map(skill => `${skill.skillName}: ${skill.emoji} `)}
        Inventory: ${Object.keys(ctx.session.player.inventory).reduce((inventory, itenSlot) => inventory + itenSlot + ': ' + ctx.session.player.inventory[itenSlot].name + ', ', '')}
        Bags: ${ctx.session.player.bag}
        Attributes:\n${atributesText}`
            .replace(/        /g, '')
    ctx.reply(message)
}