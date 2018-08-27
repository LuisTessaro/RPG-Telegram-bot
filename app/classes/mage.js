function mage() { }

mage.prototype.getSkills = function (att) {
    var skills = [
        {
            skill_name: "Fire Bolt",
            damage: function () {
                return att.int + (att.wiz / 2) + 5.5 ;
            },
            level_required: 1,
            odds: 35,
            emoji: "🔥"
        },
        {
            skill_name: "Frost Bolt",
            damage: function () {
                return att.int + (att.wiz / 2) + 5.5 ;
            },
            level_required: 1,
            odds: 35,
            emoji: "❄️"
        },
        {
            skill_name: "Arcane Bolt",
            damage: function () {
                return att.int + (att.wiz / 2) + 5.5 ;
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
            return att.int / 2;
        },
        level_required: 1,
        odds: 25,
        emoji: "🔥"
    }];
    return healingSkills;
}

mage.prototype.hpFormula = function () {
    let formula_hp = function (con, lvl) {
        return (con * 5) + 25;
    };
    return formula_hp;
};

mage.prototype.accuracyFormula = function () {
    let formula_acc = function (att, lvl) {
        return att.wis + lvl;
    };
    return formula_acc;
};

mage.prototype.fleeFormula = function () {
    let formula_flee = function (agi, lvl) {
        return lvl;
    };
    return formula_flee;
};

mage.prototype.autoAttackFormula = function () {
    let formula_autoAttack = function (str, dex, agi, lvl) {
        return 1;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return mage;
}
