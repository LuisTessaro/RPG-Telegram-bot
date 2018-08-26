const possibleMonsters = [
    {
        name: 'Abyssobrotula',
        hp: 40,
        sp: 0,
        autoAttackDmg: 5,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        rarity: `common`,
        possible_loot: [],
        possible_equips: [],
        exp: 35
    },
    {
        name: 'Bufoceratias thele',
        hp: 40,
        sp: 0,
        autoAttackDmg: 5,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        rarity: `common`,
        possible_loot: [],
        possible_equips: [],
        exp: 35
    },
    {
        name: 'Oneirodidae',
        hp: 40,
        sp: 0,
        autoAttackDmg: 5,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        rarity: `common`,
        possible_loot: [],
        possible_equips: [],
        exp: 35
    },
    {
        name: 'Saccopharyngiformes',
        hp: 65,
        sp: 0,
        autoAttackDmg: 15,
        flee: 2,
        accuracy: 15,
        iniciative_bonus: 0,
        rarity: `uncommon`,
        possible_loot: [],
        possible_equips: [],
        exp: 60
    },
    {
        name: 'Ceratiidae',
        hp: 65,
        sp: 0,
        autoAttackDmg: 15,
        flee: 2,
        accuracy: 15,
        iniciative_bonus: 0,
        rarity: `uncommon`,
        possible_loot: [],
        possible_equips: [],
        exp: 60
    },
    {
        name: 'Double angler',
        hp: 99,
        sp: 0,
        autoAttackDmg: 23,
        flee: 5,
        accuracy: 15,
        iniciative_bonus: 0,
        rarity: `rare`,
        possible_loot: [],
        possible_equips: [],
        exp: 180
    },
    {
        name: "BOSS: N.A.U.T.I.L.U.S PROTOCOL",
        hp: 9999,
        sp: 0,
        autoAttackDmg: 20,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        rarity: `boss`,
        possible_loot: [],
        possible_equips: [],
        exp: 1500
    },
    {
        name: "Pirate's lost Treasure",
        hp: 1,
        sp: 0,
        autoAttackDmg: 0,
        flee: 0,
        accuracy: 0,
        iniciative_bonus: 0,
        rarity: `secret`,
        possible_loot: [],
        possible_equips: [],
        exp: 0
    }
];

function deep_below() { }

deep_below.prototype.getMonsters = function (player, bot) {
    return possibleMonsters;
};

module.exports = function () {
    return deep_below;
};
