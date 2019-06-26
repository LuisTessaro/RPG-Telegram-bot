const Telegraf = require('telegraf')
const validMaps = ['aq_temple',]
const { explore, encounterFunctions } = require('../../../../model/gameplay/startAdventure')

const anqTemple = require('../../../../maps/anq-temple/anqTemple')

module.exports.explore = ctx => {
    const map = ctx.message.text.split(' ')[1]
    if (map && validMaps.includes(map) && !ctx.session.adventuring) {
        ctx.session.adventuring = true
        ctx.session.map = map
        explore(ctx, map)
        return ctx.reply('You started exploring!')
    } else if (ctx.session.adventuring)
        return ctx.reply('You are aready exploring!')
    else
        return ctx.reply('Invalid map, try again!')
}

module.exports.action = async ctx => {
    const action = ctx.message.text.split('/')[1]
    const current = anqTemple.nots[ctx.session.progress.progress].possibleActions[action]
    encounterFunctions['explorational'](ctx, current)
}

module.exports.adventures = async ctx => {
    ctx.reply('Pick an adventure from the ones below:', adventuresMenu)
}

const adventuresMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/explore aq_temple'),
        m.callbackButton('/back'),
    ]).resize())