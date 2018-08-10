const possibleMonsters = [
    {
        name: 'Slime',
        hp: 40,
        sp: 0,
        autoAttackDmg: 5,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 50,
        exp: 35
    },
    {
        name: 'Wolf',
        hp: 65,
        sp: 0,
        autoAttackDmg: 15,
        flee: 2,
        accuracy: 15,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 60
    },
    {
        name: 'Dark Fairy',
        hp: 99,
        sp: 0,
        autoAttackDmg: 23,
        flee: 5,
        accuracy: 15,
        iniciative_bonus: 0,
        occurrence: 40,
        exp: 180
    },
    {
        name: 'BOSS: Treant',
        hp: 250,
        sp: 0,
        autoAttackDmg: 20,
        flee: 0,
        accuracy: 10,
        iniciative_bonus: 0,
        occurrence: 1,
        exp: 1500
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
        exp: 500 
    }
];

function green_woods() { }

green_woods.prototype.getMonsters = function (player, bot) {
    return possibleMonsters;
};

module.exports = function () {
    return green_woods;
};
