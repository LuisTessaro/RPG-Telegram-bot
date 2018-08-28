function thief () { }

thief.prototype.getSkills = function (att) {
  var skills = [
    {
      skill_name: 'Stab',
      damage: function () {
        return att.str + (att.dex * 2)
      },
      level_required: 1,
      odds: 40,
      cost: 0,
      emoji: '🔪'
    },
    {
      skill_name: 'Backstab',
      damage: function () {
        return (att.str + att.dex) * 2
      },
      level_required: 1,
      odds: 25,
      cost: 0,
      emoji: '🔪'
    },
    {
      skill_name: 'Shadow Step',
      damage: function () {
        return (att.str + att.agi + att.dex) * 4
      },
      level_required: 1,
      odds: 10,
      cost: 0,
      emoji: '👻'
    },
    {
      skill_name: 'Cross Slash',
      damage: function () {
        return att.str
      },
      level_required: 15,
      odds: 5,
      cost: 0,
      emoji: '⚔️'
    },
    {
      skill_name: 'Curse: DEATH',
      damage: function () {
        return att.dex * 25
      },
      level_required: 1,
      odds: 3,
      cost: 0,
      emoji: '😈'
    }
  ]
  return skills
}

thief.prototype.getHealingSkills = function (att) {
  var healingSkills = [{
    skill_name: 'Crimson vial',
    heal: function () {
      return att.con
    },
    level_required: 1,
    odds: 30,
    cost: 0,
    emoji: '💉'
  }]

  return healingSkills
}

thief.prototype.hpFormula = function () {
  let hpFormula = function (att, lvl) {
    return (att.con * 10) + lvl
  }
  return hpFormula
}

thief.prototype.accuracyFormula = function () {
  let accuracyFormula = function (att, lvl) {
    return (att.dex * 2) + lvl
  }
  return accuracyFormula
}

thief.prototype.fleeFormula = function () {
  let fleeFormula = function (att, lvl) {
    return att.agi * 2 + lvl
  }
  return fleeFormula
}

thief.prototype.autoAttackFormula = function () {
  let autoAttackFormula = function (att, lvl) {
    return att.str + att.dex + att.agi + lvl
  }
  return autoAttackFormula
}

module.exports = function () {
  return thief
}
