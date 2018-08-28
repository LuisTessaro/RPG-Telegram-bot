function archer () { }

archer.prototype.getSkills = function (att) {
  var skills = [
    {
      skill_name: 'Double Strife',
      damage: function () {
        return att.dex
      },
      level_required: 1,
      odds: 90,
      cost: 0,
      emoji: '🏹'
    },
    {
      skill_name: 'Headshot!',
      damage: function () {
        return att.dex * 10
      },
      level_required: 1,
      odds: 5,
      cost: 0,
      emoji: '🏹'
    },
    {
      skill_name: 'Snipe',
      damage: function () {
        return att.dex * 10
      },
      level_required: 1,
      odds: 5,
      cost: 0,
      emoji: '🏹'
    },
    {
      skill_name: 'Arrow Storm',
      damage: function () {
        return att.dex * 25
      },
      level_required: 1,
      odds: 3,
      cost: 0,
      emoji: '🏹'
    }
  ]
  return skills
}

archer.prototype.getHealingSkills = function (att) {
  var healingSkills = [{
    skill_name: 'Pet lick',
    heal: function () {
      return att.dex
    },
    level_required: 1,
    odds: 30,
    cost: 0,
    emoji: '👅'
  }]

  return healingSkills
}

archer.prototype.hpFormula = function () {
  let hpFormula = function (att, lvl) {
    return (att.con * 10) + lvl
  }
  return hpFormula
}

archer.prototype.accuracyFormula = function () {
  let accuracyFormula = function (att, lvl) {
    return (att.dex * 2) + lvl
  }
  return accuracyFormula
}

archer.prototype.fleeFormula = function () {
  let fleeFormula = function (att, lvl) {
    return att.agi + lvl + att.agi / 2
  }
  return fleeFormula
}

archer.prototype.autoAttackFormula = function () {
  let autoAttackFormula = function (att, lvl) {
    return att.dex + lvl
  }
  return autoAttackFormula
}

module.exports = function () {
  return archer
}
