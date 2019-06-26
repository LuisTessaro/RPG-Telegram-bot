const Player = require('../../../model/mongoose-models/Player')
const AdventureProgress = require('../../../model/mongoose-models/AdventureProgress')
const Telegraf = require('telegraf')
const levelExp = require('../../../helpers/levelExp')
const levelStats = require('../../../helpers/levelUpStats')

const anqTemple = require('../../../maps/anq-temple/anqTemple')

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

    bot.command('resetProgress', async (ctx) => {
        AdventureProgress.deleteMany({}, (err) => {
            return ctx.reply('AdventureProgress collection reset!')
        })
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

    bot.command('img', async (ctx) => {
        const index = ctx.message.text.split(' ')[1]
        ctx.replyWithPhoto({
            url: anqTemple.imgUrl(index)
        })
    })
}

const actionMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/inspect'),
        m.callbackButton('/fight'),
        m.callbackButton('/bargain'),
        m.callbackButton('/sneak'),
        m.callbackButton('/colect'),
        m.callbackButton('/flee')
    ]).resize())