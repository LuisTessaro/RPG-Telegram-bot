const { rest } = require('../../model/player/resource')


module.exports = async (ctx) => {
  const minutes = 0.3
  const res = 100

  if (ctx.session.isResting)
    return ctx.reply('You are already resting')

  await ctx.reply(`You started resting, come back in 2 hours`)

  ctx.session.isResting = true

  setTimeout(async () => {
    ctx.session.isResting = false

    await rest(ctx.session.player._id, 100)

    return await ctx.reply(`You finished resting and have ${res} resource to spend on skills!`)
  }, minutes * 60 * 1000)
}
