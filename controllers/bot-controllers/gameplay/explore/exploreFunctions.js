const validMaps = ['anq_temple']
const { adventure, encounters} = require('../../../../model/gameplay/adventure/startAdventure')

module.exports.explore = ctx => {
    const map = ctx.message.text.split(' ')[1]
    if (map && validMaps.includes(map) && !ctx.session.adventuring) {
        adventure(ctx, map)
        return ctx.reply('You started exploring ' + map + '!')
    } else if (ctx.session.adventuring)
        return ctx.reply('You are aready exploring!')
    else
        return ctx.reply('Invalid map, try again!')
}

module.exports.action = async ctx => {
    const action = ctx.message.text.split('/')[1]
    encounters(ctx, action)
}
