const { buildPlayer } = require('../../model/factories/player-factory')
const { buildMonster } = require('../../model/factories/monster-factory')

const seconds = 10

module.exports.battle = (ctx, map) => {
    ctx.reply('You started Exploring!')
    ctx.session.wantsToExplore = true
    if (!ctx.session.exploring) {
        ctx.session.exploring = true
        setTimeout(() => exploreWrapper(ctx, map), seconds * 1000)
    }
    else
        ctx.reply('You are already Exploring!')
}

const exploreWrapper = (ctx, map) => {
    const builtPlayer = buildPlayer(ctx.session.player)
    const builtMonster = buildMonster(map)
    const returnObject = battle(builtPlayer, builtMonster, ctx, map)
    if (returnObject.intent) {
        ctx.reply(returnObject.log)
        setTimeout(() => exploreWrapper(ctx, map), seconds * 1000)
    } else {
        ctx.reply(returnObject.log)
    }
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

module.exports.bananaNanica = function (bot) {
    bot.on(/^\/explore (.+)$/, (msg, props) => {
        let maps = {
            green_woods: (msg, map, resolve) => {
                bot.sendMessage(msg.from.id, 'You started exploring the Green Woods')
                exploreWrapper(msg, map, resolve)
            },
            dark_forest: (msg, map, resolve) => {
                bot.sendMessage(msg.from.id, 'You started exploring the Dark Forest')
                exploreWrapper(msg, map, resolve)
            },
            bat_cave: (msg, map, resolve) => {
                bot.sendMessage(msg.from.id, 'You started exploring the Bat Cave')
                exploreWrapper(msg, map, resolve)
            },
            deep_below: (msg, map, resolve) => {
                bot.sendMessage(msg.from.id, 'You started exploring the Deep Below')
                exploreWrapper(msg, map, resolve)
            }
        }

        playerFuncs.handlePlayerExists(msg, bot)
            .then((resolve) => { // resolve is player if found
                const map = props.match[1]
                if (!users[msg.from.username]) { // if player is not on users{}
                    users[msg.from.username] = {
                        'WantsToExplore': true,
                        'exploring': false
                    }
                } else { // if player is on users{}
                    if (users[msg.from.username].exploring === true) {
                        return bot.sendMessage(msg.from.id, 'You are already exploring or did not return yet')
                    }
                    users[msg.from.username].WantsToExplore = true
                }
                if (maps[map]) {
                    maps[map](msg, map, resolve)
                } else bot.sendMessage(msg.from.id, 'Invalid map, use /start to see all available maps')
            })
            .catch(() => {
                return bot.sendMessage(msg.from.id, 'use /register to set up an account')
            })
    })

    bot.on('/stop_exploring', (msg) => {
        playerFuncs.handlePlayerExists(msg, bot)
            .then(() => {
                users[msg.from.username].WantsToExplore = false
                if (users[msg.from.username].exploring === false) {
                    return
                }
                return bot.sendMessage(msg.from.id, 'You will stop exploring as soon as a battle happens or you die.')
            })
            .catch(() => {
                return bot.sendMessage(msg.from.id, 'use /register to set up an account')
            })
    })

    function exploreWrapper(msg, map, resolve) {
        let player = playerFactory.calculateStatsForPlayer(resolve, bot)

        let monster = monsterFactory.getMonster(map, bot)

        users[msg.from.username].exploring = true

        setImmediate(() => Promise.delay(seconds * 1000)
            .then(() => {
                bot.sendMessage(msg.from.id, battle(player, monster, msg, map, resolve))
            }))

    }
}

function dice(faces) {
    return Math.floor((Math.random() * faces + 1) + 1)
}
