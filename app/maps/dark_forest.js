const possibleMonsters = [
    {
        name: 'Dark Slime',
        hp: 180,
        sp: 0,
        autoAttackDmg: 20,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 50,
        exp: 4
    },
    {
        name: 'Dark Wolf',
        hp: 210,
        sp: 0,
        autoAttackDmg: 30,
        flee: 2,
        accuracy: 15,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 16
    },
    {
        name: 'Super Dark Fairy',
        hp: 310,
        sp: 0,
        autoAttackDmg: 40,
        flee: 5,
        accuracy: 15,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 26
    },
    {
        name: "BOSS: Old Witch's Helper",
        hp: 600,
        sp: 0,
        autoAttackDmg: 100,
        flee: 0,
        accuracy: 0,
        iniciative_bonus: 0,
        occurrence: 1,
        exp: 500
    },
    {
        name: 'Treasure',
        hp: 1,
        sp: 0,
        autoAttackDmg: 0,
        flee: 0,
        accuracy: 0,
        iniciative_bonus: 0,
        occurrence: 1,
        exp: 200
    }
];

function green_woods() { }

green_woods.prototype.getMonsters = function (player, bot) {
    return possibleMonsters;
};

module.exports = function () {
    return green_woods;
};
