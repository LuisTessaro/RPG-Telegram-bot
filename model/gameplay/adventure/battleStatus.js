module.exports.pStatus = (player) => {
    const playerDamage = dice(player.autoAttackDmg)
    const playerAccuracy = dice(player.accuracy)
    const playerFlee = dice(player.flee)

    const playerSkills = player.skills.map(skill => {
        if (dice(100) < skill.odds)
            return {
                damage: (skill.damage(player.playerAttributes) / 2) + (dice(skill.damage(player.playerAttributes)) / 2),
                name: skill.skillName,
                emoji: skill.emoji
            }
    }).filter(e => e)

    const playerHealingSkills = player.healingSkills.map(skill => {
        if (dice(100) < skill.odds)
            return {
                healing: dice(skill.heal(player.playerAttributes)) || 1,
                name: skill.skillName,
                emoji: skill.emoji
            }
    }).filter(e => e)
    return {
        playerDamage,
        playerAccuracy,
        playerFlee,
        playerSkills,
        playerHealingSkills
    }
}

module.exports.mStatus = (monster) => {
    const monsterDamage = dice(monster.autoAttackDmg)
    const monsterAccuracy = dice(monster.accuracy)
    const monsterFlee = dice(monster.flee)

    const monsterSkills = monster.skills.map(skill => {
        if (dice(100) < skill.odds)
            return {
                damage: (skill.damage(monster.monsterAttributes) / 2) + (dice(skill.damage(monster.monsterAttributes)) / 2),
                name: skill.skillName,
                emoji: skill.emoji
            }
    }).filter(e => e)

    const monsterHealingSkills = monster.healingSkills.map(skill => {
        if (dice(100) < skill.odds)
            return {
                healing: dice(skill.heal(monster.monsterAttributes)) || 1,
                name: skill.skillName,
                emoji: skill.emoji
            }
    }).filter(e => e)

    return {
        monsterDamage,
        monsterAccuracy,
        monsterFlee,
        monsterSkills,
        monsterHealingSkills
    }
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1))
}