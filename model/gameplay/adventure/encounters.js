const fs = require('fs')
const { pStatus, mStatus } = require('./battleStatus')
module.exports = (player, monster) => {
    for (let i = 0; i < 100; i++) {
        if (monster.hp <= 0)
            const { playerDamage, playerSkills, playerHealingSkills } = pStatus(player)
        const playerTurn = `\n\n${player.username}:\nPlayer hp: ${player.hp}\nPlayerDamage: ${playerDamage}\nSkills:${playerSkills.map(skill => `${skill.name} ${skill.emoji} damage:${skill.damage}`)}\nHealing: ${playerHealingSkills.map(skill => `${skill.name} ${skill.emoji} healing:${skill.healing}, `)}\n`

        const { monsterDamage, monsterSkills, monsterHealingSkills } = mStatus(monster)
        const monsterTurn = `\n${monster.name}:\nMonster hp: ${monster.hp}\nMonsterDamage: ${monsterDamage}\nSkills:${monsterSkills.map(skill => `${skill.name} ${skill.emoji} damage:${skill.damage}`)}\nHealing: ${monsterHealingSkills.map(skill => `${skill.name} ${skill.emoji} healing:${skill.healing}, `)}\n\n`

        fs.appendFileSync('logs/' + player.classe + 'log.txt', playerTurn + monsterTurn)
    }
    return 'ayy'
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1))
}