function mage() { }

mage.prototype.getSkills = function (att) {
    var skills = [
        {
            skill_name: "Fire Bolt",
            damage: function () {
                return att.int + (att.wis / 2) + 5.5;
            },
            level_required: 1,
            odds: 35,
            emoji: "🔥"
        },
        {
            skill_name: "Frost Bolt",
            damage: function () {
                return att.int + (att.wis / 2) + 5.5;
            },
            level_required: 1,
            odds: 35,
            emoji: "❄️"
        },
        {
            skill_name: "Arcane Bolt",
            damage: function () {
                return att.int + (att.wis / 2) + 5.5;
            },
            level_required: 1,
            odds: 35,
            emoji: "🔮"
        },
        {
            skill_name: "METEOR!!!!",
            damage: function () {
                return att.int * 25;
            },
            level_required: 1,
            odds: 3,
            emoji: "☄️"
        }
    ];
    return skills;
};

mage.prototype.getHealingSkills = function (att) {
    var healingSkills = [{
        skill_name: "Cauterize Wounds",
        heal: function () {
            return att.int;
        },
        level_required: 1,
        odds: 30,
        cost: 0,
        emoji: "🔥"
    }];

    return healingSkills;
}

mage.prototype.hpFormula = function () {
    let formula_hp = function (att, lvl) {
        return (att.con * 5) + 25;
    };
    return formula_hp;
};

mage.prototype.accuracyFormula = function () {
    let formula_acc = function (att, lvl) {
        return att.wis + (lvl / 2);
    };
    return formula_acc;
};

mage.prototype.fleeFormula = function () {
    let formula_flee = function (att, lvl) {
        return lvl;
    };
    return formula_flee;
};

mage.prototype.autoAttackFormula = function () {
    let formula_autoAttack = function (att) {
        return 1;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return mage;
}
