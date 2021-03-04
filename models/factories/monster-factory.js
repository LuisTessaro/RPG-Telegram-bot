const setCooldowns = skill => {
    return {
        ...skill,
        currentCooldown: skill.cooldown
    }
}

const buildMonster = (monster, monsterObj, id) => {
    const attributes = monster.attributes
    const level = monster.level

    const avlDamageSkills = monsterObj.damageSkills.filter(skill => level >= skill.level)
    const avlHealingSkills = monsterObj.healingSkills.filter(skill => level >= skill.level)
    const avlProtectionSkills = monsterObj.protectionSkills.filter(skill => level >= skill.level)

    return {
        id: monster.id + '_' + id,
        targetId: monster.id + '_' + id,
        name: monster.id,
        isPlayer: false,
        level: level,
        isMonster: true,

        protected: false,
        protection: {
            turns: -1,
            factor: 0,
        },

        damageSkills: avlDamageSkills.map(setCooldowns),
        healingSkills: avlHealingSkills.map(setCooldowns),
        protectionSkills: avlProtectionSkills.map(setCooldowns),

        hp: monsterObj.hpFormula(attributes, level),
        maxHp: monsterObj.hpFormula(attributes, level),

        accuracy: monsterObj.accuracy(attributes, level),
        flee: monsterObj.flee(attributes, level),
        compoundedDefense: monsterObj.defense(attributes, level),
        autoAttack: monsterObj.autoAttack(attributes, level),

        compoundedAttributes: attributes,

        agroModifier: 1,

        buffs: [],
        debuffs: [],
    }
}

module.exports = {
    buildMonster,
}