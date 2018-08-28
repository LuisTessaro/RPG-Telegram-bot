function warrior () { }

warrior.prototype.getSkills = function (att) {
  var skills = [
    {
      skill_name: 'Weapon Swing',
      damage: function () {
        return att.str
      },
      level_required: 1,
      odds: 70,
      cost: 0,
      emoji: '😤'
    },
    {
      skill_name: 'Furious Slash',
      damage: function () {
        return att.str * 2
      },
      level_required: 1,
      odds: 40,
      cost: 0,
      emoji: '😤'
    },
    {
      skill_name: 'Rage!!!',
      damage: function () {
        return ((att.str + att.con) * 2)
      },
      level_required: 1,
      odds: 5,
      cost: 0,
      emoji: '😤'
    },
    {
      skill_name: 'Cross Slash',
      damage: function () {
        return (att.str + att.dex) * 2
      },
      level_required: 15,
      odds: 10,
      cost: 0,
      emoji: '⚔️'
    },
    {
      skill_name: 'Infinity Rampage',
      damage: function () {
        return att.str * 25
      },
      level_required: 1,
      odds: 3,
      cost: 0,
      emoji: '☠️'
    }
  ]
  return skills
}

warrior.prototype.getHealingSkills = function (att) {
  var healingSkills = [{
    skill_name: 'Second wind',
    heal: function () {
      return att.con
    },
    level_required: 1,
    odds: 30,
    cost: 0,
    emoji: '💨'
  }]
  return healingSkills
}

warrior.prototype.hpFormula = function () {
  let hpFormula = function (att, lvl) {
    return (att.con * 10) + lvl
  }
  return hpFormula
}

warrior.prototype.accuracyFormula = function () {
  let accuracyFormula = function (att, lvl) {
    return (att.dex * 2) + lvl
  }
  return accuracyFormula
}

warrior.prototype.fleeFormula = function () {
  let fleeFormula = function (att, lvl) {
    return att.agi + lvl
  }
  return fleeFormula
}

warrior.prototype.autoAttackFormula = function () {
  let autoAttackFormula = function (att, lvl) {
    return att.str + att.dex + att.agi + lvl
  }
  return autoAttackFormula
}

module.exports = function () {
  return warrior
}
