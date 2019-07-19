const battle = require('../model/gameplay/adventure/encounters')

const { buildPlayer } = require('../model/factories/player-factory')

const player = buildPlayer({
    "level": 1,
    "exp": 0,
    "bag": [],
    "_id": "5d2f9d86e11f5b38d4f25449",
    "username": "bunda_mole",
    "firstName": "Luís",
    "telegramId": 207138657,
    "classe": "warrior",
    "attributes": {
        "str": 1,
        "dex": 1,
        "agi": 1,
        "con": 1,
        "int": 1,
        "wis": 1,
        "car": 1,
        "wil": 1,
        "luk": 1
    },
    "__v": 0
})

const monster = {
    level: 15,
    hp: 54,
    name: 'Spider',
    autoAttackDmg: 15,
    accuracy: 1,
    flee: 1,
    skills: [{
        skillName: 'Poison Fang',
        damage: (att) => {
            return att.int * 3
        },
        levelRequired: 1,
        odds: 20,
        emoji: '☣️'
    }],
    monsterAttributes: {
        "str": 1,
        "dex": 1,
        "agi": 1,
        "con": 1,
        "int": 1,
        "wis": 1,
        "car": 1,
        "wil": 1,
        "luk": 1
    },
    healingSkills: [{
        skillName: 'Life Steal',
        heal: (att) => {
            return att.int
        },
        levelRequired: 1,
        odds: 30,
        emoji: '☣️'
    }],
}

battle(player, monster)