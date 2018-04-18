function mage() {}

mage.prototype.getSkills = function () {
    var skills = [
        {
            skill_name: "Fire Bolt",
            damage: 20,
            level_required: 1,
            odds: 50,
            cost: 0,
            emoji: "🔮"
        },
        {
            skill_name: "Frost Bolt",
            damage: 20,
            level_required: 1,
            odds: 50,
            cost: 0,
            emoji: "🔮"
        },
        {
            skill_name: "Arcane Bolt",
            damage: 20,
            level_required: 1,
            odds: 50,
            cost: 0,
            emoji: "🔮"
        },
        {
            skill_name: "METEOR",
            damage: 250,
            level_required: 1,
            odds: 1,
            cost: 0,
            emoji: "🔮"
        }
    ];
    return skills;
};

mage.prototype.hpFormula = function () {
    let formula_hp = function (con, lvl) {
        return (con * 10) + lvl;
    };
    return formula_hp;
};

mage.prototype.spFormula = function () {
    let formula_sp = function (int, wis, lvl) {
        return 0;
    };
    return formula_sp;
};

mage.prototype.accuracyFormula = function () {
    let formula_acc = function (dex, lvl) {
        return (dex * 2) + lvl;
    };
    return formula_acc;
};

mage.prototype.fleeFormula = function () {
    let formula_flee = function (agi, lvl) {
        return agi + lvl;
    };
    return formula_flee;
};

mage.prototype.autoAttackFormula = function () {
    let formula_autoAttack = function (str, dex, agi, lvl) {
        return str + dex + agi + lvl;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return mage;
}
