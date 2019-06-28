const validMaps = ['aq_temple', 'moten_core', 'drachengard', 'olimpus',]
const { grind } = require('../../../../model/gameplay/startGrind')
const menus = require('../../../../menus/menus')

module.exports.grind = async ctx => {
    const map = ctx.message.text.split(' ')[1]
    const message = 'Grinding on ' + map + ' will take 2h, you will get some xp and maybe some itens, fun :D'
    if (map && validMaps.includes(map) && !ctx.session.grinding) {
        await ctx.reply(message, message)
        await ctx.reply('You can do other things while griding:', menus.mainMenu)
        await grind(ctx, map)
    } else if (ctx.session.grinding)
        return ctx.reply('You are aready grinding!')
    else
        return ctx.reply('Invalid map, try again!')
}

