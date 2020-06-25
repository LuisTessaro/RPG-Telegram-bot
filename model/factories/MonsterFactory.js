module.exports.buildMonster = (monster, partySize) => {
    return {
        name: monster.name,
        attributes: monster.attributes,
        skills: monster.skills,
        healingSkills: monster.healingSkills,

        hp: monster.hpFormula(monster.attributes, partySize),
        maxHp: monster.hpFormula(monster.attributes, partySize),

        autoAttackDmg: monster.autoAttackFormula(monster.attributes),
        flee: monster.fleeFormula(monster.attributes),
        accuracy: monster.accuracyFormula(monster.attributes),
        iniciativeBonus: monster.attributes.wil,
        defense: monster.defenseFormula(monster.attributes),
        monsterMagicalDefense: monster.magicalDefenseFormula(monster.attributes),
    }
}