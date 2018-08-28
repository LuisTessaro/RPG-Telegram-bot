function mage () { }

mage.prototype.getSkills = function (att) {
  var skills = [
    {
      skill_name: 'Fire Bolt',
      damage: function () {
        return att.int * 3
      },
      level_required: 1,
      odds: 40,
      cost: 0,
      emoji: '🔥'
    },
    {
      skill_name: 'Frost Bolt',
      damage: function () {
        return att.int * 3
      },
      level_required: 1,
      odds: 40,
      cost: 0,
      emoji: '❄️'
    },
    {
      skill_name: 'Arcane Bolt',
      damage: function () {
        return att.int * 3
      },
      level_required: 1,
      odds: 40,
      cost: 0,
      emoji: '🔮'
    },
    {
      skill_name: 'METEOR!!!!',
      damage: function () {
        return att.int * 25
      },
      level_required: 1,
      odds: 3,
      cost: 0,
      emoji: '☄️'
    }
  ]
  return skills
}

mage.prototype.getHealingSkills = function (att) {
  var healingSkills = [{
    skill_name: 'Cauterize Wounds',
    heal: function () {
      return att.int
    },
    level_required: 1,
    odds: 30,
    cost: 0,
    emoji: '🔥'
  }]

  return healingSkills
}

mage.prototype.hpFormula = function () {
  let hpFormula = function (att, lvl) {
    return (att.con * 10) + lvl
  }
  return hpFormula
}

mage.prototype.accuracyFormula = function () {
  let accuracyFormula = function (att, lvl) {
    return (att.dex * 5) + lvl
  }
  return accuracyFormula
}

mage.prototype.fleeFormula = function () {
  let fleeFormula = function (att, lvl) {
    return lvl
  }
  return fleeFormula
}

mage.prototype.autoAttackFormula = function () {
  let autoAttackFormula = function (att, lvl) {
    return att.str
  }
  return autoAttackFormula
}

module.exports = function () {
  return mage
}
