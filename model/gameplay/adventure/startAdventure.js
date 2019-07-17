const getProgress = require('../../../util/getProgress')
const menus = require('../../../menus/menus')
const anq_temple = require('../../../maps/anq-temple/anqTemple')
const AdventureProgress = require('../../mongoose-models/AdventureProgress')

const { buildPlayer } = require('../../factories/player-factory')
const { buildMonster } = require('../../factories/monster-factory')
const { addExp } = require('../../player/levelExp')
const { addItensToBag } = require('../../player/addItensToBag')

const encounters = require('./encounters')


const seconds = 1

module.exports.adventure = async (ctx, map) => {
    ctx.session.adventuring = true
    ctx.session.map = map
    await exploreWrapper(ctx, map)
}

const exploreWrapper = async (ctx, mapName) => {
    const map = getMap[mapName]
    ctx.session.mapOjb = map
    const progress = await getProgress(ctx.session.player.telegramId, mapName)

    if (progress.progress > map.limit) {
        ctx.session.adventuring = undefined
        await resetProgress(progress)
        return ctx.reply(map.endReply, menus.mainMenu)
    }

    setTimeout(async () => {
        try {
            ctx.session.needsAction = true
            await ctx.replyWithPhoto({
                url: map.imgUrl(progress.progress)
            })
            return ctx.reply(map.knots[progress.progress].startMessage, menus.actionsMenu)
        } catch (err) {
            ctx.session.adventuring = undefined
            return ctx.reply(err)
        }
    }, 1000 * seconds)
}

const getMap = {
    'anq_temple': anq_temple
}

module.exports.encounters = async (ctx, actionUnparsed) => {
    const map = ctx.session.mapOjb
    const [action] = actionUnparsed.split(' ')
    const curKnot = map.knots[ctx.session.progress.progress]
    const curActionObj = curKnot.possibleActions[action]
    ctx.session.needsAction = false

    console.log(curActionObj)

    const actionsBasedOnMapClosure = {
        explorational: async () => {
            if (curActionObj.after === 'back') return reset(ctx, 'You got back from your adventure')
            const roll = dice(20)
            if (roll > curActionObj.odds) {
                if (curActionObj.reward.xp > 0) await addExp(ctx, curActionObj.reward.xp)
                if (curActionObj.reward.loot.length > 0) await addItensToBag(ctx, curActionObj.reward.loot)
                await ctx.reply(curActionObj.message)
                await ctx.reply('Moving to the next position')
                await nextKnot(ctx)
                return exploreWrapper(ctx, ctx.session.map)
            }
            await ctx.reply('You dint find anything out of the ordinary')
            await ctx.reply('Moving to the next position')
            await nextKnot(ctx)
            return exploreWrapper(ctx, ctx.session.map)
        },
        combative: async () => {
            if (curActionObj.after === 'back') return reset(ctx, 'You got back from your adventure')
            const roll = dice(20)

            if (curActionObj.after === 'fight') {
                const monsterName = curKnot.monsters[Math.floor(Math.random() * curKnot.monsters.length)]
                const monster = buildMonster(monsterName)
                const player = buildPlayer(ctx.session.player, ctx.session.player.classe)
                const encaunter = encounters(player, monster)
                console.log(encaunter)
                await ctx.reply(encaunter.log)
                if (!encaunter.status)
                    return await reset(ctx, `You died fighting ${monster.name}, you will have to start the adventure again.`)

                await ctx.reply('Moving to the next position')
                await nextKnot(ctx)
                return exploreWrapper(ctx, ctx.session.map)

            }

            if (roll > curActionObj.odds) {
                if (curActionObj.reward.xp > 0) await addExp(ctx, curActionObj.reward.xp)
                if (curActionObj.reward.loot.length > 0) await addItensToBag(ctx, curActionObj.reward.loot)
                await ctx.reply(curActionObj.message)
                await ctx.reply('Moving to the next position')
                await nextKnot(ctx)
                return exploreWrapper(ctx, ctx.session.map)
            }

            await ctx.reply('Moving to the next position')
            await nextKnot(ctx)
            return exploreWrapper(ctx, ctx.session.map)
        },
        bossFight: async () => {
            if (curActionObj.after === 'back') return reset(ctx, 'You got back from your adventure')
            const roll = dice(20)

            await ctx.reply('Moving to the next position')
            await nextKnot(ctx)
            return exploreWrapper(ctx, ctx.session.map)
        },
        trap: async () => {
            if (curActionObj.after === 'back') return reset(ctx, 'You got back from your adventure')
            if (curActionObj.after === 'dead') {
                await ctx.reply(curActionObj.message)
                return reset(ctx, 'You died an got sent back to the city')
            }

            const roll = dice(20)

            if (roll > curActionObj.odds) {
                if (curActionObj.reward.xp > 0) await addExp(ctx, curActionObj.reward.xp)
                if (curActionObj.reward.loot.length > 0) await addItensToBag(ctx, curActionObj.reward.loot)
                await ctx.reply(curActionObj.message)
                await ctx.reply('Moving to the next position')
                await nextKnot(ctx)
                return exploreWrapper(ctx, ctx.session.map)
            }

            await ctx.reply('Nothing Happens')
            await ctx.reply('Moving to the next position')
            await nextKnot(ctx)
            return exploreWrapper(ctx, ctx.session.map)
        },
        sanctuary: async () => {
            if (curActionObj.after === 'back') return reset(ctx, 'You got back from your adventure')

            const roll = dice(20)
            if (roll > curActionObj.odds) {
                if (curActionObj.reward.xp > 0) await addExp(ctx, curActionObj.reward.xp)
                if (curActionObj.reward.loot.length > 0) await addItensToBag(ctx, curActionObj.reward.loot)
                await ctx.reply(curActionObj.message)
                await ctx.reply('Moving to the next position')
                await nextKnot(ctx)
                return exploreWrapper(ctx, ctx.session.map)
            }
            await ctx.reply('You dint find anything out of the ordinary')
            await ctx.reply('Moving to the next position')
            await nextKnot(ctx)
            return exploreWrapper(ctx, ctx.session.map)
        },
    }
    await actionsBasedOnMapClosure[curKnot.encounterType]()
}

const nextKnot = async (ctx) => {
    const [progress] = await AdventureProgress.find({ telegramId: ctx.session.player.telegramId })
    const newProgress = progress.progress + 1
    ctx.session.progress = newProgress
    await AdventureProgress.findByIdAndUpdate(progress._id, {
        $set: { progress: newProgress }
    }, {
            new: true
        })
    return 'done'
}

const reset = async (ctx, message) => {
    await AdventureProgress.findByIdAndDelete(ctx.session.progress._id)
    Object.keys(ctx.session).forEach(key => ctx.session[key] = undefined)
    return ctx.reply(message, menus.mainMenu)
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1) + 1)
}