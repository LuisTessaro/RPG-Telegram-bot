const { buildPlayer } = require('../factories/player-factory')
const { buildMonster } = require('../factories/monster-factory')
const AdventureProgress = require('../mongoose-models/AdventureProgress')
const Telegraf = require('telegraf')
const { addExp } = require('../../helpers/levelExp')
const { addItensToBag } = require('../../helpers/addItensToBag')

const anqTemple = require('../../maps/anq-temple/anqTemple')

const seconds = 1

module.exports.explore = async (ctx, map) => {
    await exploreWrapper(ctx, map)
}

const exploreWrapper = async (ctx, map) => {
    const progress = await getProgress(ctx.session.player.telegramId, map)
    // console.log(progress)
    setTimeout(async () => {
        ctx.session.needsAction = true
        await ctx.replyWithPhoto({
            url: anqTemple.imgUrl(progress.progress)
        })
        return ctx.reply(anqTemple.nots[progress.progress].textMessage + ctx.progress, actionMenu)
    }, 1000 * seconds)
}

const death = async (ctx) => {
    ctx.session.needsAction = undefined
    ctx.session.adventuring = undefined
    resetProgress(ctx.session.progress)
    ctx.session.progress = undefined
    ctx.session.map = undefined
    return ctx.reply('You died an got sent back to the city')
}

const back = async (ctx) => {
    ctx.session.needsAction = undefined
    ctx.session.adventuring = false
    resetProgress(ctx.session.progress)
    ctx.session.progress = undefined
    ctx.session.map = undefined
    return ctx.reply('You got back from your adventure')
}

const actionMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('/inspect'),
        m.callbackButton('/fight'),
        m.callbackButton('/bargain'),
        m.callbackButton('/sneak'),
        m.callbackButton('/colect'),
        m.callbackButton('/flee'),
        m.callbackButton('/back'),
    ]).resize())



const getProgress = async (id, map) => {
    const progress = await AdventureProgress.find({ telegramId: id })
    if (progress && progress.length > 0) {
        return progress[0]
    } else {
        const newProgress = new AdventureProgress(
            {
                telegramId: id,
                map: map,
                progress: 0
            })
        await newProgress.save()
        return newProgress
    }
}

module.exports.encounterFunctions = {
    explorational: async (ctx, action) => {
        if (action.after === 'back')
            return back(ctx)
        const roll = dice(20)
        ctx.session.needsAction = false
        if (roll > action.odds) {
            await ctx.reply(action.message)
            await ctx.reply('Moving to the next position')
            await addExp(ctx, action.reward.xp)
            await addItensToBag(ctx, action.reward.loot)
            await nextKnot(ctx, ctx.session.player.telegramId)
            return exploreWrapper(ctx, ctx.session.map)
        } else if (action.after === 'next') {
            await ctx.reply('You dint find anything out of the ordinary')
            await ctx.reply('Moving to the next position')
            return exploreWrapper(ctx, ctx.session.map)
        }
    },
    combative: async (ctx, action) => { },
    bossFight: async (ctx, action) => { },
    trap: async (ctx, action) => { },
}


const nextKnot = async (ctx, telegramId) => {
    const progress = await getProgress(telegramId)
    const newProgress = progress.progress + 1
    ctx.session.progress = newProgress
    await AdventureProgress.findByIdAndUpdate(progress._id, {
        $set: { progress: newProgress }
    }, {
            new: true
        })
    return 'done'
}

const resetProgress = async (progressOld) => {
    console.log(progressOld._id)
    console.log(await AdventureProgress.findByIdAndDelete(progressOld._id))
}

const battle = (player, monster, ctx, map) => {
    let battleLog = ''
    const playerIniciative = dice(20)
    const monsterIniciative = dice(20)

    const playerMaxHp = player.maxHp
    const monsterMaxHp = monster.hp
    battleLog += `🔶${monster.name} rolled a ${monsterIniciative}\n`
    battleLog += `🔷${player.username} rolled a ${playerIniciative}\n\n`

    if (playerIniciative > monsterIniciative) battleLog += `${player.username} won the initiative!\n\n`
    else battleLog += `${monster.name} won the initiative!\n\n`

    const monsterTurn = () => {
        const monsterDamage = dice(monster.autoAttackDmg)
        const playerFlee = dice(player.flee)
        const monsterAccuracy = dice(monster.accuracy)
        battleLog += `🔶 🎯${monsterAccuracy}  💢${monsterDamage}  ✨${playerFlee}\n`
        if (monsterAccuracy >= playerFlee) {
            battleLog += `${monster.name} dealt ${monsterDamage} damage to ${player.username}\n`
            player.hp -= monsterDamage
            battleLog += `${player.username} hp: ${player.hp}/${playerMaxHp}\n\n`
            if (player.hp <= 0) {
                ctx.session.exploring = false
                battleLog += 'You died! Use the buttons to try again'
                return 'end'
            }
        } else battleLog += `${monster.name} missed the attack\n   miss\n\n`
    }

    const playerTurn = () => {
        const playerDamage = dice(player.autoAttackDmg)
        const monsterFlee = dice(monster.flee)
        const playerAccuracy = dice(player.accuracy)
        battleLog += `🔷 🎯${playerAccuracy}  💢${playerDamage}  ✨${monsterFlee}\n`
        if (playerAccuracy >= monsterFlee) {
            battleLog += `${player.username} dealt ${playerDamage} damage to ${monster.name}\n`
            monster.hp -= playerDamage

            player.skills.forEach((skill) => {
                const rand = dice(100)
                if (rand < skill.odds) {
                    let skillDamage = skill.damage(player.playerAttributes) / 2
                    skillDamage += dice(skill.damage(player.playerAttributes)) / 2
                    battleLog += `${skill.emoji} ${skill.skillName} cast for ${skillDamage} damage\n`
                    monster.hp -= skillDamage
                }
            })

            player.healingSkills.forEach((skill) => {
                const rand = dice(100)
                if (rand < skill.odds) {
                    let skillHealing = dice(skill.heal(player.playerAttributes))
                    if (skillHealing === 0) skillHealing += 1
                    battleLog += `${skill.emoji} ${skill.skillName} cast for ${skillHealing} healing\n`
                    if (player.hp + skillHealing >= playerMaxHp) player.hp = playerMaxHp
                    else player.hp += skillHealing
                }
            })

            battleLog += `${monster.name} hp: ${monster.hp}/${monsterMaxHp}\n\n`

            if (monster.hp <= 0) {
                battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`
                return 'end'
            }
        } else {
            battleLog += `${player.username} missed the attack\n   miss\n\n`
            return battleLog
        }
    }

    while (monster.hp > 0) {
        if (playerIniciative > monsterIniciative) {
            if (playerTurn(ctx, battleLog, player, monster, map, playerMaxHp, monsterMaxHp) === 'end')
                if (ctx.session.wantsToExplore) {
                    return {
                        log: `✔️${player.username} vs. ${monster.name}!\n\n` + battleLog,
                        intent: true
                    }
                } else {
                    ctx.session.exploring = false
                    return {
                        log: `✔️${player.username} vs. ${monster.name}!\n\n` + battleLog + '\n\nYou stoped exploring!',
                        intent: false
                    }
                }

            if (monsterTurn(ctx, battleLog, player, monster, map, playerMaxHp, monsterMaxHp) === 'end')
                return {
                    log: `❌${player.username} vs. ${monster.name}!\n\n` + battleLog,
                    intent: false
                }
        } else {
            if (monsterTurn(ctx, battleLog, player, monster, map, playerMaxHp, monsterMaxHp) === 'end')
                return {
                    log: `❌${player.username} vs. ${monster.name}!\n\n` + battleLog,
                    intent: false
                }

            if (playerTurn(ctx, battleLog, player, monster, map, playerMaxHp, monsterMaxHp) === 'end')
                if (ctx.session.wantsToExplore) {
                    return {
                        log: `✔️${player.username} vs. ${monster.name}!\n\n` + battleLog,
                        intent: true
                    }
                } else {
                    ctx.session.exploring = false
                    return {
                        log: `✔️${player.username} vs. ${monster.name}!\n\n` + battleLog + '\n\nYou stoped exploring!',
                        intent: false
                    }
                }
        }
    }
}

function dice(faces) {
    return Math.floor((Math.random() * faces + 1) + 1)
}
