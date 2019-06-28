const validMaps = [
    'outskirts_of_town',
    'green_woods',
    'bat_cave',
    'dark_forest',
    'dragons_cave_entrance',
    'snowy_peaks',
]

const { grind } = require('../../../../model/gameplay/startGrind')
const menus = require('../../../../menus/menus')

module.exports.grind = async ctx => {
    const map = ctx.message.text.split(' ')[1]
    if (map && validMaps.includes(map) && !ctx.session.grinding) {
        const mapObj = require('../../../../maps/grind-spots/' + map)
        const message = `Grinding on ${mapObj.name} will take about ${magObj.exploreTime}h, you will get some xp and maybe some itens, fun :D`
        await ctx.reply(message)
        await ctx.reply('You can do other things while your companion is griding, like checking your itens or going into an adventure.', menus.mainMenu)
        await grind(ctx, mapObj)
    } else if (ctx.session.grinding)
        return ctx.reply('Your companion is aready grinding!')
    else
        return ctx.reply('Invalid map, try again!')
}

