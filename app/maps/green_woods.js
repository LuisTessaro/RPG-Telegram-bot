const possibleMonsters = [
    {
        name: 'Slime',
        hp: 20,
        sp: 0,
        autoAttackDmg: 5,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 50,
        exp: 1
    },
    {
        name: 'Wolf',
        hp: 50,
        sp: 0,
        autoAttackDmg: 10,
        flee: 10,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 10
    },
    {
        name: 'BOSS: Treant',
        hp: 150,
        sp: 0,
        autoAttackDmg: 20,
        flee: 10,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 10,
        exp: 50
    }
];

function green_woods() { }

green_woods.prototype.getMonsters = function (player, bot) {
    return possibleMonsters;
};

module.exports = function () {
    return green_woods;
};
