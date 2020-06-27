const { grindSpots } = require('../../../menus/menus')
const { startGrind } = require('./grind/grindFunctions')
const { adventure, cast } = require('./adventure')

const { rest } = require('../../../model/player/resource')

module.exports.gameplayRoute = (bot) => {
  bot.command('rest', async ctx => {
    await rest(ctx.session.player._id)
    return await ctx.reply('Reseted!')
  })

  bot.command('grindSpots', ctx => ctx.reply('Pick a grind spot', grindSpots))

  bot.command('grind', startGrind)

  bot.command('adventure', adventure)
  bot.command('cast', cast)
}
