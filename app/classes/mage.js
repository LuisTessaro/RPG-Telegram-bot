function mage() { }

mage.prototype.getSkills = function (att) {
    /*
    Strength: 10
    Dexterity: 5
    Agility: 5
    Constitution: 5
    Intelligence: 5
    Wisdom: 5
    */
    var healingSkills = [];
    var skills = [
        {
            skill_name: "Fire Bolt (+INT +WIS)",
            damage: function () {
                return att.int * 3;
            },
            level_required: 1,
            odds: 50,
            cost: 0,
            emoji: "🔥"
        },
        {
            skill_name: "Frost Bolt (+INT +WIS)",
            damage: function () {
                return att.int * 3;
            },
            level_required: 1,
            odds: 50,
            cost: 0,
            emoji: "❄️"
        },
        {
            skill_name: "Arcane Bolt (+INT +WIS)",
            damage: function () {
                return att.int * 3;
            },
            level_required: 1,
            odds: 50,
            cost: 0,
            emoji: "🔮"
        },
        {
            skill_name: "METEOR!!!! (+INT)",
            damage: function () {
                return att.int*25;
            },
            level_required: 1,
            odds: 1,
            cost: 0,
            emoji: "☄️"
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
        return (dex * 5) + lvl;
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
        return str;
    };
    return formula_autoAttack;
};


module.exports = function () {
    return mage;
}
