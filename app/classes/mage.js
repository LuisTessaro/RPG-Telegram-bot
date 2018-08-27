function mage() { }

mage.prototype.getSkills = function (att) {
    var skills = [
        {
            skill_name: "Fire Bolt",
            damage: function () {
                return att.int * 3;
            },
            level_required: 1,
            odds: 40,
            cost: 0,
            emoji: "🔥"
        },
        {
            skill_name: "Frost Bolt",
            damage: function () {
                return att.int * 3;
            },
            level_required: 1,
            odds: 40,
            cost: 0,
            emoji: "❄️"
        },
        {
            skill_name: "Arcane Bolt",
            damage: function () {
                return att.int * 3;
            },
            level_required: 1,
            odds: 40,
            cost: 0,
            emoji: "🔮"
        },
        {
            skill_name: "METEOR!!!!",
            damage: function () {
                return att.int * 25;
            },
            level_required: 1,
            odds: 3,
            cost: 0,
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    let formula_acc = function (att, lvl) {
        return att.wis + lvl;
=======
    let formula_acc = function (dex, lvl) {
        return (dex * 5) + lvl;
>>>>>>> parent of 26b27a3... Merge branch 'master' of https://github.com/LuisTessaro/TextbasedRPG_Telegram-bot
=======
    let formula_acc = function (wiz, lvl) {
        return wiz + lvl;
>>>>>>> parent of 701c97e... bugs
=======
    let formula_acc = function (dex, lvl) {
        return (dex * 5) + lvl;
>>>>>>> parent of 26b27a3... Merge branch 'master' of https://github.com/LuisTessaro/TextbasedRPG_Telegram-bot
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
