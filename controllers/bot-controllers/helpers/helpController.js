const Player = require('../../../model/mongoose-models/Player')
const Telegraf = require('telegraf')
const levelExp = require('../../../helpers/levelExp')
const levelStats = require('../../../helpers/levelUpStats')

module.exports.helpRoute = (bot) => {
    bot.help((ctx) => ctx.reply('/register to register'))

    bot.command('getplayers', async (ctx) => {
        const players = await Player.find()
        ctx.reply(players)
    })

    bot.command('reset', async (ctx) => {
        if (ctx.message.from.id === 207138657) {
            ctx.session.authed = undefined
            ctx.session.player = undefined
            ctx.session.wantsToExplore = undefined
            ctx.session.exploring = undefined
            Player.deleteMany({}, (err) => {
                return ctx.reply('Player collection reset!')
            })
        }
        ctx.reply('Dont even try it!')
    })

    bot.command('actionsMenu', (ctx) => {
        ctx.reply('Choose your action:', actionMenu)
    })

    bot.command('addExp', async (ctx) => {
        await levelExp.addExp(ctx, 500)
        ctx.reply('500 added')
    })
    bot.command('removeExp', async (ctx) => {
        await levelExp.removeExp(ctx, 500)
        ctx.reply('500 removed')
    })
    bot.command('addLevel', async (ctx) => {
        await levelExp.addLevel(ctx)
        ctx.reply('levelup')
    })

    bot.command('levelup', async (ctx) => {
        await levelStats.addLevel(ctx, 'agi')
        ctx.reply('agiup')
    })
}

const actionMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/fight'),
        m.callbackButton('/bargain'),
        m.callbackButton('/sneak'),
        m.callbackButton('/flee')
    ]).resize())