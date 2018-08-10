const possibleMonsters = [
    {
        name: 'Bat',
        hp: 360,
        sp: 0,
        autoAttackDmg: 50,
        flee: 5,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 50,
        exp: 4
    },
    {
        name: 'Wolf Bat',
        hp: 65,
        sp: 0,
        autoAttackDmg: 15,
        flee: 2,
        accuracy: 15,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 16
    },
    {
        name: 'Dark Bat',
        hp: 77,
        sp: 0,
        autoAttackDmg: 23,
        flee: 5,
        accuracy: 15,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 26
    },
    {
        name: 'BOSS: Bat',
        hp: 150,
        sp: 0,
        autoAttackDmg: 20,
        flee: 5,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 1,
        exp: 500
    },
    {
        name: 'Treasure Bat',
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
