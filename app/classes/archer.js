function archer() { }

archer.prototype.getSkills = function (att) {
    var healingSkills = [];
    var skills = [
        {
            skill_name: "Double Strife",
            damage: function () {
                return att.dex;
            },
            level_required: 1,
            odds: 90,
            cost: 0,
            emoji: "🏹"
        },
        {
            skill_name: "Headshot!",
            damage: function () {
                return att.dex * 10;
            },
            level_required: 1,
            odds: 5,
            cost: 0,
            emoji: "🏹"
        },
        {
            skill_name: "Snipe",
            damage: function () {
                return att.dex * 10;
            },
            level_required: 1,
            odds: 5,
            cost: 0,
            emoji: "🏹"
        },
        {
            skill_name: "Arrow Storm",
            damage: function () {
                return att.dex * 25;
            },
            level_required: 1,
            odds: 3,
            cost: 0,
            emoji: "🏹"
        }
    ];
    return skills;
};


archer.prototype.getHealingSkills = function (att) {
    var healingSkills = [{
        skill_name: "Pet lick",
        heal: function () {
            return att.dex;
        },
        level_required: 1,
        odds: 30,
        cost: 0,
        emoji: "👅"
    }];

    return healingSkills;
}

archer.prototype.hpFormula = function () {
    let formula_hp = function (con, lvl) {
        return (con * 10) + lvl;
    };
    return formula_hp;
};

archer.prototype.spFormula = function () {
    let formula_sp = function (int, wis, lvl) {
        return 0;
    };
    return formula_sp;
};

archer.prototype.accuracyFormula = function () {
    let formula_acc = function (dex, lvl) {
        return (dex * 2) + lvl;
    };
    return formula_acc;
};

archer.prototype.fleeFormula = function () {
    let formula_flee = function (agi, lvl) {
        return agi + lvl + agi/2;
    };
    return formula_flee;
};

archer.prototype.autoAttackFormula = function () {
    let formula_autoAttack = function (str, dex, agi, lvl) {
        return dex + lvl;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return archer;
}
