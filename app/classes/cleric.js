function cleric() { }
cleric.prototype.getSkills = function (att) {
    var healingSkills = [];
    var skills = [];
    return skills;
};


cleric.prototype.getHealingSkills = function (att) {
    var healingSkills = [{
        skill_name: "Heal",
        heal: function () {
            return att.int * 3;
        },
        level_required: 1,
        odds: 30,
        cost: 0,
        emoji: "✝️"
    }];

    return healingSkills;
}

cleric.prototype.hpFormula = function () {
    let formula_hp = function (con, lvl) {
        return (con * 10) + lvl;
    };
    return formula_hp;
};

cleric.prototype.spFormula = function () {
    let formula_sp = function (int, wis, lvl) {
        return 0;
    };
    return formula_sp;
};

cleric.prototype.accuracyFormula = function () {
    let formula_acc = function (dex, lvl) {
        return (dex * 2) + lvl;
    };
    return formula_acc;
};

cleric.prototype.fleeFormula = function () {
    let formula_flee = function (agi, lvl) {
        return agi + lvl;
    };
    return formula_flee;
};

cleric.prototype.autoAttackFormula = function () {
    let formula_autoAttack = function (str, dex, agi, lvl) {
        return str + dex + agi + lvl;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return cleric;
}
