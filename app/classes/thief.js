function thief() { }

thief.prototype.getSkills = function (att) {
    var skills = [
        {
            skill_name: "Stab",
            damage: function () {
                return att.str + (att.dex * 2);
            },
            level_required: 1,
            odds: 40,
            cost: 0,
            emoji: "🔪"
        },
        {
            skill_name: "Backstab",
            damage: function () {
                return (att.str + att.dex) * 2;
            },
            level_required: 1,
            odds: 25,
            cost: 0,
            emoji: "🔪"
        },
        {
            skill_name: "Shadow Step",
            damage: function () {
                return (att.str + att.agi + att.dex) * 4;
            },
            level_required: 1,
            odds: 10,
            cost: 0,
            emoji: "👻"
        },
        {
            skill_name: "Cross Slash",
            damage: function () {
                return att.str;
            },
            level_required: 15,
            odds: 5,
            cost: 0,
            emoji: "⚔️"
        },
        {
            skill_name: "Curse: DEATH",
            damage: function () {
                return att.dex * 25;
            },
            level_required: 1,
            odds: 3,
            cost: 0,
            emoji: "😈"
        }
    ];
    return skills;
};

thief.prototype.getHealingSkills = function (att) {
    var healingSkills = [{
        skill_name: "Crimson vial",
        heal: function () {
            return att.con;
        },
        level_required: 1,
        odds: 30,
        cost: 0,
        emoji: "💉"
    }];

    return healingSkills;
}

thief.prototype.hpFormula = function () {
    let formula_hp = function (con, lvl) {
        return (con * 10) + lvl;
    };
    return formula_hp;
};

thief.prototype.spFormula = function () {
    let formula_sp = function (int, wis, lvl) {
        return 0;
    };
    return formula_sp;
};

thief.prototype.accuracyFormula = function () {
    let formula_acc = function (dex, lvl) {
        return (dex * 2) + lvl;
    };
    return formula_acc;
};

thief.prototype.fleeFormula = function () {
    let formula_flee = function (agi, lvl) {
        return agi * 2 + lvl;
    };
    return formula_flee;
};

thief.prototype.autoAttackFormula = function () {
    let formula_autoAttack = function (str, dex, agi, lvl) {
        return str + dex + agi + lvl;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return thief;
}
