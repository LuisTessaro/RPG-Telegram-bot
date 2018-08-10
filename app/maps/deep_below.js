const possibleMonsters = [
    {
        name: 'Witch',
        hp: 20,
        sp: 0,
        autoAttackDmg: 5,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 50,
        exp: 4
    },
    {
        name: 'Apparition',
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
        name: 'Babayaga',
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
        name: 'BOSS: Moonlight',
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
