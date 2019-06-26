const { buildPlayer } = require('../../../../model/factories/player-factory')

module.exports.me = async (ctx) => {
    const builtPlayer = buildPlayer(ctx.session.player)
    let me = ''
    me += `Name: ${builtPlayer.username}\n`
    me += `Class: ${builtPlayer.classe}\n`
    me += `Exp: ${ctx.session.player.exp}\n`
    me += `Hp: ${builtPlayer.maxHp}\n`
    me += `Level: ${ctx.session.player.level}\n`
    me += `Skills: ${builtPlayer.skills.map(s => s.skillName + ': ' + s.emoji + ' ')}\n`
    me += `Inventory: ${JSON.stringify(ctx.session.player.inventory)}\n`
    me += `Bag: ${ctx.session.player.bag}\n`
    me += `Attributes: ${JSON.stringify(builtPlayer.playerAttributes)}\n`
    ctx.reply(me)
}