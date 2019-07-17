module.exports = (player, monster) => {
    let battleLog = ''
    const playerIniciative = dice(20)
    const monsterIniciative = dice(20)

    const playerMaxHp = player.maxHp
    const monsterMaxHp = monster.hp
    battleLog += `🔶${monster.name} rolled a ${monsterIniciative}\n🔷${player.username} rolled a ${playerIniciative}\n\n`

    battleLog += playerIniciative > monsterIniciative ? `${player.username} won the initiative!\n\n` : `${monster.name} won the initiative!\n\n`

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
        const win = `✔️${player.username} vs. ${monster.name}!\n\n` + battleLog
        const loss = `❌${player.username} vs. ${monster.name}!\n\n` + battleLog
        if (playerIniciative > monsterIniciative) {
            if (playerTurn() === 'end') return { log: win, status: true }
            if (monsterTurn() === 'end') return { log: loss, status: false }
        } else {
            if (monsterTurn() === 'end') return { log: loss, status: false }
            if (playerTurn() === 'end') return { log: win, status: true }
        }
    }
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1) + 1)
}