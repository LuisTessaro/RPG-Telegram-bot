const validMaps = [
    'outskirts_of_town',
    'green_woods',
    'bat_cave',
    'dark_forest',
    'dragons_cave_entrance'
]

const {
    bat_cave,
    dark_forest,
    dragons_cave_entrance,
    green_woods,
    outskirts_of_town,
    snowy_peaks,
} = require('../../../maps/grind-spots')

const mapsObj = {
    bat_cave,
    dark_forest,
    dragons_cave_entrance,
    green_woods,
    outskirts_of_town,
    snowy_peaks,
}

const { grind } = require('../../../model/gameplay/startGrind')
const menus = require('../../../menus/menus')

const startGrind = async ctx => {
    const map = ctx.message.text.split(' ')[1]
    if (map && validMaps.includes(map) && !ctx.session.grinding) {
        ctx.session.grinding = true
        const mapObj = mapsObj[map]

        if (ctx.session.player.level < mapObj.mininumReqiredLevel)
            return await ctx.reply(`Your companion cant grind on an area that has a higher level than you.`)

        const message = `Grinding on ${mapObj.name} will take about ${mapObj.grindTime} minutes, you will get some xp and maybe some itens!\nYou can do other things while your companion is griding, like checking your itens or going into an adventure.`

        await ctx.reply(message, menus.mainMenu)
        return grind(ctx, mapObj)

    } else if (ctx.session.grinding) {
        return ctx.reply('Your companion is aready grinding! Wait for it to come back or go on /adventure', menus.mainMenu)
    }

    return ctx.reply('Invalid map, try again!')
}

module.exports = {
    startGrind
}