const menu = require('./backMenu')
const validMaps = ['green_woods', 'bat_cave', 'dark_forest', 'deep_below',]
const { battle } = require('../../../model/gameplay/battle')
const fs = require('fs')
module.exports.gameplayRoute = (bot) => {
    bot.command('explore', (ctx) => {
        const map = ctx.message.text.split(' ')[1]
        if (map && validMaps.includes(map))
            return battle(ctx, map)
        else
            return ctx.reply('Invalid map, try again!')
    })

    bot.command('stopExploring', ctx => {
        ctx.session.wantsToExplore = false
        return ctx.reply('You will stop exploring as soon as a batlle occours or you die!')
    })

    bot.command('photo', ctx => {
        return ctx.replyWithPhoto(
            { url: path }
        )
    })

    bot.command(['back', 'start'], menu)
}
